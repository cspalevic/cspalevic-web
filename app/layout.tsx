import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Analytics } from "@vercel/analytics/react";
import { Noto_Sans } from "next/font/google";
import React from "react";

export const metadata: Metadata = {
  title: "Charlie Spalevic",
  viewport: "width=device-width,initial-scale=1",
  description: "Charlie Spalevic's personal website",
};

const NotoSans = Noto_Sans({
  subsets: ["latin"],
  weight: "500",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${NotoSans.className} h-full dark`}>
      <body className="flex h-full justify-center text-gray-800 dark:text-gray-50 bg-neutral-50 dark:bg-neutral-900">
        <div className="flex h-full flex-col px-5 md:w-[72rem]">
          <Header />
          <main className="flex w-full flex-1 flex-row justify-center pt-10 pb-10">
            <div className="h-full w-full">{children}</div>
          </main>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
