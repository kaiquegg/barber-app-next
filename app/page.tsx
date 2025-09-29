import { SearchIcon } from "lucide-react";
import Header from "./components/header";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import Image from "next/image";
import { Card, CardContent } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Avatar, AvatarImage } from "./components/ui/avatar";
import { db } from "./lib/prisma";
import BarbershopItem from "./components/barbershop-item";

const Home = async () => {
  const barbershops = await db.barberShop.findMany({});
  const popularBarbershops = await db.barberShop.findMany({
    orderBy: {
      name: "desc",
    },
  });
  return (
    <div>
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Usuário(a)!</h2>
        <p>Quarta-feira, 27 de agosto.</p>
        {/* INPUT DE BUSCA */}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button variant="secondary">
            <SearchIcon />
          </Button>
        </div>

        {/* Busca Rapida */}

        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          <Button className="gap-1" variant="secondary">
            <Image alt="Cabelo" src="/cabelo.svg" width={16} height={16} />
            Cabelo
          </Button>
          <Button className="gap-1" variant="secondary">
            <Image alt="Barba" src="/barba.svg" width={16} height={16} />
            Barba
          </Button>
          <Button className="gap-1" variant="secondary">
            <Image
              alt="Acabamento"
              src="/Acabamento.svg"
              width={16}
              height={16}
            />
            Acabamento
          </Button>
          <Button className="gap-1" variant="secondary">
            <Image
              alt="Hidratação"
              src="/hidratacao.svg"
              width={16}
              height={16}
            />
            Hidratação
          </Button>
          <Button className="gap-1" variant="secondary">
            <Image
              alt="Sobrancelha"
              src="/sobrancelha.svg"
              width={16}
              height={16}
            />
            Sobrancelha
          </Button>
        </div>

        {/* Image */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* Appointment */}

        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Agendamentos
        </h2>

        <Card>
          <CardContent className="flex justify-between p-0">
            {/* left */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit rounded-2xl">Confirmado</Badge>

              <h3 className="font-semibold">Corte de Cabelo</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src=" https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p className="text-xs">Barbearia BH</p>
              </div>
            </div>

            {/* right */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">30</p>
              <p className="text-sm">20:00</p>
            </div>
          </CardContent>
        </Card>
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Populares
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/* FIM DIV P-5 */}
      </div>
      <footer>
        <Card>
          <CardContent className="px-5 py-6">
            <p className="text-xs text-gray-400">
              © 2023 Copyright <span className="font-bold">FSW Barber</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  );
};

export default Home;
