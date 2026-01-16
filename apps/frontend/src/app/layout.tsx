import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import { ThemeProvider } from "next-themes";
import QueryClientContextProvider from "@/providers/react-query.provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Toaster as ShadcnUiToaster } from "@/components/ui/toaster";

import "./globals.css";
import { UserAuthProvider } from "@/providers/auth.provider";
import Header from "./_layouts/auth-header";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const cairoSans = Cairo({
  variable: "--font-cairo-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Medbook",
  description:
    "MedBook is booking project that enables patients to search on available doctors and make an appointment for them",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cairoSans.variable}`}>
        <UserAuthProvider>
          <ThemeProvider>
            <QueryClientContextProvider>
              <SonnerToaster
                toastOptions={{}}
                expand={false}
                closeButton
                richColors
                visibleToasts={4}
                duration={8000}
              />
              <ShadcnUiToaster />
              <NuqsAdapter>{children}</NuqsAdapter>
            </QueryClientContextProvider>
          </ThemeProvider>
        </UserAuthProvider>
      </body>
    </html>
  );
}
