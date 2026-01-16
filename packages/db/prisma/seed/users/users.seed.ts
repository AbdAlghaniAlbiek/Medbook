import { PrismaClient } from "@prisma/client";
import { users } from "./users.data";

export default async (prisma: PrismaClient) => {
  for (const user of users) {
    const { id, ...restData } = user;
    await prisma.user.upsert({
      where: {
        id,
      },
      update: {
        ...restData,
      },
      create: {
        ...restData,
      },
    });
  }
};
