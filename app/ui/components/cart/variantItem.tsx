import { Image } from '@crystallize/reactjs-components';
import { CartItemPrice } from '../price/price';
import { CartItem } from "@crystallize/node-service-api-request-handlers";
import trashIcon from '~/assets/trashIcon.svg';

type VariantItemProps = { 
  item: CartItem;
  isImmutable?: () => boolean,
  addToCart?: any, 
  removeFromCart?: any 
}

export function VariantItem({ item, isImmutable, addToCart, removeFromCart }: VariantItemProps) {
  return (
    <div
      className="flex justify-between bg-gray-100 py-5 pr-10 pl-5 items-center rounded-lg"
    >
      <div className="flex cart-item gap-3 items-center">
        <Image
          {...item.variant.firstImage}
          sizes="100px"
          loading="lazy"
          alt={item.variant.name}
        />
        <div className="flex flex-col">
          <p className="text-xl font-semibold w-full">
            {item.variant.name} x {item.quantity}
          </p>
          <CartItemPrice item={item} saving={null} />
        </div>
      </div>
      <div className={`${isImmutable ? '' : 'hidden'} flex flex-col w-[40px] items-center justify-center gap-3`}>
        {isImmutable && !isImmutable() && (
          <button
            className="font-semibold w-[25px] h-[25px] rounded-sm"
            onClick={() => {
              addToCart({
                sku: item.variant.sku,
                name: item.variant.name!,
                price: item.variant.price!,
              });
            }}
          >
            {' '}
            +{' '}
          </button>
        )}

        <p className="text-center font-bold ">{item.quantity}</p>
        {isImmutable && !isImmutable() && (
          <button
            className="font-semibold w-[25px] h-[25px] rounded-sm"
            onClick={() => {
              removeFromCart(item.variant);
            }}
          >
            {' '}
            {item.quantity === 1 ? (
              <img src={trashIcon} width="25" height="25" alt="Trash icon" />
            ) : (
              '-'
            )}{' '}
          </button>
        )}
      </div>
    </div>
  )
}