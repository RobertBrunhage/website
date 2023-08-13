import { TRPCError } from "@trpc/server";
import { protectedProcedure, router } from "../trpc";
import { ManagementClient } from "auth0";
import { db } from "../../server/db";
import { lectureUserInfo, user, userCourses } from "../../server/schema";
import { eq } from "drizzle-orm";

const url = new URL(process.env.AUTH0_ISSUER_BASE_URL!);

export const auth0 = new ManagementClient({
  domain: url.hostname,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: "read:users delete:users",
});

export const accountRouter = router({
  delete: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      let response = await db.transaction(async (tx) => {
        let users = await tx
          .select()
          .from(user)
          .where(eq(user.sub, ctx.session.user.sub))
          .limit(1);

        await tx.delete(userCourses).where(eq(userCourses.userId, users[0].id));

        await tx.delete(user).where(eq(user.sub, ctx.session.user.sub));

        await tx
          .delete(lectureUserInfo)
          .where(eq(lectureUserInfo.sub, ctx.session.user.sub));
      });

      console.log("deleted all user data", response);

      await auth0.deleteUser({ id: ctx.session.user.sub });
      console.log("deleted user from auth0", ctx.session.user);
    } catch (e) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unexpected error",
        cause: e,
      });
    }
  }),
});
