import axios from "axios";
import type { LoginResponse } from "../types/response.types";
import type { UserType } from "../types/types";
import { isAxiosError } from "axios";

type UserOmitted = Omit<UserType, "password" | "email">;

export async function loginPost(
  username: string,
  password: string
): Promise<{ token: string; userId: number }> {
  try {
    const response = await axios.post<LoginResponse>(
      "https://fakestoreapi.com/auth/login",
      {
        username,
        password,
      }
    );

    const token = response.data.token;

    if (!token) {
      throw new Error("Token inválido.");
    }

    const users = await axios.get<UserOmitted[]>(
      "https://fakestoreapi.com/users"
    );

    const user = users.data.find((u) => u.username === username);

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    return {
      token,
      userId: user.id,
    };
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 401) {
        throw new Error("Usuário ou senha inválidos.");
      }
      throw new Error("Erro de rede: " + status);
    }
    throw new Error("Erro inesperado ao tentar logar.");
  }
}
