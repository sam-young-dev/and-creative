import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Category from "~/ui/pages/Category";
import fetchCategory from "~/use-cases/crystallize/read/fetchCategory";

export const loader: LoaderFunction = async ({ request, params }) => {
  const crystallizePath = `/shop/${params.category}`;
  const category = await fetchCategory(crystallizePath);
  return json({ category: category });
}

export default () => {
  const data: any = useLoaderData();
  return <Category data={data} />;
};