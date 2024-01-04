import { LoaderFunction, redirect } from '@remix-run/node';
import { getContext } from '~/use-cases/http/utils';
import { getStoreFront } from '~/use-cases/storefront.server';
import { authCookie } from '~/core/cookies.server';
import handleMagicLink from '~/use-cases/user/handleMagicLink';

export const loader: LoaderFunction = async ({ request, params }) => {
    const requestContext = getContext(request);
    const { secret: storefront } = await getStoreFront(requestContext.host);
    // const config = require('platformsh-config').config();
    // const frontendURL = config.isValidPlatform()
    //     ? config.getRoute('frontapp').url.replace(/\/$/, '').replace('*', storefront.config.identifier)
    //     : requestContext.baseUrl;

    const frontendURL = requestContext.baseUrl;
    console.log("frontendURL: ", frontendURL);

    const { redirectUrl, cookie } = await handleMagicLink(frontendURL, requestContext, params.token || '');

    return redirect(redirectUrl as string, {
        headers: {
            'Set-Cookie': await authCookie.serialize(cookie),
        },
    });
};
