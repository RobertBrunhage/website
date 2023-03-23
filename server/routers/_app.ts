import { z } from 'zod';
import { prisma } from '../../lib/database/user';
import { stripe } from '../../pages/api/checkout_sessions';
import { procedure, router } from '../trpc';

export const appRouter = router({
  hasAccess: procedure
    .input(
      z.object({
        stripeProductId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (!ctx.session?.user) {
        return false;
      }

      const user = await prisma.user.findFirst({
        where: {
          sub: ctx.session.user.sub,
        },
        include: {
          courses: true,
        }
      });

      let hasCourse = user?.courses.map((c) => c.stripeProductId).includes(input.stripeProductId);
      return hasCourse;
    }),
  seen: procedure
    .input(
      z.object({
        courseName: z.string(),
        lectureName: z.string(),
        seen: z.boolean().nullable(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session?.user) {
        throw new Error('Not logged in');
      }

      console.log(input);

      let lectureResponse = await prisma.lecture.upsert({
        where: {
          name: input.lectureName,
        },
        create: {
          name: input.lectureName,
          Course: {
            connect: {
              name: input.courseName,
            }
          },
        },
        update: {}
      });

      console.log(lectureResponse.id);
      console.log(ctx.session.user.sub);

      let seenResponse = await prisma.lectureUserInfo.upsert({
        where: {
          lectureInfoIdentifier: {
            sub: ctx.session.user.sub,
            lectureId: lectureResponse.id,
          }
        },
        create: {
          lecture: {
            connect: {
              id: lectureResponse.id,
            }
          },
          user: {
            connect: {
              sub: ctx.session.user.sub,
            }
          },
          seen: true,
        },
        update: {
          seen: input.seen ?? false,
          lecture: {
            connect: {
              id: lectureResponse.id,
            }
          },
          user: {
            connect: {
              sub: ctx.session.user.sub,
            }
          },
        }
      });

      return seenResponse.seen;
    }),
  course: procedure
    .input(
      z.object({
        courseName: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {

      if (!ctx.session?.user) {
        throw new Error('Not logged in');
      }

      const course = await prisma.course.findFirst({
        where: {
          name: input.courseName,
        },
      });

      if (!course) {
        return null;
      }

      const price = await stripe.prices.list({ product: course?.stripeProductId, limit: 1 });

      if (!price) {
        return null;
      }

      let value = { stripeProductId: course?.stripeProductId, price: price.data }

      return value;
    }),
  allSeen: procedure
    .input(
      z.object({
        courseName: z.string(),
      }),
    ).query(async ({ input, ctx }) => {
      if (!ctx.session?.user) {
        throw new Error('Not logged in');
      }

      let response = await prisma.lectureUserInfo.findMany({
        where: {
          user: {
            sub: ctx.session.user.sub,
          },
          lecture: {
            Course: {
              name: input.courseName,
            }
          }
        },
        include: {
          lecture: true,
        }
      });


      type SeenLecture = {
        name: string;
        seen: boolean;
      }

      let allSeen: SeenLecture[] = [];
      for (let i = 0; i < response.length; i++) {
        allSeen.push({ name: response[i].lecture.name, seen: response[i].seen });
      }
      return allSeen;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;


