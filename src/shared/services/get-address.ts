type GetAddressResponse = {
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  erro?: boolean;
};

export async function getAddressFetch(
  cep: string
): Promise<GetAddressResponse | null> {
  try {
    const response = await fetch(
      `https://viacep.com.br/ws/${cep.replace("-", "")}/json/`
    );
    if (!response.ok) {
      throw new Error("Erro ao buscar CEP");
    }
    const data = (await response.json()) as GetAddressResponse;
    if (data.erro) {
      throw new Error("CEP não encontrado");
    }
    return data;
  } catch (error) {
    console.error("Erro na consulta do CEP:", error);
    return null;
  }
}
