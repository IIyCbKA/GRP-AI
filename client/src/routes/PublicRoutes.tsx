import React from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import { PUBLIC_PATHS } from "./publicRoutes.constants";
import Layout from "@/features/Layout/Layout";
import Root from "@/features/Root/Root";

export default function PublicRoutes() {
  const routes: RouteObject[] = [
    {
      path: PUBLIC_PATHS.DEFAULT,
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Root />,
        },
        {
          path: PUBLIC_PATHS.OTHER_PATHS,
          element: <Navigate to={PUBLIC_PATHS.DEFAULT} replace />,
        },
      ],
    },
  ];

  return useRoutes(routes);
}
