import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma, UserAppMetadata } from "../../lib/database/user";
import { procedure, protectedProcedure, router, stripe } from "../trpc";
import { auth0 } from "./account";

export const courseRouter = router({
  hasAccess: protectedProcedure
    .input(
      z.object({
        stripeProductId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      let user = await auth0.getUser({ id: ctx.session.user.sub });
      let metadata: UserAppMetadata | undefined = user.app_metadata;
      if (!metadata?.courses?.includes(input.stripeProductId)) {
        return false;
      }
      return true;
    }),
  seen: protectedProcedure
    .input(
      z.object({
        courseName: z.string(),
        lectureName: z.string(),
        seen: z.boolean().nullable(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      let lectureResponse = await prisma.lecture.upsert({
        where: {
          name: input.lectureName,
        },
        create: {
          name: input.lectureName,
          Course: {
            connect: {
              name: input.courseName,
            },
          },
        },
        update: {},
      });

      let seenResponse = await prisma.lectureUserInfo.upsert({
        where: {
          lectureInfoIdentifier: {
            sub: ctx.session.user.sub,
            lectureId: lectureResponse.id,
          },
        },
        create: {
          lecture: {
            connect: {
              id: lectureResponse.id,
            },
          },
          sub: ctx.session.user.sub,
          seen: true,
        },
        update: {
          seen: input.seen ?? false,
          lecture: {
            connect: {
              id: lectureResponse.id,
            },
          },
          sub: ctx.session.user.sub,
        },
      });

      return seenResponse.seen;
    }),
  course: procedure
    .input(
      z.object({
        courseName: z.string(),
      })
    )
    .query(async ({ input }) => {
      const course = await prisma.course.findFirst({
        where: {
          name: input.courseName,
        },
      });

      if (!course) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Course not found",
        });
      }

      const price = await stripe.prices.list({
        product: course.stripeProductId,
        limit: 1,
      });

      if (!price) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Price not found for course",
        });
      }

      let value = {
        stripeProductId: course.stripeProductId,
        price: price.data,
      };

      return value;
    }),
  allSeen: protectedProcedure
    .input(
      z.object({
        courseName: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      let response = await prisma.lectureUserInfo.findMany({
        where: {
          sub: ctx.session.user.sub,
          lecture: {
            Course: {
              name: input.courseName,
            },
          },
        },
        include: {
          lecture: true,
        },
      });

      type SeenLecture = {
        name: string;
        seen: boolean;
      };

      let allSeen: SeenLecture[] = [];
      for (let i = 0; i < response.length; i++) {
        allSeen.push({
          name: response[i].lecture.name,
          seen: response[i].seen,
        });
      }
      return allSeen;
    }),
});
