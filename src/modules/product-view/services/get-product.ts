import axios from "axios";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export async function getProduct(id: number): Promise<Product> {
  try {
    const response = await axios.get<Product>(
      "https://fakestoreapi.com/products/" + id
    );

    return response.data;
  } catch (err) {
    console.error("Error fetching product:", err);
    return {} as Product;
  }
}
