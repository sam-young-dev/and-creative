import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Checkout from "~/ui/pages/Checkout";

export default () => {
  return <Checkout />;
};