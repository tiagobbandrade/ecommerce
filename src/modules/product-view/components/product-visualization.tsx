import { Star, Truck } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { use, useState } from "react";
import { QuantitySelector } from "../../../shared/components/quantity-selector";
import { formatCurrency } from "../../../shared/utils/format-currency";
import { getProduct } from "../services/get-product";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { CartContext } from "../../../shared/contexts/cart-context";
import { Spinner } from "../../../shared/components/spinner";

export function ProductView() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);

  const authContext = use(AuthContext);
  const { addToCart: add, isAdding, addingProductId } = use(CartContext);

  const navigate = useNavigate();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", params.productId],
    queryFn: () => getProduct(Number(params.productId)),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const isAddingThisProduct = isAdding && addingProductId === product?.id;

  function addToCart() {
    if (!authContext.isAuthenticated) {
      console.log("Não logado");
      navigate("/login?redirectTo=/cart");
      authContext.setAction({
        type: "ADD_TO_CART",
        productId: product!.id,
        quantity,
      });
      return;
    }

    add(product!.id, quantity);
  }

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <main className="max-w-5xl w-full mx-auto">
      <div className="flex gap-6 mt-2.5">
        <section className="flex items-center gap-4 max-h-[524px] min-w-[426px] w-fit bg-[#EFF3F7] py-20 px-12">
          <img
            src={product!.image}
            className="object-contain h-[377px] w-full aspect-square mix-blend-darken"
          />
        </section>
        <section className="w-full flex flex-col">
          <div className="flex items-center gap-1">
            <Star
              size={16}
              strokeWidth={1.5}
              className="fill-amber-300 stroke-amber-300"
            />
            <p className="text-lg flex items-center gap-1">
              {product!.rating.rate}{" "}
              <span className="text-sm text-black/40">
                ({product!.rating.count}) avaliações
              </span>
            </p>
          </div>
          <h1 className="text-[32px] font-medium leading-tight">
            {product!.title}
          </h1>
          <p className="text-black/50 leading-tight">{product?.description}</p>

          <data
            value={(product!.price + 100).toFixed(2)}
            className="text-lg text-[#97999D] line-through leading-2.5 block mt-6"
          >
            {formatCurrency(product!.price + 100)}
          </data>

          <div className="flex items-center gap-1.5">
            <data
              value={product!.price.toFixed(2)}
              className="text-2xl font-semibold"
            >
              {formatCurrency(product!.price)}
            </data>
            <span className="text-emerald-500">12% OFF</span>
          </div>

          <div className="flex mt-2 gap-1.5">
            <Truck className="text-emerald-500" size={20} />
            <p className="text-emerald-500">Frete grátis para todo o Brasil</p>
          </div>

          <QuantitySelector
            quantity={quantity}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />

          <div className="mt-auto flex items-center gap-2">
            <button
              type="button"
              className="rounded-md w-full bg-[#416AD2] py-3 px-5 font-medium text-white hover:bg-[#3055b8]"
            >
              Comprar agora
            </button>
            <button
              disabled={isAddingThisProduct}
              onClick={addToCart}
              type="button"
              className="rounded-md w-full bg-[#416AD2]/45 text-[#416AD2] py-3 px-5 font-medium hover:bg-[#416AD2]/60"
            >
              {isAddingThisProduct ? <Spinner /> : "Adicionar ao carrinho"}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
