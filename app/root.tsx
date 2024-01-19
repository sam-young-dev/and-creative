import { 
  json, 
  type LinksFunction, 
  type LoaderFunction, 
  type MetaFunction 
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { createClient, createNavigationFetcher } from "@crystallize/js-api-client";
import { Header } from "~/ui/components/layout/header";
import { Footer } from "~/ui/components/layout/footer";
import sylesheet from "~/styles/index.css";
import { AppContextProvider } from "./ui/app-context/provider";
import { getContext } from "./use-cases/http/utils";
import { buildStoreFrontConfiguration, getStoreFront } from "./use-cases/storefront.server";
import { buildLanguageMarketAwareLink } from "./use-cases/LanguageAndMarket";
import { TenantConfiguration } from "./use-cases/contracts/TenantConfiguration";
import { CrystallizeAPI } from "./use-cases/crystallize/read";

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: sylesheet,
    },
  ];
};

export const meta: MetaFunction = () => [{
  charset: "utf-8",
  title: "& Creative",
  viewport: "width=device-width,initial-scale=1",
}];

export const loader: LoaderFunction = async ({ request }) => {
  const requestContext = getContext(request);
  const { shared, secret } = await getStoreFront(requestContext.host);
  const api = CrystallizeAPI({
    apiClient: secret.apiClient,
    language: requestContext.language,
  });

  const tenantConfig = await api.fetchTenantConfig(secret.config.tenantIdentifier);

  const apiPath = buildLanguageMarketAwareLink('/api', requestContext.language, requestContext.market);
  //TESTMODE trick: here we use the real host, not the getContext that check SUPERFAST
  const serviceApiUrl = `http${requestContext.isSecure ? 's' : ''}://${request.headers.get('Host')!}${apiPath}`;
  const storeFrontConfiguration = buildStoreFrontConfiguration(
      requestContext.locale,
      serviceApiUrl,
      shared.config,
      tenantConfig,
  );
  
  const CrystallizeClient = createClient({
    tenantIdentifier: secret.config.tenantIdentifier,
  });

  const fetch = createNavigationFetcher(CrystallizeClient).byFolders;
  const navigation = await fetch('/', 'en', 3);
  return json({ 
    navigation: navigation.tree.children,
    storeFrontConfiguration
  });
};

const Document: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { storeFrontConfiguration }: any = useLoaderData();

  return (
    <AppContextProvider initialState={storeFrontConfiguration}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body className="root flow">
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </AppContextProvider>
  );
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { navigation }: any = useLoaderData();

  return (
    <>
      <Header navigation={navigation[0].children} />
      <div className="mt-8 flex justify-center">{children}</div>
      <Footer navigation={navigation} />
    </>
  );
};

export default () => {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
};
