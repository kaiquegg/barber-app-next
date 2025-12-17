"use server";

import { revalidatePath } from "next/cache";
import { db } from "../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

interface CreateBookingParams {
  serviceId: string;
  userId: string;
  barbershopId: string;
  date: Date;
}

export const createBooking = async ({
  serviceId,
  userId,
  barbershopId,
  date,
}: CreateBookingParams) => {
  const user = await getServerSession(authOptions);

  if (!user) {
    throw new Error("Você deve estar logado para criar uma reserva.");
  }

  await db.booking.create({
    data: {
      serviceId,
      userId,
      barbershopId,
      date,
    },
  });
  revalidatePath(`/barbershop/[id]`);
};
