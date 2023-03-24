import { initTRPC, TRPCError } from '@trpc/server';
import { Stripe } from 'stripe';
import { Context } from './context';

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
export const t = initTRPC.context<Context>().create();

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);


