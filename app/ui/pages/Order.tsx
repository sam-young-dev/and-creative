'use client';

import { useEffect, useState } from "react";
import { useAppContext } from "../app-context/provider";
import { ClientOnly } from "@crystallize/reactjs-hooks";
import { ServiceAPI } from "~/use-cases/service-api";
import { Price as CrystallizePrice } from "../lib/pricing/pricing-component";

export default ({ id, cartId }: { id: string, cartId?: string }) => {
  const { state: contextState, path } = useAppContext();
  const [tryCount, setTryCount] = useState(0);
  const [order, setOrder] = useState<any | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    (async () => {
      try {
        const fetchedOrder = await ServiceAPI({
          language: contextState.language,
          serviceApiUrl: contextState.serviceApiUrl,
        }).fetchOrder(id, cartId)

        console.log(fetchedOrder);
        setOrder(fetchedOrder);
      } catch (exception) {
        timeout = setTimeout(() => {
          setTryCount(tryCount + 1);
        }, 500 * tryCount);
      }
    })();
    return () => clearTimeout(timeout);
  }, [id, tryCount]);

  return (
    <div className="container py-3 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <ClientOnly>
        <div className="flow">
          {order && <p className="mb-3">Order Id: {order.id}</p>}
          <div>
            {order?.cart?.map((product: any) => {
              return (
                <article key={product.sku} className="max-w-sm rounded overflow-hidden shadow-md">
                  <div className="flex items-center p-4">
                    <img
                      src={product.imageUrl ? product.imageUrl : ''}
                      width="100px"
                      height="100px"
                      alt="product"
                    />
                    <div className="px-6 py-4 flex flex-column">
                      <div className="font-bold text-xl mb-2">{product.name}</div>
                      <CrystallizePrice currencyCode={order?.total?.currency}>
                        {product.price.gross}
                      </CrystallizePrice>
                      <p>Quantity: {product.quantity}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
          {order?.total && (
            <p>Order Total:&nbsp;
              <CrystallizePrice currencyCode={order.total.currency}>
                {order.total?.gross}
              </CrystallizePrice>
            </p>
          )}
        </div>
      </ClientOnly>
    </div>
  )
}