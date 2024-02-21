// Layouts
import AnonymousLayout from "../layouts/AnonymousLayout";
import MainLayout from "../layouts/MainLayout";
import MapLayout from "../layouts/MapLayout";

// Pages
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Missions from "../pages/Missions";
import Map from "../pages/Map";
import { renderRoutes } from "./generate-routes";
import Photo from "../pages/Map/photo";
import Callback from "./Callback";
import View from "../pages/stream/View";
import ScreenRecord from "../pages/stream/ScreenCapture";
export const routes = [
  {
    layout: AnonymousLayout,
    routes: [
      {
        name: "login",
        title: "Login page",
        component: ScreenRecord,
        path: "/ScreenRecord",
        isPublic: true,
      },
      {
        name: "stream",
        title: "stream",
        component: Callback,
        path: "/callback",
        isPublic: true,
      },
    ],
  },
  {
    layout: MainLayout,
    routes: [
      {
        name: "Dashboard",
        title: "Dashboard page",
        component: Dashboard,
        path: "/",
      },
      {
        name: "Missions",
        title: "Missions page",
        component: Missions,
        path: "/Missions",
      },
      {
        name: "Stream",
        title: "Stream page",
        component: View,
        path: "/View",
      },
    ],
  },
  {
    layout: MapLayout,
    routes: [
      {
        name: "Map",
        title: "Map page",
        component: Map,
        path: "/map",
      },
      {
        name: "photo",
        title: "Photo page",
        component: Photo,
        path: "/photo",
      },
    ],
  },
];

export const Routes = renderRoutes(routes);
