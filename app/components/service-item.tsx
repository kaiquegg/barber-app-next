"use client";

import Image from "next/image";
import { Booking } from "../generated/prisma";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { format, isPast, isToday, set } from "date-fns";
import { useSession } from "next-auth/react";
import { createBooking } from "../_actions/create-booking";
import { toast } from "sonner";
import { getBookings } from "../_actions/get-bookings";
import { Dialog, DialogContent } from "./ui/dialog";
import SignInDialog from "./sign-in-dialog";

interface ServiceItemProps {
  service: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
  };
  barbershop: {
    id: string;
    name: string;
  };
}

interface GetTimeListProps {
  bookings: Booking[];
  selectedDay: Date;
}

const TIME_LIST: string[] = Array.from({ length: (18 - 9) * 2 + 1 }, (_, i) => {
  const totalMinutes = 9 * 60 + i * 30;
  const hh = Math.floor(totalMinutes / 60)
    .toString()
    .padStart(2, "0");
  const mm = (totalMinutes % 60).toString().padStart(2, "0");
  return `${hh}:${mm}`;
});

const getTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(":")[0]);
    const minutes = Number(time.split(":")[1]);

    const timeIsOnThePast = isPast(set(new Date(), { hours: hour, minutes }));

    if (timeIsOnThePast && isToday(selectedDay)) {
      return false;
    }

    const hasBookingOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes,
    );

    if (hasBookingOnCurrentTime) {
      return false;
    }
    return true;
  });
};

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false);
  const { data } = useSession();

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [dayBookings, setDayBookings] = useState<Booking[]>([]);
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return;
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      });
      setDayBookings(bookings);
    };
    fetch();
  }, [selectedDay, service.id]);

  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true);
    }
    return setSignInDialogIsOpen(true);
  };

  const handleBookingSheetIsOpen = () => {
    setSelectedDay(undefined);
    setSelectedTime(null);
    setDayBookings([]);
    setBookingSheetIsOpen(false);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleCreateBooking = async () => {
    // 1. Don't allow booking if already booked
    // 2. Only allow booking if user is logged in
    try {
      if (!selectedDay || !selectedTime) return;

      const hour = selectedTime.split(":")[0];
      const minute = selectedTime.split(":")[1];
      const newDate = set(selectedDay, {
        hours: Number(hour),
        minutes: Number(minute),
      });
      await createBooking({
        serviceId: service.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userId: (data?.user as any).id,
        barbershopId: barbershop.id,
        date: newDate,
      });
      handleBookingSheetIsOpen();
      toast.success(
        `Agendamento de ${service.name.toLocaleLowerCase()} criado com sucesso!`,
      );
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar agendamento. Tente novamente.");
    }
  };

  return (
    <>
      <Card>
        <CardContent className="flex items-center gap-3 p-3">
          <div className="relative max-h-[110px] min-h-[110px] max-w-[110px] min-w-[110px]">
            <Image
              src={service.imageUrl}
              alt={service.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>

          {/* right */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>
            {/* Price and button */}
            <div className="flex items-center justify-between">
              <p className="text-primary text-sm font-bold">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </p>

              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetIsOpen}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    handleBookingClick();
                  }}
                >
                  Reservar
                </Button>

                <SheetContent className="px-0">
                  <SheetHeader className="flex items-center">
                    <SheetTitle>Reservar {service.name}</SheetTitle>
                  </SheetHeader>

                  <div className="border-b border-solid pb-5">
                    <Calendar
                      className="w-full capitalize"
                      mode="single"
                      selected={selectedDay}
                      onSelect={handleDateSelect}
                      locale={ptBR}
                      disabled={{ before: new Date() }}
                    />
                  </div>

                  {selectedDay && (
                    <div className="flex gap-3 overflow-x-auto border-b border-solid px-5 pb-5 [&::-webkit-scrollbar]:hidden">
                      {getTimeList({
                        bookings: dayBookings,
                        selectedDay,
                      }).map((time) => (
                        <Button
                          key={time}
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                          className="rounded-full"
                          onClick={() => handleTimeSelect(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  {selectedTime && selectedDay && (
                    <div className="p-5">
                      <Card>
                        <CardContent className="space-y-3 p-3">
                          <div className="flex items-center justify-between">
                            <h2 className="font-bold">{service.name}</h2>
                            <p className="text-sm font-bold">
                              {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(Number(service.price))}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Data</h2>
                            <p className="text-sm">
                              {format(selectedDay, "d 'de' MMMM", {
                                locale: ptBR,
                              })}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Horário</h2>
                            <p className="text-sm">{selectedTime}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <h2 className="text-sm text-gray-400">Barbearia</h2>
                            <p className="text-sm">{barbershop.name}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  <SheetFooter className="mt-5 px-5">
                    <SheetClose asChild>
                      <Button
                        onClick={handleCreateBooking}
                        disabled={!selectedTime || !selectedDay}
                      >
                        Confirmar agendamento
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={signInDialogIsOpen} onOpenChange={setSignInDialogIsOpen}>
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceItem;
