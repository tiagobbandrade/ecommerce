import { Star } from "lucide-react";
import type { Product } from "../types/repsonse.types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({
  product: { title, price, image, rating, description },
}: ProductCardProps) {
  return (
    <div
      title={title}
      className="p-5 bg-white rounded-md shadow-sm flex items-center gap-4 cursor-pointer h-full"
    >
      <img
        src={image}
        alt={`${title} image`}
        className="w-12 h-16 object-contain"
      />
      <div className="w-full overflow-hidden">
        <h3 className="text-sm font-light">
          <a href="#">{title}</a>
        </h3>
        <p className="text-xs text-black/50 truncate w-full">{description}</p>
        <div className="flex items-center justify-between w-full mt-1.5">
          <data value={price} className="text-sm font-medium">
            <span className="text-[10px]">R$</span>
            {new Intl.NumberFormat("pr-br", { currency: "BRL" }).format(price)}
          </data>
          <div className="flex items-center gap-1">
            <Star
              size={12}
              strokeWidth={1.5}
              className="fill-amber-300 stroke-amber-300"
            />
            <p className="text-sm">
              {rating.rate}{" "}
              <span className="text-xs text-black/40">({rating.count})</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
