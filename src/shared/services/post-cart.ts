import axios from "axios";

type CartProduct = {
  productId: number;
  quantity: number;
};

type CartResponse = {
  id: number;
  userId: number;
  date: string;
  products: CartProduct[];
};

export async function addProductToCartPost(
  productId: number,
  quantity: number
): Promise<CartProduct[]> {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }

  const existingCartJSON = localStorage.getItem("cart");
  const existingCart: CartProduct[] = existingCartJSON
    ? JSON.parse(existingCartJSON)
    : [];

  const existingIndex = existingCart.findIndex(
    (p) => p.productId === productId
  );

  if (existingIndex !== -1) {
    existingCart[existingIndex].quantity += quantity;
  } else {
    existingCart.push({ productId, quantity });
  }

  try {
    const response = await axios.post<CartResponse>(
      "https://fakestoreapi.com/carts",
      {
        userId: Number(userId),
        date: new Date().toISOString().split("T")[0],
        products: existingCart,
      }
    );

    const updatedCart = response.data.products;

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    return updatedCart;
  } catch (error) {
    console.error("Erro ao adicionar produto ao carrinho:", error);
    throw error;
  }
}
