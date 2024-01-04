'use client';

import { useEffect, useState } from "react";
import { useAppContext } from "../app-context/provider";
import { ClientOnly } from "@crystallize/reactjs-hooks";
import { ServiceAPI } from "~/use-cases/service-api";

export default ({ id, cartId }: { id: string, cartId?: string }) => {
  const { state: contextState } = useAppContext();
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
        {order && <div>Order Id: {order.id}</div>}
      </ClientOnly>
    </div>
  )
}