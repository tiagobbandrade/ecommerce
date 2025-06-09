import { createBrowserRouter } from "react-router";
import { PublicRoutesLayout } from "../layouts/public-routes-layout";
import { Homepage } from "../../modules/homepage/page";
import { ProductPage } from "../../modules/product-view/page";
import { CartLayout } from "../layouts/cart-layout";
import { CartPage } from "../../modules/cart/cart-page";
import { AddressPage } from "../../modules/cart/address-page";
import { LoginPage } from "../../modules/auth/login-page";
import { OrderProviderWrapper } from "../contexts/order-context";
import { PaymentPage } from "../../modules/cart/payment-page";

export const routesConfig = createBrowserRouter([
  {
    path: "/",
    Component: PublicRoutesLayout,
    children: [
      {
        index: true,
        Component: Homepage,
      },
      {
        path: "products",
        children: [
          {
            index: true,
            Component: Homepage,
          },
          {
            path: ":productId",
            Component: ProductPage,
          },
        ],
      },
    ],
  },
  {
    path: "/cart",
    Component: CartLayout,
    children: [
      {
        Component: OrderProviderWrapper,
        children: [
          {
            index: true,
            Component: CartPage,
          },
          {
            path: "address",
            Component: AddressPage,
          },
          {
            path: "payment",
            Component: PaymentPage,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
]);
