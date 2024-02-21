/* eslint-disable react/prop-types */
import flattenDeep from "lodash.flattendeep";
import { Route, Routes as ReactRoutes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RequireAuth from "./RequireAuth";
import Callback from "./Callback";
const generateFlattenRoutes = (routes) => {
  if (!routes) return [];
  return flattenDeep(
    routes.map(({ routes: subRoutes, ...rest }) => [
      rest,
      generateFlattenRoutes(subRoutes),
    ])
  );
};

export const renderRoutes = (mainRoutes) => {
  const Routes = () => {
    const layouts = mainRoutes.map(({ layout: Layout, routes }, index) => {
      const subRoutes = generateFlattenRoutes(routes);

      return (
        <Route key={index} element={<Layout />}>
          <Route>
            {subRoutes.map(({ component: Component, path, name }) => {
              return (
                Component &&
                path && (
                  <>
                    <Route key={name} element={<Component />} path={path} />
                  </>
                )
              );
            })}
          </Route>

          <Route path="/callback" element={<Callback />} />
        </Route>
      );
    });
    return <ReactRoutes>{layouts}</ReactRoutes>;
  };
  return Routes;
};
