import { LoaderFunction, json } from "@remix-run/node";
import { Outlet, useLocation } from "@remix-run/react";
import Landing from "~/ui/pages/Landing";

export const loader: LoaderFunction = async ({ request, params }) => {
  return json({});
}


export default () => {
  const location = useLocation();

  if (location.pathname === "/en/") {
    return <Landing />
  }
  
  return <Outlet />;
}