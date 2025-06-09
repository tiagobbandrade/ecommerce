import { Star } from "lucide-react";
import { formatCurrency } from "../../../shared/utils/format-currency";
import { Link } from "react-router";
import type { Product } from "../../homepage/types/repsonse.types";

type ShortyProductCardProps = {
  product: Product;
};

export function ShortyProductCard({ product }: ShortyProductCardProps) {
  return (
    <article
      className="p-4 rounded-sm bg-[#EFF3F7] min-h-fit w-[266px] overflow-hidden shrink-0 relative"
      key={product.id}
    >
      <img
        className="w-32 object-contain aspect-square mix-blend-darken mx-auto"
        src={product.image}
        alt=""
      />

      <h3 className="mt-2.5 text-sm line-clamp-2 overflow-hidden text-nowrap text-ellipsis">
        <Link
          className="after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full"
          to={`/products/${product.id}`}
        >
          {product.title}
        </Link>
      </h3>

      <div className="flex items-center gap-1 flex-1">
        <Star
          size={12}
          strokeWidth={1.5}
          className="fill-amber-300 stroke-amber-300"
        />
        <p className="text-sm">
          {product.rating.rate}{" "}
          <span className="text-xs text-black/40">
            ({product.rating.count}) avaliações
          </span>
        </p>
      </div>

      <data
        value={(product.price + 100).toFixed(2)}
        className="text-sm text-[#97999D] line-through leading-2.5 block mt-6"
      >
        {formatCurrency(product.price + 100)}
      </data>

      <div className="flex items-center gap-1.5">
        <data value={product.price.toFixed(2)} className="text-xl font-medium">
          {formatCurrency(product.price)}
        </data>
        <span className="text-sm text-emerald-500">12% OFF</span>
      </div>
    </article>
  );
}
