import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "../../server/db";
import {
  course,
  lecture,
  lectureUserInfo,
  user,
  userCourses,
} from "../../server/schema";
import { procedure, protectedProcedure, router, stripe } from "../trpc";

export const courseRouter = router({
  hasAccess: protectedProcedure
    .input(
      z.object({
        stripeProductId: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      console.log("no");
      let users = await db
        .select()
        .from(user)
        .leftJoin(userCourses, eq(user.id, userCourses.userId))
        .leftJoin(course, eq(course.id, userCourses.courseId))
        .where(eq(user.sub, ctx.session.user.sub))
        .where(eq(course.stripeProductId, input.stripeProductId))
        .limit(1);

      if (users.length === 0) return false;
      if (!users[0].course) return false;

      return true;
    }),
  seen: protectedProcedure
    .input(
      z.object({
        courseName: z.string(),
        lectureName: z.string(),
        seen: z.boolean().nullable(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      let seen = await db.transaction(async (tx) => {
        let courses = await tx
          .select()
          .from(course)
          .where(eq(course.name, input.courseName))
          .limit(1);

        if (courses.length === 0)
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `Course not found: ${input.courseName}`,
          });

        let existingCourse = courses[0];

        await tx
          .insert(lecture)
          .values({
            name: input.lectureName,
            courseId: existingCourse.id,
          })
          .onDuplicateKeyUpdate({
            set: { name: input.lectureName },
          });

        let lectures = await tx
          .select()
          .from(lecture)
          .where(eq(lecture.name, input.lectureName))
          .limit(1);

        await tx
          .insert(lectureUserInfo)
          .values({
            sub: ctx.session.user.sub as string,
            lectureId: lectures[0].id,
            seen: true,
          })
          .onDuplicateKeyUpdate({
            set: {
              seen: input.seen ?? false,
            },
          });

        let infos = await tx
          .select()
          .from(lectureUserInfo)
          .where(eq(lectureUserInfo.sub, ctx.session.user.sub))
          .where(eq(lectureUserInfo.lectureId, lectures[0].id))
          .limit(1);

        return infos[0].seen;
      });

      return seen;
    }),
  course: procedure
    .input(
      z.object({
        courseName: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const courses = await db
        .select()
        .from(course)
        .where(eq(course.name, input.courseName))
        .limit(1);

      if (courses.length === 0)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Course not found: ${input.courseName}`,
        });

      let existingCourse = courses[0];

      const price = await stripe.prices.list({
        product: existingCourse.stripeProductId,
        limit: 1,
      });

      if (!price) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Price not found for course",
        });
      }

      let value = {
        stripeProductId: existingCourse.stripeProductId,
        price: price.data,
      };

      return value;
    }),
  allSeen: protectedProcedure
    .input(
      z.object({
        courseName: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      let response = await db
        .select()
        .from(lectureUserInfo)
        .innerJoin(lecture, eq(lecture.id, lectureUserInfo.lectureId))
        .innerJoin(course, eq(course.id, lecture.courseId))
        .where(eq(lectureUserInfo.sub, ctx.session.user.sub))
        .where(eq(course.name, input.courseName));

      type SeenLecture = {
        name: string;
        seen: boolean;
      };

      let allSeen: SeenLecture[] = [];
      for (let i = 0; i < response.length; i++) {
        allSeen.push({
          name: response[i].lecture.name,
          seen: response[i].lecture_user_info.seen,
        });
      }
      return allSeen;
    }),
});
