import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Cart from "~/ui/pages/Cart";

export default () => {
  return <Cart />;
};