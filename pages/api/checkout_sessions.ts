import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest } from 'next';
import Stripe from 'stripe';
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });

export default withApiAuthRequired(handler);

export type Override<T1, T2> = Omit<T1, keyof T2> & T2;

export type _CheckoutRequest = {
  productId: string;
  successPath: string;
}

export type CheckoutRequest = Override<NextApiRequest, { body: _CheckoutRequest }>

async function handler(
  req: CheckoutRequest,
  res: any
) {
  let userSession = await getSession(req, res);

  if (req.method === "POST" && userSession) {

    try {
      const { productId, successPath } = req.query;
      const productPrices = await stripe.prices.list({ product: productId as string, limit: 1 });
      const priceId = productPrices.data[0].id;

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        metadata: {
          sub: userSession.user.sub,
        },
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: priceId,
            quantity: 1,
          },
        ],
        customer_email: userSession.user.email,
        customer_creation: "always",
        mode: "payment",
        success_url: `${req.headers.origin}${successPath}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        automatic_tax: { enabled: true },
      });

      res.redirect(303, session.url);
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
