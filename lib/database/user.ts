import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function createUserAndConnectWithCourse(
  sub: string,
  email: string,
  stripeCustomerId: string,
  stripeProductId: string
) {
  await prisma.userCourses.upsert({
    where: {
      stripeCustomerId_stripeProductId: {
        stripeCustomerId: stripeCustomerId,
        stripeProductId: stripeProductId,
      },
    },
    create: {
      course: {
        connect: {
          stripeProductId: stripeProductId,
        },
      },
      user: {
        connectOrCreate: {
          where: {
            sub: sub,
          },
          create: {
            sub: sub,
            email: email,
            stripeCustomerId: stripeCustomerId,
          },
        },
      },
    },
    update: {},
  });
}
