import React from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import { PUBLIC_PATHS } from "./publicRoutes.constants";
import Layout from "@/features/Layout/Layout";

export default function PublicRoutes() {
  const routes: RouteObject[] = [
    {
      path: PUBLIC_PATHS.DEFAULT,
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Navigate to={PUBLIC_PATHS.SELECT_REGION} replace />,
        },
        {
          path: PUBLIC_PATHS.SELECT_REGION,
          element: <div></div>,
        },
        {
          path: PUBLIC_PATHS.REGION_CONFIGURATE,
          element: <div></div>,
        },
        {
          path: PUBLIC_PATHS.OTHER_PATHS,
          element: <Navigate to={PUBLIC_PATHS.SELECT_REGION} replace />,
        },
      ],
    },
  ];

  return useRoutes(routes);
}
