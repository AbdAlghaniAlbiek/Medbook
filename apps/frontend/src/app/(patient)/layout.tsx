"use client";

import StackPanel from "@/components/ui/stack-panel";
import AuthHeader from "../_layouts/auth-header";
import PageContent from "@/components/content/content";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { IUserAuth } from "@/helpers/security/auth/user.auth";
import { LocalStorageKeys } from "@/helpers/constants/local-storage.constant";
import { redirect, useRouter } from "next/navigation";
import Header from "../_layouts/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [auth, _] = useLocalStorage<IUserAuth>(LocalStorageKeys.UserAuth);
  // const router = useRouter();

  if (!auth || !auth.token || auth.role !== "Patient") {
    redirect("/auth/login");
  }

  return (
    <div>
      <Header />
      <PageContent>{children}</PageContent>
    </div>
  );
}
