import { Star } from "lucide-react";
import { Link } from "react-router";
import { ProductActions } from "./product-actions";
import { formatCurrency } from "../../../../shared/utils/format-currency";

import type { Product } from "../../types/repsonse.types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({
  product: { id, title, price, image, rating },
}: ProductCardProps) {
  return (
    <article className="border-zinc-200 border rounded-md flex items-stretch gap-4 cursor-pointer relative">
      <div className="bg-[#EFF3F7] p-4 rounded-l-md flex items-center justify-center px-12">
        <img
          src={image}
          alt={`Imagem do produto ${title}`}
          className="object-contain max-w-32 aspect-square mix-blend-darken"
        />
      </div>

      <div className="flex flex-col justify-between py-8 px-3 flex-1">
        <div>
          <h3 className="line-clamp-2 text-sm font-medium">
            <Link
              to={`/products/${id}`}
              className="after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full"
              viewTransition
            >
              {title}
            </Link>
          </h3>

          <data
            value={(price + 100).toFixed(2)}
            className="text-sm text-[#97999D] line-through leading-2.5 block mt-2"
          >
            {formatCurrency(price + 100)}
          </data>

          <div className="flex items-center gap-1.5">
            <data value={price.toFixed(2)} className="text-xl font-medium">
              {formatCurrency(price)}
            </data>
            <span className="text-sm text-emerald-500">12% OFF</span>
          </div>
        </div>

        <div className="flex items-end gap-4 mt-auto">
          <div className="flex items-center gap-1 flex-1">
            <Star
              size={12}
              strokeWidth={1.5}
              className="fill-amber-300 stroke-amber-300"
            />
            <p className="text-sm">
              {rating.rate}{" "}
              <span className="text-xs text-black/40">
                ({rating.count}) avaliações
              </span>
            </p>
          </div>

          <ProductActions productId={id} />
        </div>
      </div>
    </article>
  );
}
