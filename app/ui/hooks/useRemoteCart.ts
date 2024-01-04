'use client';
import { RemoteCart } from '~/use-cases/contracts/RemoteCart';
import { useLocalCart } from './useLocalCart';
import { useEffect, useState } from 'react';
import { useAppContext } from '../app-context/provider';
import { ServiceAPI } from '~/use-cases/service-api';

export function useRemoteCart(): RemoteCart {
  const { cart, setWrappingData } = useLocalCart();
  const { state: appContextState } = useAppContext();
  const [state, setState] = useState({
    loading: true,
    hydratedCart: null
  })

  useEffect(() => {
    (async () => {
      setState({
        ...state,
        loading: true
      });

      // old
      // const response = await fetch("/api/cart", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     locale: "en",
      //     items: Object.values(cart.items),
      //   })
      // });
      // const hydratedCart = await response.json();

      // new
      const api = ServiceAPI({
        language: appContextState.language,
        serviceApiUrl: appContextState.serviceApiUrl,
      });
      const cartWrapper = await api.fetchRemoteCart(cart);
      if (cart.cartId !== cartWrapper.cartId || cart.state !== cartWrapper.state) {
        setWrappingData(cartWrapper.cartId, cartWrapper.state);
      }

      setState({
        ...state,
        loading: false,
        hydratedCart: cartWrapper,
      });
    })();
  }, [cart]);

  return {
    loading: state.loading,
    remoteCart: state.hydratedCart
  };
}