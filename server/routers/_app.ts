import { router } from "../trpc";
import { courseRouter } from "./course";
import { stripeRouter } from "./stripe";

export const appRouter = router({
  course: courseRouter, // put procedures under "post" namespace
  stripe: stripeRouter, // put procedures under "post" namespace
});

// export type definition of API
export type AppRouter = typeof appRouter;
