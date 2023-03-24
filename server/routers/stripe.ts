import { z } from 'zod';
import { protectedProcedure, router, stripe } from '../trpc';

export const stripeRouter = router({
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        successPath: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { session, req } = ctx;

      const productPrices = await stripe.prices.list({ product: input.productId as string, limit: 1 });
      const priceId = productPrices.data[0].id;

      const checkoutSession = await stripe.checkout.sessions.create({
        metadata: {
          sub: session.user.sub,
        },
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: priceId,
            quantity: 1,
          },
        ],
        customer_email: session.user.email,
        customer_creation: "always",
        mode: "payment",
        success_url: `${req.headers.origin}${input.successPath}/?success=true`,
        cancel_url: `${req.headers.origin}/?canceled=true`,
        automatic_tax: { enabled: true },
      });

      if (!checkoutSession) {
        throw new Error("Could not create checkout session");
      }

      return { checkoutUrl: checkoutSession.url };
    }),

});
