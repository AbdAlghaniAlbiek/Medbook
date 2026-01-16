"use client";

import React from "react";
import BookingIcon from "@/assets/images/booking.png";
import Image from "next/image";
import StackPanel from "@/components/ui/stack-panel";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { IUserAuth } from "@/helpers/security/auth/user.auth";
import { LocalStorageKeys } from "@/helpers/constants/local-storage.constant";
import { useUserAuth } from "@/providers/auth.provider";

function Header() {
  const router = useRouter();
  const [_, setLocalAuth] = useLocalStorage<IUserAuth | undefined>(
    LocalStorageKeys.UserAuth
  );
  const { setUserAuth } = useUserAuth();

  return (
    <header className="flex justify-start px-4 py-4 shadow-md rounded-br-xl rounded-bl-xl">
      <StackPanel direction="horizontal" gap="gap-4" alignItems="items-center">
        <Image src={BookingIcon} alt="booking_icon" width={30} height={30} />
        <h1 className="text-xl">
          <b>MedBook</b>
        </h1>
      </StackPanel>

      <Button
        className="self-end"
        variant={"outline"}
        onClick={() => {
          setLocalAuth(undefined);
          setUserAuth({});
          router.push("/auth/login");
        }}
      >
        Logout
      </Button>
    </header>
  );
}

export default Header;
