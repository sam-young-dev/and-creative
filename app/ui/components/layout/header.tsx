'use client';

import { useEffect, useState } from "react";
import Link from "~/bridge/ui/Link";
import { User } from "react-feather";
import Logo from "~/assets/HMG-logo-hor-black.svg";
import { useAppContext } from "~/ui/app-context/provider";
import { CartButton } from "./cart-button";
import { Image } from '@crystallize/reactjs-components';
import { CartItemPrice } from "../price/price";
import useLocation from "~/bridge/ui/useLocation";

export const Header: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const { state: appContextState, dispatch: appContextDispatch, path } = useAppContext();
  let [isOpen, setIsOpen] = useState(false);
  let location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

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
      <div className="justify-between-full fixed z-40 bg-[#fff] w-full left-0 top-0">
        <div className="flex flex-auto items-center mx-auto px-6 xl:container pt-3 pb-2">
          <div className="flex mx-auto flex-auto justify-between items-center relative">
            <div className="flex gap-4 md:gap-10 items-center">
              <Link to={path('/')}>
                <div className="max-h-[80px] h-[30px] max-w-[100%] img-container">
                  <img src={Logo} alt="logo" width="120" height="40" />
                </div>
              </Link>
              <div
                className={`flex gap-10 lg:flex lg:items-center lg:flex-row flex-col lg:w-auto lg:h-auto lg:relative lg:px-0 lg:py-0 lg:mt-0 lg:top-0 ${isOpen ? 'block' : 'hidden'
                  } top-10 mt-5 bg-[#fff] w-full right-0 left-0 z-50 h-screen fixed left-0 bottom-0 px-10 py-10`}
              >
                {/* <SearchBar /> */}
                {navigation
                  .map((item: any) => {
                    return (
                      <Link
                        to={path(item.path)}
                        prefetch="intent"
                        key={item.path}
                        className="hover:underline"
                      >
                        {item.name}
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>

          <div className="flex flex-auto items-center justify-end h-[40px] w-[100px]">
            <Link to={path('/orders')} className="p-2 rounded-md hover:bg-[#efefef]">
              <User size={18} />
            </Link>
            <CartButton />
          </div>
          <div className="z-50 p-[10px] h-[40px] text-center rounded-md cursor-pointer hover:bg-[#efefef] lg:hidden block">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="focus:outline-none"
              aria-controls="mobile-menu"
              aria-label="Mobile Menu"
              title="Mobile Menu"
              aria-expanded="false"
            >
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}