import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function createUserAndConnectWithCourse(sub: string, email: string, stripeCustomerId: string, stripeProductId: string) {
  await prisma.user.upsert({
    where: {
      sub: sub,
    },
    create: {
      sub: sub,
      email: email,
      stripeCustomerId: stripeCustomerId,
    },
    update: {},
  });

  await prisma.userCourses.upsert({
    where: {
      stripeCustomerId_stripeProductId: {
        stripeCustomerId: stripeCustomerId,
        stripeProductId: stripeProductId,
      }
    },
    create: {
      stripeProductId: stripeProductId,
      stripeCustomerId: stripeCustomerId,
    },
    update: {},
  });
}
