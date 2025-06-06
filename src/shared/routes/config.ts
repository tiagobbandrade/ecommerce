import { createBrowserRouter } from "react-router";
import { PublicRoutesLayout } from "../layouts/PublicRoutesLayout";
import { ProductListPage } from "../../pages/products/list";
import { ProductPage } from "../../pages/products/[id]";

export const routesConfig = createBrowserRouter([
  {
    path: "/",
    Component: PublicRoutesLayout,
    children: [
      {
        index: true,
        Component: ProductListPage,
      },
      {
        path: "products",
        Component: ProductListPage,
      },
      {
        path: "products/:productId",
        Component: ProductPage,
      },
    ],
  },
]);
