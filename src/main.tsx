import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { routesConfig } from "./shared/routes/config";
import { AuthProvider } from "./modules/auth/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { CartContextProvider } from "./shared/contexts/cart-context";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CartContextProvider>
        <AuthProvider>
          <RouterProvider router={routesConfig} />
        </AuthProvider>
      </CartContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
