import { ClientInterface } from '@crystallize/js-api-client';
import { TStoreFrontConfig } from '@crystallize/js-storefrontaware-utils';
import {
    CartWrapperRepository,
    handleStripePaymentIntentWebhookRequestPayload,
} from '@crystallize/node-service-api-request-handlers';
import pushOrder from '../../crystallize/write/pushOrder';

export default async (
    cartWrapperRepository: CartWrapperRepository,
    apiClient: ClientInterface,
    signature: string,
    payload: any,
    storeFrontConfig: TStoreFrontConfig,
) => {
    return await handleStripePaymentIntentWebhookRequestPayload(payload, {
        secret_key: process.env.STRIPE_SECRET_KEY ?? storeFrontConfig.configuration?.STRIPE_SECRET_KEY ?? '',
        endpointSecret:
            process.env.STRIPE_SECRET_PAYMENT_INTENT_WEBHOOK_ENDPOINT_SECRET ??
            storeFrontConfig.configuration?.SECRET_PAYMENT_INTENT_WEBHOOK_ENDPOINT_SECRET ??
            '',
        signature,
        rawBody: payload,
        handleEvent: async (eventName: string, event: any) => {
            const cartId = event.data.object.metadata.cartId;
            const cartWrapper = await cartWrapperRepository.find(cartId);
            if (!cartWrapper) {
                throw {
                    message: `Cart '${cartId}' does not exist.`,
                    status: 404,
                };
            }
            switch (eventName) {
                case 'payment_intent.succeeded':
                    // console.log("payment method: ", event.data.object.payment_method)
                    // console.log("metadata: ", event.data.object.metadata)
                    const orderCreatedConfirmation = await pushOrder(cartWrapperRepository, apiClient, cartWrapper, {
                        //@ts-ignore
                        provider: 'stripe',
                        stripe: {
                            paymentIntentId: event.data.object.id,
                            paymentMethod: event.data.object.payment_method,
                            stripe: `eventId:${event.id}`,
                            // metadata: event.data.object.charges.data[0].receipt_url,
                            // metadata: event.data.object.metadata,
                        },
                    });
                    return orderCreatedConfirmation;
            }
        },
    });
};
