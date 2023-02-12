import Cors from 'micro-cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import { createUserAndConnectWithCourse } from '../../../lib/database/user';

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
}

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req)
    const sig = req.headers['stripe-signature']!

    let event: Stripe.Event
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15', typescript: true })

    try {
      event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret)
    } catch (err: any) {
      // On error, log and return the error message
      console.log(`❌ Error message: ${err.message}`)
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }

    // Successfully constructed event
    console.log('✅ Success:', event.id);
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        const { line_items } = await stripe.checkout.sessions.retrieve(
          session.id,
          {
            expand: ["line_items"],
          }
        );

        const stripeProductId = line_items?.data[0].price?.product as string;
        const stripeCustomerId = session.customer as string;
        const stripeCustomerEmail = session.customer_details?.email;
        const sub = session.metadata!.sub;
        console.log(`${stripeCustomerEmail} with stripeId ${stripeCustomerId} has purchased a course with the stripeProductId of ${stripeProductId}`);

        try {
          await createUserAndConnectWithCourse(sub, stripeCustomerId, stripeProductId);
        } catch (error) {
          console.log(`❌ Error message: ${error}`);
          res.status(400).send(`Webhook not success`);
          return;
        }

        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    res.status(200).send(`Webhook success`);
    return;
  }
}

export default cors(webhookHandler as any);
