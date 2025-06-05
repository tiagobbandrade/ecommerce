import { ProductCard } from "./product-card";

export function ProductsGrid() {
  const products = [
    {
      id: "1",
      title: "Camiseta Básica",
      price: 29.99,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: { rate: 4.5, count: 120 },
      description:
        "Uma camiseta básica de alta qualidade, perfeita para o dia a dia.",
    },
    {
      id: "2",
      title: "Calça Jeans",
      price: 49.99,
      image: "https://fakestoreapi.com/img/71c5Xg4z8BL._AC_SL1500_.jpg",
      rating: { rate: 4.2, count: 80 },
      description: "Uma calça jeans confortável e estilosa.",
    },
    {
      id: "3",
      title: "Tênis Esportivo",
      price: 89.99,
      image: "https://fakestoreapi.com/img/71Hh1b5d9BL._AC_SL1500_.jpg",
      rating: { rate: 4.7, count: 200 },
      description: "Tênis esportivo ideal para corridas e treinos.",
    },
    {
      id: "4",
      title: "Jaqueta de Couro",
      price: 129.99,
      image: "https://fakestoreapi.com/img/71Hh1b5d9BL._AC_SL1500_.jpg",
      rating: { rate: 4.8, count: 50 },
      description: "Jaqueta de couro elegante e durável.",
    },
  ];

  return (
    <section>
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
