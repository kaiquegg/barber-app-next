"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

import Image from "next/image";

const SignInDialog = () => {
  const handleLoginWithGoogleClick = () => signIn("google");

  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça seu login na plataforma</DialogTitle>
        <DialogDescription>
          Conecte-se utilizando uma conta Google.
        </DialogDescription>
      </DialogHeader>
      <Button
        className="gap-1"
        variant={"outline"}
        onClick={handleLoginWithGoogleClick}
      >
        <Image
          alt="Fazer login com o Google"
          src={"./google.svg"}
          width={18}
          height={18}
        />
        Continuar com Google
      </Button>
    </>
  );
};

export default SignInDialog;
