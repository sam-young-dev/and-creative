'use client';

import { useLocalStorage, writeStorage } from '@rehooks/local-storage';
import { Elements, PaymentElement, useElements, useStripe, AddressElement, ExpressCheckoutElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { ServiceAPI } from '~/use-cases/service-api';
import useNavigate from '~/bridge/ui/useNavigate';
import { Customer } from '~/use-cases/contracts/Customer';
import { useAppContext } from '../../app-context/provider';
import { useLocalCart } from '../../hooks/useLocalCart';
import { useAuth } from '~/ui/hooks/useAuth';

export const Stripe: React.FC = () => {
    const { state } = useAppContext();
    const [clientSecret, setClientSecret] = useState<string>('');
    const { cart, isEmpty } = useLocalCart();
    const [customer] = useLocalStorage<Partial<Customer>>('customer', {});

    const variables = state.paymentImplementationVariables ? state.paymentImplementationVariables['stripe'] : {};
    if (!variables || !variables.PUBLIC_KEY) {
        return null;
    }
    const stripePromise = loadStripe(variables.PUBLIC_KEY);

    // Enable the skeleton loader UI for the optimal loading experience.
    const loader = 'auto';

    useEffect(() => {
        (async () => {
            if (!isEmpty()) {
                // before anything else we place the cart
                try {
                    await ServiceAPI({ language: state.language, serviceApiUrl: state.serviceApiUrl }).placeCart(
                        cart,
                        customer,
                    );
                } catch (exception) {
                    console.log(exception);
                }

                const data = await ServiceAPI({
                    language: state.language,
                    serviceApiUrl: state.serviceApiUrl,
                }).stripe.fetchPaymentIntent(cart);

                setClientSecret(data.key);
            }
        })();
    }, [cart.items]);

    if (!clientSecret) {
        return null;
    }
    return (
        <Elements options={{ clientSecret, loader }} stripe={stripePromise}>
            <StripCheckoutForm />
        </Elements>
    );
};

const StripCheckoutForm: React.FC = () => {
    const { cart, empty } = useLocalCart();
    const { path } = useAppContext();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [state, setState] = useState<{
        error: string | null;
        succeeded: boolean;
        processing: boolean;
    }>({ succeeded: false, error: null, processing: false });

    const [email, setEmail] = useState('');
    const { isAuthenticated, userInfos } = useAuth();
    const [customer] = useLocalStorage<Partial<Customer>>('customer', {
        email: userInfos?.email,
        firstname: userInfos?.firstname,
        lastname: userInfos?.lastname,
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setState({
            ...state,
            processing: true,
        });

        const payload = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: 'https://' + window.location.host + '/order/cart/' + cart.cartId,
                receipt_email: email,
            },
            redirect: 'if_required'
        });

        if (payload.error) {
            setState({
                ...state,
                error: `Payment failed ${payload.error.message}`,
                processing: false,
            });
        } else {
            setState({
                ...state,
                error: null,
                processing: false,
                succeeded: true,
            });
            empty();
            navigate(path(`/order/cart/${cart.cartId}`), { replace: true });
        }
    };

    const onAddressElementChange = (event: any) => {
        if (event.complete) {
            const address = event.value.address;

            var fullName = event.value.name.trim();
            var nameArray = fullName.split(' ');

            writeStorage('customer', {
                ...customer,
                firstname: nameArray[0],
                lastname: nameArray[fullName.length - 1],
                // address stuff here
            });
        }
    }

    const onEmailChange = (value: any) => {
        setEmail(value);

        writeStorage('customer', {
            ...customer,
            email: value
        });
    }

    return (
        <>
            <h2 className="font-bold text-xl text-gray-700">Shipping Information</h2>
            <form id="stripe-payment-form" onSubmit={handleSubmit} className="stripe-form flow mt-6">
                <div>
                    <label htmlFor="email" className="stripe-label">Email</label>
                    <input
                        defaultValue={customer.email || userInfos?.email}
                        placeholder="Enter email address"
                        id="email"
                        type="text"
                        className="stripe-email"
                        name="email"
                        required
                        onChange={(e: any) => onEmailChange(e.target.value)}
                    />
                </div>
                <div>
                    <h4 className="text-base font-medium text-gray-500 mb-2">Shipping Address</h4>
                    <AddressElement options={{ mode: 'shipping' }} onChange={(e) => onAddressElementChange(e)} />
                </div>
                <div className="pt-5">
                    <h4 className="text-base font-medium text-gray-500 mb-2">Payment Method</h4>
                    <PaymentElement id="payment-element" />
                </div>

                <br />
                <StripeButton paying={state.processing || !stripe || !elements} />
            </form>
        </>
    );
};

export const StripeButton: React.FC<{ paying?: boolean; onClick?: () => Promise<void> | void }> = ({
    paying = false,
    onClick,
}) => {
    return (
        <button
            type={onClick ? 'button' : 'submit'}
            disabled={paying}
            onClick={onClick ? onClick : undefined}
            className="w-full text-white text-center mt-2 py-2 px-4 rounded-md px-8 bg-blue-500 hover:bg-blue-600"
        >
            {!paying && 'Pay'}
            <span id="button-text" className="text-textBlack">
                {paying ? 'Processing' : ''}
            </span>
        </button>
    );
};
