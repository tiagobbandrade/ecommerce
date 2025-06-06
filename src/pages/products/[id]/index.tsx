import { useParams } from "react-router";

export function ProductPage() {
  const params = useParams();

  return <h1>{params.productId}</h1>;
}
