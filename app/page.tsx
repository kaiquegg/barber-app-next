import { SearchIcon } from "lucide-react";
import Header from "./components/header";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import Image from "next/image";
import { db } from "./lib/prisma";
import BarbershopItem from "./components/barbershop-item";
import quickSearchOptions from "./constants/search";
import BookingItem from "./components/booking-item";

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
          {quickSearchOptions.map((option) => (
            <Button className="gap-1" variant="secondary" key={option.title}>
              <Image
                alt={option.title}
                src={option.imageURL}
                width={16}
                height={16}
              />
              {option.title}
            </Button>
          ))}
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

        <BookingItem />

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
    </div>
  );
};

export default Home;
