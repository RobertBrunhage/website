import { initTRPC, TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Stripe } from "stripe";
import { Context } from "./context";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(10, "10 s"),
});

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
export const t = initTRPC.context<Context>().create();

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

const isRateLimited = t.middleware(async ({ next, ctx }) => {
  const ip = ctx.ip;

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
  }

  return next();
});

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure.use(isRateLimited);
export const protectedProcedure = t.procedure.use(isRateLimited).use(isAuthed);
