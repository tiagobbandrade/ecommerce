import { ProductsCategoryFilter } from "../../modules/products-list/components/products-category-filter";
import { ProductsGrid } from "../../modules/products-list/components/products-grid";
import { TopBar } from "../../shared/components/top-bar";

export function ProductListPage() {
  return (
    <>
      <TopBar />
      <main className="w-full px-6 mt-6">
        <h1 className="font-medium">Nossos produtos</h1>
        <ProductsCategoryFilter
          categories={[
            "Camisetas",
            "Calças",
            "Shorts",
            "Tênis",
            "Bermudas",
            "Jaquetas",
          ]}
        />
        <ProductsGrid />
      </main>
    </>
  );
}
