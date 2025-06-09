import { useLocation } from "react-router";
import { cn } from "../../../shared/utils/cn";

export function Stepper() {
  const location = useLocation();
  const paths = location.pathname.split("/").slice(1, 3);

  return (
    <section className="flex items-center gap-4 mx-auto">
      <div className="flex flex-col items-center">
        <span
          className={cn(
            "relative rounded-full w-12 h-12 flex items-center justify-center leading-none text-2xl",
            paths.length === 1 && paths[0] == "cart"
              ? "bg-[#416AD2]/45 text-white"
              : "border-[#416AD2] text-[#416AD2] border"
          )}
        >
          1
        </span>
        <h6
          className={cn(
            "font-normal text-xl",
            paths.length === 1 && paths[0] == "cart"
              ? "text-black"
              : "text-black/50"
          )}
        >
          Seu carrinho
        </h6>
      </div>
      <hr className="w-44 border-black/25" />
      <div className="flex flex-col items-center">
        <span
          className={cn(
            "relative rounded-full w-12 h-12 flex items-center justify-center leading-none text-2xl",
            paths.length === 2 && paths[1] == "address"
              ? "bg-[#416AD2]/45 text-white"
              : "border-[#416AD2] text-[#416AD2] border"
          )}
        >
          2
        </span>
        <h6
          className={cn(
            "font-normal text-xl",
            paths.length === 2 && paths[1] == "address"
              ? "text-black"
              : "text-black/50"
          )}
        >
          Endereço de entrega
        </h6>
      </div>
      <hr className="w-44 border-black/25" />
      <div className="flex flex-col items-center">
        <span
          className={cn(
            "relative rounded-full w-12 h-12 flex items-center justify-center leading-none text-2xl",
            paths.length === 2 && paths[1] == "payment"
              ? "bg-[#416AD2]/45 text-white"
              : "border-[#416AD2] text-[#416AD2] border"
          )}
        >
          3
        </span>
        <h6
          className={cn(
            "font-normal text-xl",
            paths.length === 2 && paths[1] == "payment"
              ? "text-black"
              : "text-black/50"
          )}
        >
          Pagamento
        </h6>
      </div>
    </section>
  );
}
