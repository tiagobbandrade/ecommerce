import { createContext, useState, type ReactNode } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProductToCartPost } from "../services/post-cart";

type CartProduct = {
  productId: number;
  quantity: number;
};

type CartContextType = {
  cart: CartProduct[];
  addToCart: (productId: number, quantity?: number) => void;
  remove: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clear: () => void;
  isAdding: boolean;
  addError: unknown;
  addingProductId: number | null;
};

export const CartContext = createContext<CartContextType>(
  {} as CartContextType
);

export function CartContextProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const [addingProductId, setAddingProductId] = useState<number | null>(null);

  const [cart, setCart] = useState<CartProduct[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  function updateLocalCart(newCart: CartProduct[]) {
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  }

  const addMutation = useMutation({
    mutationFn: ({ productId, quantity }: CartProduct) =>
      addProductToCartPost(productId, quantity),
    onMutate: ({ productId }) => {
      setAddingProductId(productId);
    },
    onSettled: () => {
      setAddingProductId(null);
    },
    onSuccess: (updatedCartFromApi: CartProduct[]) => {
      updateLocalCart(updatedCartFromApi);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("Erro ao adicionar ao carrinho:", error);
    },
  });

  function addToCart(productId: number, quantity = 1) {
    addMutation.mutate({ productId, quantity });
  }

  function remove(productId: number) {
    const newCart = cart.filter((item) => item.productId !== productId);
    updateLocalCart(newCart);
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  }

  function updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      remove(productId);
      return;
    }

    const newCart = cart.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
    updateLocalCart(newCart);
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  }

  function clear() {
    updateLocalCart([]);
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        remove,
        updateQuantity,
        clear,
        isAdding: addingProductId !== null,
        addingProductId,
        addError: addMutation.error,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
