import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "../../homepage/types/repsonse.types";
import { ShortyProductCard } from "./shorty-product-card";
import { useRef } from "react";

export function InlineViewProducts({ products }: { products: Product[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const CARD_WIDTH = 266 + 8;

  function scrollByCard(direction: "left" | "right") {
    if (containerRef.current) {
      const offset = direction === "left" ? -CARD_WIDTH : CARD_WIDTH;
      containerRef.current.scrollBy({
        left: offset,
        behavior: "smooth",
      });
    }
  }

  return (
    <div className="w-full flex flex-col">
      <div className="relative">
        <div
          ref={containerRef}
          className="flex gap-2 overflow-hidden scroll-smooth"
        >
          {products.map((product) => (
            <ShortyProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#faf9fc] to-transparent" />
      </div>

      <div className="flex items-center gap-1 ml-auto mt-2">
        <button
          onClick={() => scrollByCard("left")}
          className="rounded-md p-1 border border-black/50 text-black/50 flex items-center justify-center"
        >
          <ChevronLeft size={19} />
        </button>
        <button
          onClick={() => scrollByCard("right")}
          className="rounded-md p-1 border border-black/50 text-black/50 flex items-center justify-center"
        >
          <ChevronRight size={19} />
        </button>
      </div>
    </div>
  );
}
