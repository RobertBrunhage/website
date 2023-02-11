import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function createUserAndConnectWithCourse(sub: string, stripeCustomerId: string, stripeProductId: string) {
  await prisma.user.create({
    data: {
      stripeCustomerId: stripeCustomerId,
      sub: sub,
      courses: {
        connect: {
          stripeProductId: stripeProductId
        }
      }
    }
  });
}
