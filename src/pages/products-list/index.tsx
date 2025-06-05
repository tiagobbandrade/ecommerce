import { ProductCard } from "../../modules/products-list/components/product-card";
import { ProductsCategoryFilter } from "../../modules/products-list/components/products-category-filter";
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
        <ProductCard
          product={{
            title: "Camiseta Básica",
            price: 29.99,
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating: { rate: 4.5, count: 120 },
            id: "1",
            description:
              "Uma camiseta básica de alta qualidade, perfeita para o dia a dia.",
          }}
        />
        <ProductCard
          product={{
            title: "Camiseta Básica",
            price: 29.99,
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating: { rate: 4.5, count: 120 },
            id: "1",
            description:
              "Uma camiseta básica de alta qualidade, perfeita para o dia a dia.",
          }}
        />
        <ProductCard
          product={{
            title: "Camiseta Básica",
            price: 29.99,
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating: { rate: 4.5, count: 120 },
            id: "1",
            description:
              "Uma camiseta básica de alta qualidade, perfeita para o dia a dia.",
          }}
        />
        <ProductCard
          product={{
            title: "Camiseta Básica",
            price: 29.99,
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating: { rate: 4.5, count: 120 },
            id: "1",
            description:
              "Uma camiseta básica de alta qualidade, perfeita para o dia a dia.",
          }}
        />
      </main>
    </>
  );
}
