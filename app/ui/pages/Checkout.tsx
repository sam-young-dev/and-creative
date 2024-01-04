import { ClientOnly } from "@crystallize/reactjs-hooks";
import { useState } from "react";
import { CheckoutCart } from "../components/checkout-forms/cart";
import { AddressForm } from "../components/checkout-forms/address";
import { Payments } from "../components/payment";
import { Stripe } from "../components/payment/stripe";

export default () => {
  // const { isAuthenticated } = useAuth();
  // const [isGuestCheckout, setIsGuestCheckout] = useState(false);
  // const [showPayments, setShowPayments] = useState(true);

  return (
    <div className="min-h-[100vh] container py-3 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="flex gap-20 lg:flex-row flex-col">
        <CheckoutCart />
        <div className="rounded lg:px-10 lg:w-3/5 w-full px-3 lg:pr-0">
          <ClientOnly>
              <Stripe />
            {/* <>
              <AddressForm
                title="Guest Checkout"
                onValidSubmit={() => setShowPayments(true)}
              />
              <h2 className="font-bold text-2xl mt-5 mb-1">Payment</h2>
              {showPayments && <Payments />}
            </> */}
          </ClientOnly>
        </div>
      </div>
    </div>
  );
};