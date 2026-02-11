"use client";

import { format, isFuture } from "date-fns";
import { Prisma } from "../generated/prisma";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ptBR } from "date-fns/locale";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import PhoneItem from "./phone-item";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { deleteBooking } from "../_actions/delete-booking";
import { toast } from "sonner";
import { useState } from "react";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: { barbershop: true };
      };
    };
  }>;
}

// TODO: Receive as props
const BookingItem = ({ booking }: BookingItemProps) => {
  const [isSheetsOpen, setIsSheetsOpen] = useState(false);
  const {
    service: { barbershop },
  } = booking;
  const isConfirmed = isFuture(booking.date);

  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id);

      setIsSheetsOpen(false);
      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      toast.success("Erro ao cancelar reserva. Tente novamente mais tarde.");
      console.error("Erro ao cancelar reserva:", error);
    }
  };

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetsOpen(isOpen);
  };
  return (
    <Sheet open={isSheetsOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            {/* left */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge
                className="w-fit rounded-2xl"
                variant={isConfirmed ? "default" : "outline"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>

              <h3 className="font-semibold">{booking.service.name}</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.service.barbershop.imageUrl} />
                </Avatar>
                <p className="text-xs">{booking.service.barbershop.name}</p>
              </div>
            </div>

            {/* right */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {" "}
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm">
                {" "}
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[90%] p-5">
        <SheetHeader>
          <SheetTitle className="text-left">Informações da reserva</SheetTitle>
        </SheetHeader>

        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <Image
            src="/map.png"
            alt={`Mapa da barbearia ${booking.service.barbershop.name}`}
            fill
            className="rounded-t-xl object-cover"
          />

          <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
            <CardContent className="flex items-center gap-5 px-5 py-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>
              <div>
                <h3 className="font-bold">{barbershop.name}</h3>
                <p className="text-xs text-gray-400">{barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Badge
            className="w-fit rounded-2xl"
            variant={isConfirmed ? "default" : "outline"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
          <Card className="mt-3 mb-6">
            <CardContent className="space-y-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <p className="text-sm font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Data</h2>
                <p className="text-sm">
                  {format(booking.date, "d 'de' MMMM", {
                    locale: ptBR,
                  })}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Horário</h2>
                <p className="text-sm">
                  {format(booking.date, "HH:mm", {
                    locale: ptBR,
                  })}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Barbearia</h2>
                <p className="text-sm">{barbershop.name}</p>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-3">
            {barbershop.phone.map((phone) => (
              <PhoneItem key={phone} phone={phone} />
            ))}
          </div>
        </div>
        <SheetFooter className="mt-6">
          <div className="flex items-center gap-3">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Voltar
              </Button>
            </SheetClose>

            {isConfirmed && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-red-800" variant="destructive">
                    Cancelar Reserva
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90%]">
                  <DialogHeader>
                    <DialogTitle>Cancelar reserva?</DialogTitle>
                    <DialogDescription>
                      Essa ação não poderá ser desfeita. A reserva será
                      cancelada permanentemente.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-4 flex flex-col justify-end gap-3">
                    <DialogClose asChild>
                      <Button
                        className="bg-red-800"
                        variant="destructive"
                        onClick={handleCancelBooking}
                      >
                        Confirmar cancelamento
                      </Button>
                    </DialogClose>

                    <DialogClose asChild>
                      <Button variant="outline">Voltar</Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
