import { CrystallizeClient } from "@crystallize/js-api-client";

export default async (path: string) => {
  const apiClient = CrystallizeClient;

  const data = await apiClient.catalogueApi(`
    query ($language: String!, $path: String!) {
      product: catalogue(language: $language, path: $path) {
        name
        path
        summary: component(id: "summary") {
          content {
            ...on RichTextContent {
              json
            }
          }
        }
          
        ... on Product {
          variants {
            name
            sku
            isDefault
            attributes {
              attribute
              value
            }
            stockLocations {
              identifier
              stock
              name
            }
            images {
              url
              variants {
                url
                height
                width
              }
            }
            priceVariants {
              identifier
              price
              currency
            }
            usdPrice: priceVariant(identifier: "american-dollar") {
              currency
              price
            }
          }
        }
      }
    }
  `, {
    "language": "en",
    "path": path
  });

  return data.product;
}