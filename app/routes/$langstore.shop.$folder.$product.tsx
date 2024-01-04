import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Product from "~/ui/pages/Product";
import fetchProduct from "~/use-cases/crystallize/read/fetchProduct";

export const loader: LoaderFunction = async ({ request, params }) => {
  const crystallizePath = `/shop/${params.folder}/${params.product}`;
  const product = await fetchProduct(crystallizePath);
  return json({ product: product });
}

export default () => {
  const data:any = useLoaderData();
  return <Product data={data} />;
};