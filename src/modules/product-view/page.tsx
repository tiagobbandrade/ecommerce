import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

import { ProductView } from "./components/product-visualization";
import { SuggestedProducts } from "./components/suggested-products";
import { RecentlyViewed } from "./components/recently-viewed";

export function ProductPage() {
  const navigate = useNavigate();

  return (
    <div className="mt-[108px] max-w-5xl w-full mx-auto mb-[72px] pb-16">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5"
      >
        <ArrowLeft size={16} />
        Voltar
      </button>
      <ProductView />
      <SuggestedProducts />
      <RecentlyViewed />
    </div>
  );
}
