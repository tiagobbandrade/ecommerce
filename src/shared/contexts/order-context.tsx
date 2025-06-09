import {
  createContext,
  type ReactNode,
  use,
  useMemo,
  useState,
  useEffect,
} from "react";
import { useQueries } from "@tanstack/react-query";
import { getProduct } from "../../modules/product-view/services/get-product";
import { CartContext } from "./cart-context";
import { Outlet } from "react-router";

type CartItem = {
  productId: number;
  quantity: number;
};

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

type ShippingInformation = {
  name: string;
  email: string;
  zipCode: string;
  address: string;
  district: string;
  state: string;
  city: string;
  complement?: string;
  referencePoint?: string;
};

type OrderContextType = {
  items: (CartItem & { product?: Product })[];
  shippingInformation: ShippingInformation;
  setShippingInformation: (info: ShippingInformation) => void;
  subtotal: number;
  totalItems: number;
  isLoading: boolean;
  isError: boolean;
};

export const OrderContext = createContext<OrderContextType>(
  {} as OrderContextType
);

type OrderProviderProps = {
  cart: CartItem[];
  children: ReactNode;
};

export function OrderProvider({ cart, children }: OrderProviderProps) {
  const productQueries = useQueries({
    queries: cart.map((item) => ({
      queryKey: ["product", item.productId],
      queryFn: () => getProduct(item.productId),
      staleTime: 5 * 60 * 1000,
    })),
  });

  const isLoading = productQueries.some((q) => q.isLoading);
  const isError = productQueries.some((q) => q.isError);

  const itemsWithProducts = useMemo(() => {
    if (isLoading || isError)
      return cart.map((item) => ({ ...item, product: undefined }));

    return cart.map((item) => {
      const productData = productQueries.find(
        (q) => q.data?.id === item.productId
      )?.data;
      return { ...item, product: productData };
    });
  }, [cart, productQueries, isLoading, isError]);

  const subtotal = useMemo(() => {
    return itemsWithProducts.reduce((acc, item) => {
      if (!item.product) return acc;
      return acc + item.quantity * item.product.price;
    }, 0);
  }, [itemsWithProducts]);

  const totalItems = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const [shippingInformation, setShippingInformationState] =
    useState<ShippingInformation>(() => {
      const data = localStorage.getItem("shippingInformation");
      return data
        ? JSON.parse(data)
        : {
            name: "",
            email: "",
            zipCode: "",
            address: "",
            district: "",
            state: "",
            city: "",
            complement: "",
            referencePoint: "",
          };
    });

  const setShippingInformation = (info: ShippingInformation) => {
    setShippingInformationState(info);
    localStorage.setItem("shippingInformation", JSON.stringify(info));
  };

  useEffect(() => {
    const data = localStorage.getItem("shippingInformation");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setShippingInformationState(parsed);
      } catch (e: unknown) {
        console.error(
          "Failed to parse shipping information from localStorag:",
          e
        );
      }
    }
  }, []);

  return (
    <OrderContext.Provider
      value={{
        items: itemsWithProducts,
        shippingInformation,
        setShippingInformation,
        subtotal,
        totalItems,
        isLoading,
        isError,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function OrderProviderWrapper() {
  const { cart } = use(CartContext);

  return (
    <OrderProvider cart={cart}>
      <Outlet />
    </OrderProvider>
  );
}
