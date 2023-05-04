import { PrismaClient } from "@prisma/client";
import { auth0 } from "../../server/routers/account";

export const prisma = new PrismaClient();

export async function connectCourseWithUser(
  sub: string,
  stripeCustomerId: string,
  stripeProductId: string
) {
  await auth0.updateAppMetadata(
    {
      id: sub,
    },
    {
      stripeCustomerId: stripeCustomerId,
    }
  );
  await prisma.userCourses.upsert({
    where: {
      sub_stripeProductId: {
        stripeProductId: stripeProductId,
        sub: sub,
      },
    },
    create: {
      course: {
        connect: {
          stripeProductId: stripeProductId,
        },
      },
      sub: sub,
    },
    update: {},
  });
}
