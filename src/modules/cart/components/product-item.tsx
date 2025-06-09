import { use } from "react";
import { formatCurrency } from "../../../shared/utils/format-currency";
import { CartContext } from "../../../shared/contexts/cart-context";

type ProductItemProps = {
  title: string;
  image: string;
  amount: number;
  price: number;
  id: number;
};

export function ProductItem({
  id,
  title,
  image,
  amount,
  price,
}: ProductItemProps) {
  const { remove } = use(CartContext);

  function removeItem(productId: number) {
    remove(productId);
  }

  return (
    <article className="py-10 px-8 bg-[#EFF3F7] flex gap-6 rounded-md">
      <img
        className="max-w-24 aspect-square object-contain mix-blend-darken"
        src={image}
        alt={title + " imagem"}
      />
      <div className="flex flex-col w-full">
        <h4>{title}</h4>
        <span className="text-sm text-black/50">Quantidade: {amount}</span>

        <div className="flex items-end w-full justify-between mt-auto">
          <button
            onClick={() => removeItem(id)}
            className="text-red-500 text-sm"
          >
            Remover
          </button>

          <div className="flex flex-col">
            <data
              value={(price * amount).toFixed(2)}
              className="text-xl font-medium"
            >
              {formatCurrency(price * amount)}
            </data>

            <data
              value={price.toFixed(2)}
              className="text-xs text-[#97999D] leading-2.5 block"
            >
              {formatCurrency(price)}/item
            </data>
          </div>
        </div>
      </div>
    </article>
  );
}
