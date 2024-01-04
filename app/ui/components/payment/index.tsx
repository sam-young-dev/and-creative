import { useState } from "react";
import { useLocalCart } from "~/ui/hooks/useLocalCart";
import { Stripe, StripeButton } from './stripe';
import { useAppContext } from "~/ui/app-context/provider";

export const Payments: React.FC = () => {
  const { state } = useAppContext();
  const { cart, isImmutable } = useLocalCart();
  const paymentMethodImplementations = {
    stripe: {
      name: 'Stripe',
      component: Stripe,
      button: StripeButton,
      renderOnLoad: true,
      enabled: state.paymentImplementations.includes('stripe'),
    },
  }
  const [selectedPaymentMethodImplementation, setSelectedPaymentMethodImplementation] = useState<string | null>('stripe');

  if (selectedPaymentMethodImplementation) {
    const implementation =
      paymentMethodImplementations[selectedPaymentMethodImplementation as keyof typeof paymentMethodImplementations];
    return (
      <div className="payment-method mb-4 bg-gray-100 mt-5 rounded p-6">
        <implementation.component />
      </div>
    );
  }

  return (
    <>
      <h2 className="font-bold text-2xl mt-5 mb-1">Payment</h2>
      {/* {isImmutable() && <CloneCartBtn />} */}
      <br />

      {!cart.cartId && <div className="loader" />}
      {!isImmutable() && (
        <div className="grid grid-cols-1 gap-1">
          {Object.keys(paymentMethodImplementations).map((implementationKey) => {
            const implementation =
              paymentMethodImplementations[
              implementationKey as keyof typeof paymentMethodImplementations
              ];
            if (!implementation.enabled) {
              return null;
            }
            if (implementation.renderOnLoad) {
              return <implementation.component key={implementationKey} />
            }
            return (
              <implementation.button
                key={implementationKey}
                onClick={() => setSelectedPaymentMethodImplementation(implementationKey)}
              />
            );
          })}
        </div>
      )}
    </>
  );
}