"use server";

import { db } from "../lib/prisma";

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
  return await db.booking.create({
    data: {
      serviceId,
      userId,
      barbershopId,
      date,
    },
  });
};
