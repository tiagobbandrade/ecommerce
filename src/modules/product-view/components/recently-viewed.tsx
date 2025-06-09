import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../homepage/services/get-products";
import { InlineViewProducts } from "./inline-products-preview";

export function RecentlyViewed() {
  const { data: products, isSuccess } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });
  return (
    <>
      <h4 className="text-xl font-medium mt-8 mb-4">Visto recentemente</h4>
      {isSuccess && <InlineViewProducts products={products} />}
    </>
  );
}
