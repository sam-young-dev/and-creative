'use client';

import { useEffect } from "react";
import Link from "~/bridge/ui/Link";
import { User } from "react-feather";
import Logo from "~/assets/HMG-logo-hor-black.svg";
import { useAppContext } from "~/ui/app-context/provider";
import { CartButton } from "./cart-button";
import { Image } from '@crystallize/reactjs-components';
import { CartItemPrice } from "../price/price";

export const Header: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const { state: appContextState, dispatch: appContextDispatch, path } = useAppContext();

  useEffect(() => {
    if (appContextState.latestAddedCartItems.length === 0) {
      return;
    }
    let timeout: ReturnType<typeof setTimeout>;
    setTimeout(() => {
      appContextDispatch.resetLastAddedItems();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [appContextState.latestAddedCartItems]);

  return (
    <header className="container py-3 mx-auto flex items-center justify-between max-w-7xl px-4 sm:px-6 lg:px-8">

      {appContextState.latestAddedCartItems.length > 0 && (
        <div className="border-[#dfdfdf] border rounded-md shadow fixed max-w-full sm:top-2 sm:right-2 bg-[#fff]  z-[60]  p-6">
          <p className="font-bold text-md mb-3 pb-2">Added product(s) to cart</p>
          {appContextState.latestAddedCartItems.map((item, index) => {
            console.log("appContextState: ", item)
            return (
              <div className="flex p-3 mt-1 items-center bg-grey2 gap-3" key={index}>
                <div className="max-w-[35px] max-h-[50px] img-container img-contain">
                  <Image {...item.images?.[0]} sizes="100px" fallbackAlt={item.name} key={item.id} />
                </div>
                <div>
                  <p className="text-sm">{item.name}</p>
                  <div className="text-sm font-bold">
                    <CartItemPrice item={item} saving={null} />
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex gap-3 mt-3 items-center border-t pt-2 border-t-[#dfdfdf]">
            <button
              data-testid="go-to-cart-button"
              className="bg-grey text-sm text-[#000] font-bold py-2 px-4 rounded-md"
            >
              <Link to={path('/cart')}>Go to cart</Link>
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-6">
        <Link className="font-bold text-2xl" to={path("/")}>
          <img src={Logo} alt="logo" width="170" height="50" />
        </Link>
        <nav className="flex gap-6">
          {navigation.map((navItem: any) => {
            return (
              <Link key={navItem.path} to={path(navItem.path)} className="font-bold hover:text-orange-600">{navItem.name}</Link>
            )
          })}
        </nav>
      </div>
      <div className="flex gap-3 items-center">
        <Link to={path('/orders')} className="hover:text-orange-600">
          <User size={18} />
        </Link>
        <CartButton />
      </div>
    </header>
  )
}