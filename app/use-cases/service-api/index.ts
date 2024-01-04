import { getJson, postJson } from "@crystallize/reactjs-hooks";
import { LocalCart } from "../contracts/LocalCart";
import { Customer } from "../contracts/Customer";

export function placeCart(
  serviceApiUrl: string,
  language: string,
  cart: LocalCart,
  customer: Partial<Customer>,
  options?: { pickupPoint: any },
) {
  return postJson<any>(serviceApiUrl + '/cart/place', {
      cartId: cart.cartId,
      locale: language,
      items: Object.values(cart.items),
      customer,
      options,
      extra: cart.extra,
  });
}

export type ServiceAPIContext = {
  locale?: string;
  language: string;
  serviceApiUrl: string;
};

export const ServiceAPI = ({ locale, language, serviceApiUrl }: ServiceAPIContext) => {
  return {
    stripe: {
      fetchPaymentIntent: (cart: LocalCart) => 
        postJson<any>(serviceApiUrl + '/payment/stripe/create', {
          cartId: cart.cartId
        }),
    },
    placeCart: (cart: LocalCart, customer: Partial<Customer>, options?: { pickupPoint: any }) =>
      placeCart(serviceApiUrl, language, cart, customer, options),
    fetchCart: (cartId: string) => getJson<any>(serviceApiUrl + '/cart/' + cartId),
    fetchRemoteCart: (cart: LocalCart) =>
      postJson<any>(serviceApiUrl + '/cart', {
          locale: language,
          items: Object.values(cart.items),
          cartId: cart.cartId,
          withImages: true,
          extra: cart.extra,
      }), 
    fetchOrders: () => getJson<any>(serviceApiUrl + '/orders'),
    fetchOrder: (orderId: string, cartId?: string) =>
      getJson<any>(serviceApiUrl + '/orders/' + orderId + (cartId ? '?cartId=' + cartId : '')),
    registerAndSendMagickLink: (userInfos: any) => postJson<any>(serviceApiUrl + '/magiclink/register', userInfos),
      sendMagickLink: (email: string, callbackPath: string) =>
          postJson<any>(serviceApiUrl + '/magiclink/register?callbackPath=' + callbackPath, {
              email,
              firstname: '',
              lastname: '',
          }),
  }
}