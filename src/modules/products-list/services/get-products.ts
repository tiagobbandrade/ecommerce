import axios from "axios";
import type { GetProductsResponse } from "../types/repsonse.types";

export async function getAllProducts() {
  try {
    const response = await axios.get<GetProductsResponse>(
      "https://fakestoreapi.com/products"
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
