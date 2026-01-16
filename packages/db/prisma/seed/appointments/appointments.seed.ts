import { PrismaClient } from "@prisma/client";
import { appointments } from "./appointments.data";

export default async (prisma: PrismaClient) => {
  for (const appointment of appointments) {
    const { id, ...restData } = appointment;
    await prisma.appointment.upsert({
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
