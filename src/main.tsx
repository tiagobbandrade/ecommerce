import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { routesConfig } from "./shared/routes/config";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routesConfig} />
  </StrictMode>
);
