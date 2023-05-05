import { TRPCError } from "@trpc/server";
import { prisma } from "../../lib/database/user";
import { protectedProcedure, router } from "../trpc";
import { ManagementClient } from "auth0";
import { Prisma } from "@prisma/client";

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
      let response = await prisma.$transaction([
        prisma.lectureUserInfo.deleteMany({
          where: {
            sub: ctx.session.user.sub,
          },
        }),
      ]);
      console.log("deleted all user data", response);

      await auth0.deleteUser({ id: ctx.session.user.sub });
      console.log("deleted user from auth0", ctx.session.user);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: e.message,
          cause: e,
        });
      }

      console.log(e);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unexpected error",
        cause: e,
      });
    }

    return true;
  }),
});
