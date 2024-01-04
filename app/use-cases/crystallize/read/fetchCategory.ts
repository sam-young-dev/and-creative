import { CrystallizeClient } from "@crystallize/js-api-client";

export default async (path: string) => {
  const apiClient = CrystallizeClient;

  const data = await apiClient.catalogueApi(`
    query ($language: String!, $path: String!) {
      category: catalogue(language: $language, path: $path) {
        name
        products: children {
          name
          ... on Product {
            path
            defaultVariant {
              name
              price
              firstImage {
                url
                variants {
                  url
                  width
                  height
                }
              }
              usdPrice: priceVariant(identifier: "american-dollar") {
                currency
                price
              }
            }
          }
        }
      }
    }
  `, {
    "language": "en",
    "path": path
  });

  return data.category;
}