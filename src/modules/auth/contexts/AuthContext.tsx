import { createContext, use, useState, type ReactNode } from "react";
import { type NavigateFunction } from "react-router";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { loginPost } from "../services/login";
import { CartContext } from "../../../shared/contexts/cart-context";

type PostLoginAction = {
  type: "ADD_TO_CART";
  productId: number;
  quantity?: number;
};

type AuthContextType = {
  isAuthenticated: boolean;
  userId: number | null;
  token: string | null;
  useLoginMutation: (
    navigate: NavigateFunction,
    searchParams: URLSearchParams
  ) => UseMutationResult<
    {
      token: string;
      userId: number;
    },
    Error,
    {
      username: string;
      password: string;
    },
    unknown
  >;
  logout: () => void;

  action: PostLoginAction | null;
  setAction: (action: PostLoginAction) => void;
  clearAction: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [action, setActionState] = useState<PostLoginAction | null>(null);
  const { addToCart } = use(CartContext);

  function setAction(newAction: PostLoginAction) {
    setActionState(newAction);
  }

  function clearAction() {
    setActionState(null);
  }

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [userId, setUserId] = useState<number | null>(
    localStorage.getItem("userId")
      ? parseInt(localStorage.getItem("userId")!)
      : null
  );

  const isAuthenticated = !!token;

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  const useLoginMutation = (
    navigate: NavigateFunction,
    searchParams: URLSearchParams
  ) =>
    useMutation({
      mutationKey: ["login"],
      mutationFn: ({
        username,
        password,
      }: {
        username: string;
        password: string;
      }) => loginPost(username, password),
      onSuccess: (data) => {
        console.log(action);
        if (action?.type === "ADD_TO_CART") {
          addToCart(action.productId, action.quantity || 1);
          clearAction();
        }
        setToken(data.token);
        setUserId(data.userId);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", String(data.userId));
        navigate(searchParams.get("redirectTo") || "/products");
      },
    });

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userId,
        token,
        logout,
        useLoginMutation,
        setAction,
        action,
        clearAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
