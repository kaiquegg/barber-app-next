"use client";

import { PhoneIcon } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface PhoneItemProps {
  phone: string;
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const hadleCopyPhoneClick = (phone: string) => {
    navigator.clipboard.writeText(phone);
    toast.success("Número copiado para a área de transferência!");
  };
  return (
    <div className="flex justify-between" key={phone}>
      {/* esquerda */}
      <div className="item-center flex gap-2">
        <PhoneIcon className="text-primary" size={18} />
        <p className="gap-2 text-sm">{phone}</p>
      </div>
      {/* right */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => hadleCopyPhoneClick(phone)}
      >
        Copiar
      </Button>
    </div>
  );
};

export default PhoneItem;
