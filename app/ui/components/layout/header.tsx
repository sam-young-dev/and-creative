'use client';

import Link from "~/bridge/ui/Link";
import { ShoppingBag, User } from "react-feather";
import Logo from "~/assets/HMG-logo-hor-black.svg";
import { useLocalCart } from "~/ui/hooks/useLocalCart";
import { useAppContext } from "~/ui/app-context/provider";
import { ClientOnly } from "@crystallize/reactjs-hooks";

export const Header: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const { cart } = useLocalCart();
  const { path } = useAppContext();

  return (
    <header className="container py-3 mx-auto flex items-center justify-between max-w-7xl px-4 sm:px-6 lg:px-8">
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
      <div className="flex gap-3">
        <Link to={path('/orders')} className="hover:text-orange-600">
          <User size={18} />
        </Link>
        <Link to={path("/cart")} className="hover:text-orange-600">
          <div className="flex gap-1 align-items-center">
            <ShoppingBag size={18} />
            <ClientOnly>
              <span className="text-sm">({Object.keys(cart.items).reduce((memo: number, key: string) => {
                return memo + cart.items[key].quantity;
              }, 0)})</span>
            </ClientOnly>
          </div>
        </Link>
      </div>
    </header>
  )
}