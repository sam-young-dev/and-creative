import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getContext } from "~/use-cases/http/utils";
import Order from "~/ui/pages/Order";

export const loader: LoaderFunction = async ({ request, params }) => {
  const requestContext = getContext(request);
  let cartId = requestContext.url.searchParams.get('cartId');

  return json({
    orderId: params.id,
    cartId: cartId
  });
}

export default () => {
  const { orderId, cartId }: any = useLoaderData();
  return <Order id={orderId} cartId={cartId} />;
};