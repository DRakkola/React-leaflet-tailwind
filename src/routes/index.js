// Layouts
import AnonymousLayout from "../layouts/AnonymousLayout";
import MainLayout from "../layouts/MainLayout";
import MapLayout from "../layouts/MapLayout";

// Pages
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Missions from "../pages/Missions";
import ListUsers from "../pages/ListUsers";
import Map from "../pages/Map";

import { renderRoutes } from "./generate-routes";
export const routes = [
{
    layout: AnonymousLayout,
    routes: [
      {
        name: 'login',
        title: 'Login page',
        component: Login,
        path: '/login',
        isPublic: true,
      }
    ]
  },
{
    layout: MainLayout,
    routes: [
      {
        name: 'Dashboard',
        title: 'Dashboard page',
        component: Dashboard,
        path: '/'
      },
      {
        name: 'Missions',
        title: 'Missions page',
        component: Missions,
        path: '/Missions'
      },
      {
        name: 'users',
        title: 'Users',
        hasSiderLink: true,
        routes: [
          {
            name: 'list-users',
            title: 'List of users',
            hasSiderLink: true,
            component: ListUsers,
            path: '/users'
          },
          
        ]
      }
    ],
    
  },
  {
    layout: MapLayout,
    routes: [
      {
        name: 'Map',
        title: 'Map page',
        component: Map,
        path: '/map'
      }
    ]
  }
];

export const Routes = renderRoutes(routes);