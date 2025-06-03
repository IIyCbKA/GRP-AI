import React from "react";
import { BrowserRouter } from "react-router-dom";
import PublicRoutes from "@/routes/PublicRoutes";

export default function AppRoutes(): React.ReactElement {
  return (
    <BrowserRouter>
      <PublicRoutes />
    </BrowserRouter>
  );
}
