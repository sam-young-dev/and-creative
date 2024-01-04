import { ClientOnly } from "@crystallize/reactjs-hooks";
import { useRemoteCart } from "~/ui/hooks/useRemoteCart";
import { useLocalCart } from "~/ui/hooks/useLocalCart";
import { CartItem } from "@crystallize/node-service-api-request-handlers";
import { Image } from '@crystallize/reactjs-components';
import Card from "~/ui/components/card/card";
import Link from "~/bridge/ui/Link";
import { Price as CrystallizePrice } from '../../lib/pricing/pricing-component';
import { VariantItem } from "./variantItem";
import { useAppContext } from "~/ui/app-context/provider";

export const HydratedCart: React.FC = () => {
  const { remoteCart, loading }: any = useRemoteCart();
  const { isImmutable, isEmpty, add: addToCart, remove: removeFromCart } = useLocalCart();
  const { state: contextState, path } = useAppContext();

  const { cart, total } = remoteCart?.cart || { cart: null, total: null };
  const voucher = {
    code: ""
  };

  if (isEmpty()) {
    return (
      <ClientOnly>
        <div className="flex justify-center items-center">
          <div>
            <h1 className="font-bold text-2xl">Cart is empty</h1>
            <br />
            <Link to={path("/shop/backpacks")}>
              Shop
            </Link>
          </div>
        </div>
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <div>
        <div className="flex mb-4 justify-between">
          <h1 className="font-bold text-2xl">Cart</h1>
          {loading && (
            <div className="flex items-center">
              <span className="pr-2">Loading...</span>
              <div className="loader" />
            </div>
          )}
        </div>
        <div className="flow">
          {!cart && <OptimisticHydratedCart />}
          {cart &&
            cart.items.map((item: CartItem, index: number) => {
              // const saving = savings[item.variant.sku]?.quantity > 0 ? savings[item.variant.sku] : null;
              const saving = null;
            
              return (
                <VariantItem 
                  key={index} 
                  item={item} 
                  isImmutable={isImmutable}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                />
              )
            })
          }
        </div>
        <div className="flex justify-between gap-5">
          {/* <VoucherForm /> */}
          <div>Voucher form</div>
          <div>
            {total && (
              <div className="flex flex-col gap-2 border-b-2 border-grey4 py-4 items-end">
                <div className="flex text-grey3 text-sm justify-between w-60">
                  <p>Discount</p>
                  <CrystallizePrice currencyCode={contextState.currency.code}>
                    {total.discounts
                      ? total.discounts.reduce((memo: number, discount: any) => {
                        return memo + (discount?.amount || 0)!;
                      }, 0)
                      : 0}
                  </CrystallizePrice>
                </div>
                <div className="flex text-grey3 text-sm justify-between w-60">
                  <p>Tax Amount</p>
                  <CrystallizePrice currencyCode={contextState.currency.code}>
                    {total.taxAmount}
                  </CrystallizePrice>
                </div>
                {voucher && voucher.code !== '' && (
                  <div className="flex text-grey3 text-sm justify-between w-60">
                    <p>Voucher Code</p>
                    <span>{voucher.code}</span>
                  </div>
                )}
                <div className="flex font-bold mt-2 text-lg justify-between w-60 items-end">
                  <p>To Pay</p>
                  <CrystallizePrice currencyCode={contextState.currency.code}>
                    {total.gross}
                  </CrystallizePrice>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between mt-10">
          <button className="bg-gray-100 py-2 px-5 rounded-md text-center font-semibold">
            <Link to={path("/")}>Back</Link>
          </button>
          <button
            data-testid="checkout-button"
            className="bg-gray-900 px-10 py-3 rounded text-gray-100 font-bold hover:bg-gray-800"
          >
            <Link to={path("/checkout")}>Checkout</Link>
          </button>
        </div>
      </div>
    </ClientOnly>
  )
}

export const OptimisticHydratedCart: React.FC = () => {
  const { cart: cart } = useLocalCart();
  const { state: contextState } = useAppContext();
  let total = 0;

  return (
    <>
      {Object.keys(cart.items).map((sku: string, index: number) => {
        const item = cart.items[sku as keyof typeof cart];
        total += item.quantity * item.price;
        return (
          <div key={index} className="flex justify-between bg-gray-100 py-5 pr-10 pl-5 items-center rounded-lg">
            <div className="flex cart-item gap-3 items-center">
              <Image />
              <div className="flex flex-col">
                <p className="text-xl font-semibold w-full">{item.name}</p>
                <CrystallizePrice currencyCode={contextState.currency.code}>
                  {item.price}
                </CrystallizePrice>
              </div>
            </div>
          </div>
        )
      })}
      <div className="flex flex-col gap-2 border-b-2 border-grey4 py-4 items-end">
        <div className="flex text-grey3 text-sm justify-between w-60">
          <p>Discount</p>
          <div className="loader" />
        </div>
        <div className="flex text-grey3 text-sm justify-between w-60">
          <p>Tax Amount</p>
          <div className="loader" />
        </div>
        <div className="flex font-bold mt-2 text-lg justify-between w-60 items-end">
          <p>To Pay</p>
          <p>
            <CrystallizePrice currencyCode={contextState.currency.code}>{total}</CrystallizePrice>
          </p>
        </div>
      </div>
    </>
  )
}