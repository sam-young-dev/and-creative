import { CartItem } from "@crystallize/node-service-api-request-handlers";
import { Price as CrystallizePrice } from '../../lib/pricing/pricing-component';
import { ProductVariant } from "@crystallize/js-api-client";

// export const Price: React.FC<{ variant: ProductVariant; size?: string }> = ({ variant, size = 'medium' }) => {
//   // const { state } = useAppContext();
//   const state = {
//     currency: {
//       code: 'USD'
//     }
//   }
//   const price = displayPriceFor(
//       variant,
//       {
//           default: 'default',
//           discounted: 'sales',
//       },
//       state.currency.code,
//   );
//   return <DiscountedPrice price={price} size={size} />;
// };

export const CartItemPrice: React.FC<{
  item: CartItem;
  saving: any;
  size?: string;
}> = ({ item, saving, size = 'small' }) => {
  // const mapper = DataMapper();
  // const { state, _t } = useAppContext();
  const state = {
    currency: {
      code: 'USD'
    }
  }

  return (
      <>
          {/* <Price variant={mapper.API.Object.APIProductVariantToProductVariant(item.variant)} size={size} /> */}
          <CrystallizePrice currencyCode={state.currency.code}>{item.price.gross}</CrystallizePrice>
          <div>
              Total:{' '}
              <CrystallizePrice currencyCode={state.currency.code}>{item.price.gross}</CrystallizePrice>
              {saving && (
                  <>
                      <del className="text-red mx-2">
                          <CrystallizePrice currencyCode={state.currency.code}>
                              {item.price.net + saving.amount}
                          </CrystallizePrice>
                      </del>
                      <small>({saving.quantity} for free!)</small>
                  </>
              )}
          </div>
      </>
  );
};