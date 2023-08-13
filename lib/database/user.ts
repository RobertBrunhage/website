import { eq } from "drizzle-orm";
import { db } from "../../server/db";
import { course, user, userCourses } from "../../server/schema";

export type UserAppMetadata = {
  stripeCustomerId?: string;
  courses?: string[];
};

export async function connectCourseWithUser(
  sub: string,
  stripeCustomerId: string,
  stripeProductId: string,
) {
  await db.transaction(async (tx) => {
    await db
      .insert(user)
      .values({
        sub: sub,
        stripeCustomerId: stripeCustomerId,
      })
      .onDuplicateKeyUpdate({
        set: { stripeCustomerId: stripeCustomerId, sub: sub },
      });

    let users = await tx
      .select()
      .from(user)
      .where(eq(user.stripeCustomerId, stripeCustomerId))
      .limit(1);

    let courses = await tx
      .select()
      .from(course)
      .where(eq(course.stripeProductId, stripeProductId))
      .limit(1);

    await db.insert(userCourses).values({
      userId: users[0].id,
      courseId: courses[0].id,
    });
  });
}
