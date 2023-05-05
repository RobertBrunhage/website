import { PrismaClient } from "@prisma/client";
import { auth0 } from "../../server/routers/account";

export const prisma = new PrismaClient();

export type UserAppMetadata = {
  stripeCustomerId?: string;
  courses?: string[];
};

export async function connectCourseWithUser(
  sub: string,
  stripeCustomerId: string,
  stripeProductId: string
) {
  let user = await auth0.getUser({ id: sub });

  let metadata: UserAppMetadata | undefined = user.app_metadata;
  let courses = metadata?.courses ?? [];
  courses.push(stripeProductId);

  await auth0.updateAppMetadata(
    {
      id: sub,
    },
    {
      stripeCustomerId: stripeCustomerId,
      courses: courses,
    }
  );
}
