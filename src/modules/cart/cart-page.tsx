import { use } from "react";
import { OrderDetails } from "./components/order-details";
import { ProductItem } from "./components/product-item";

import { ProductItemSkeleton } from "./components/skeletons/product-item-skeleton";
import { OrderDetailsSkeleton } from "./components/skeletons/order-detail-skeleton";
import { OrderContext } from "../../shared/contexts/order-context";

export function CartPage() {
  const { items, isLoading } = use(OrderContext);

  return (
    <main className="grid grid-cols-12 gap-5 mt-9 pb-16">
      <section className="col-span-9 space-y-2">
        {isLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <ProductItemSkeleton key={i} />
          ))}

        {!isLoading &&
          items.map((item) =>
            item.product ? (
              <ProductItem
                key={item.product.id}
                id={item.product.id}
                price={item.product.price}
                title={item.product.title}
                image={item.product.image}
                amount={item.quantity}
              />
            ) : null
          )}
      </section>

      <section className="col-span-3 sticky top-[72px] self-start">
        {isLoading ? <OrderDetailsSkeleton /> : <OrderDetails goTo="address" />}
      </section>
    </main>
  );
}
