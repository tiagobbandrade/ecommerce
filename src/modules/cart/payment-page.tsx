import { Truck } from "lucide-react";
import { Link } from "react-router";
import { use } from "react";
import { OrderContext } from "../../shared/contexts/order-context";
import { formatCurrency } from "../../shared/utils/format-currency";

export function PaymentPage() {
  const { subtotal, totalItems, shippingInformation } = use(OrderContext);

  return (
    <main className="p-5 bg-[#EFF3F7] rounded-md w-2/5 mx-auto mt-9 pb-16">
      <span className="font-medium">Pagamento</span>
      <hr className="border-black/10 my-2" />

      <div className="flex items-center justify-between">
        <p className="text-sm">Produtos ({totalItems})</p>
        <data value={subtotal} className="text-sm">
          {formatCurrency(subtotal)}
        </data>
      </div>

      <div className="flex gap-1.5 mt-1">
        <Truck className="text-emerald-500" size={16} />
        <p className="text-emerald-500 text-xs">Frete grátis</p>
      </div>

      <div className="flex flex-col mt-6">
        <p className="text-sm">Endereço de entrega:</p>
        <span className="text-xs text-black/50">
          {shippingInformation.address}
        </span>
        <span className="text-xs text-black/50">
          {shippingInformation.city}, {shippingInformation.state} -{" "}
          {shippingInformation.zipCode}
        </span>
      </div>

      <div className="flex items-center justify-between mt-9">
        <p className="font-medium">Subtotal</p>
        <data value={subtotal} className="font-medium">
          {formatCurrency(subtotal)}
        </data>
      </div>

      <div className="flex flex-col gap-1 mt-9">
        <Link
          to={"#"}
          className="rounded-md bg-[#416AD2] py-3 px-5 text-xs font-medium text-white hover:bg-[#3055b8] text-center"
        >
          Concluir pagamento
        </Link>

        <Link
          to="/products"
          type="button"
          className="rounded-md bg-[#416AD2]/45 text-[#416AD2] py-3 px-5 text-xs font-medium hover:bg-[#416AD2]/60 text-center"
        >
          Voltar às compras
        </Link>
      </div>
    </main>
  );
}
