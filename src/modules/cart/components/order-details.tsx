import { ChevronRight, Truck } from "lucide-react";
import { formatCurrency } from "../../../shared/utils/format-currency";
import { Link } from "react-router";
import { use } from "react";
import { OrderContext } from "../../../shared/contexts/order-context";

type OrderDetailsProps = {
  goTo: string;
  submitFormId?: string;
};

export function OrderDetails({ goTo, submitFormId }: OrderDetailsProps) {
  const { subtotal, totalItems } = use(OrderContext);

  return (
    <div className="p-5 bg-[#EFF3F7] rounded-md w-full">
      <span className="font-medium">Resumo do pedido</span>
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

      <label className="flex items-center gap-1 w-full mt-4" htmlFor="discount">
        <span className="text-sm ">Cupom:</span>
        <input
          type="text"
          className="bg-[#BCC6D1] text-xs text-black/75 px-1 outline-none h-[22px] rounded-sm w-full"
        />
        <button className="bg-[#416AD2] p-1 rounded-sm">
          <ChevronRight color="white" size={14} />
        </button>
      </label>

      <div className="flex items-center justify-between mt-9">
        <p className="font-medium">Subtotal</p>
        <data value={subtotal} className="font-medium">
          {formatCurrency(subtotal)}
        </data>
      </div>

      <div className="flex flex-col gap-1 mt-9">
        {submitFormId ? (
          <button
            type="submit"
            form={submitFormId}
            className="rounded-md bg-[#416AD2] py-3 px-5 text-xs font-medium text-white hover:bg-[#3055b8] text-center"
          >
            Continuar
          </button>
        ) : (
          <Link
            to={goTo}
            className="rounded-md bg-[#416AD2] py-3 px-5 text-xs font-medium text-white hover:bg-[#3055b8] text-center"
          >
            Continuar
          </Link>
        )}
        <Link
          to="/products"
          type="button"
          className="rounded-md bg-[#416AD2]/45 text-[#416AD2] py-3 px-5 text-xs font-medium hover:bg-[#416AD2]/60 text-center"
        >
          Voltar às compras
        </Link>
      </div>
    </div>
  );
}
