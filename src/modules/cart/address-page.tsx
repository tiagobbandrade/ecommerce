import DeliveryDetailsForm from "./components/address-register";
import { OrderDetails } from "./components/order-details";

export function AddressPage() {
  return (
    <main className="grid grid-cols-12 gap-5 mt-9 pb-16">
      <section className="col-span-9 space-y-2 p-5 bg-[#EFF3F7] rounded-md">
        <div className="-space-y-1">
          <h2 className="text-base font-semibold text-gray-800">
            Detalhes da entrega
          </h2>
          <p className="text-sm text-gray-600">
            Por favor, escreva o seu endereço para o recebimento da sua compra
          </p>
        </div>
        <DeliveryDetailsForm />
      </section>

      <section className="col-span-3 sticky top-[72px] self-start">
        <OrderDetails goTo="payment" submitFormId="shipping-form" />
      </section>
    </main>
  );
}
