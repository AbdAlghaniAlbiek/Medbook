"use client";

import React from "react";
import BookingIcon from "@/assets/images/booking.png";
import Image from "next/image";
import StackPanel from "@/components/ui/stack-panel";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function AuthHeader() {
  const router = useRouter();

  return (
    <header className="flex justify-start px-4 py-4 shadow-md rounded-br-xl rounded-bl-xl ">
      <StackPanel direction="horizontal" gap="gap-4" alignItems="items-center">
        <Image src={BookingIcon} alt="booking_icon" width={30} height={30} />
        <h1 className="text-xl">
          <b>MedBook</b>
        </h1>
      </StackPanel>

      <StackPanel
        direction="horizontal"
        gap="gap-2"
        alignItems="items-center"
        justifyContent="justify-end"
      >
        <Button onClick={() => router.push("/auth/register")}>Register</Button>
        <Button variant={"outline"} onClick={() => router.push("/auth/login")}>
          Login
        </Button>
      </StackPanel>
    </header>
  );
}

export default AuthHeader;
