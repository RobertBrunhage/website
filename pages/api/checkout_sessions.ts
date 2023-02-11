import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextApiRequest } from 'next';
import Stripe from 'stripe';
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });

export default withApiAuthRequired(handler);

async function handler(
  req: NextApiRequest,
  res: any
) {
  let userSession = getSession(req, res);

  if (req.method === "POST" && userSession) {

    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        metadata: {
          sub: userSession.user.sub,
        },
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "price_1MYBwLJJhSD3uO24JMouObau",
            quantity: 1,
          },
        ],
        customer_creation: "always",
        mode: "payment",
        success_url: `${req.headers.origin}/?success=true`,
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
