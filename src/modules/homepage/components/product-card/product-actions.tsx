import { use } from "react";
import { AuthContext } from "../../../auth/contexts/AuthContext";
import { useNavigate } from "react-router";
import { CartContext } from "../../../../shared/contexts/cart-context";
import { Spinner } from "../../../../shared/components/spinner";

export function ProductActions({ productId }: { productId: number }) {
  const authContext = use(AuthContext);
  const { addToCart: add, isAdding, addingProductId } = use(CartContext);
  const navigate = useNavigate();

  const isAddingThisProduct = isAdding && addingProductId === productId;

  function addToCart() {
    if (!authContext.isAuthenticated) {
      authContext.setAction({ type: "ADD_TO_CART", productId });
      navigate("/login?redirectTo=/cart");
      return;
    }

    add(productId);
  }

  return (
    <div className="flex flex-col gap-1 z-10">
      <button
        type="button"
        className="rounded-md bg-[#416AD2] min-w-[166px] py-3 px-5 text-xs font-medium text-white hover:bg-[#3055b8]"
      >
        Comprar agora
      </button>
      <button
        disabled={isAddingThisProduct}
        onClick={addToCart}
        type="button"
        className="rounded-md bg-[#416AD2]/45 min-w-[166px] text-[#416AD2] py-3 px-5 text-xs font-medium hover:bg-[#416AD2]/60"
      >
        {isAddingThisProduct ? <Spinner /> : "Adicionar ao carrinho"}
      </button>
    </div>
  );
}
