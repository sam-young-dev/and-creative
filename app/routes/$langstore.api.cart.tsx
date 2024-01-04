// import { handleCartRequestPayload, CartPayload, cartPayload } from "@crystallize/node-service-api-request-handlers";
// import { ActionFunction, json } from "@remix-run/node";

// export function validatePayload<T>(payload: unknown, scema: any | null): T {
//   if (!scema) {
//     return payload as T;
//   }
//   return scema.parse(payload);
// }

// export const action: ActionFunction = async ({ request }) => {
//   const body = await request.json();

//   const cart = await handleCartRequestPayload(validatePayload<CartPayload>(body, cartPayload), {
//     currency: 'USD',
//     perVariant: () => {
//       return {
//         firstImage: {
//           url: true,
//         },
//       };
//     },
//   })

//   return json({ cart });
// }

import { ActionFunction } from '@remix-run/node';
import { getStoreFront } from '~/use-cases/storefront.server';
import { privateJson } from '~/core/bridge/privateJson.server';
import { getContext } from '~/use-cases/http/utils';
import handleCart from '~/use-cases/checkout/handleSaveCart';
import { authenticatedUser } from '~/core/authentication.server';

export const action: ActionFunction = async ({ request }) => {
    const requestContext = getContext(request);
    const { secret: storefront } = await getStoreFront(requestContext.host);
    const body = await request.json();
    const user = await authenticatedUser(request);

    return privateJson(await handleCart(storefront.config, storefront.apiClient, requestContext, { ...body, user }));
};