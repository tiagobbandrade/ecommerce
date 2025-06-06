import { use } from "react";
import { ProductCard } from "./product-card";
import { getAllProducts } from "../services/get-products";

const productsPromise = getAllProducts();

export function ProductsGrid() {
  const products = use(productsPromise);

  return (
    <section className="w-full mt-6">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
