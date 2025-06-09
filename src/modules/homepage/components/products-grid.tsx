import { ProductCard } from "./product-card/product-card";
import { getAllProducts } from "../services/get-products";
import { useQuery } from "@tanstack/react-query";

export function ProductsGrid() {
  const { data: products, isSuccess } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  return (
    <section className="w-full mt-2">
      <ul className="flex flex-col gap-1">
        {isSuccess &&
          products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
      </ul>
    </section>
  );
}
