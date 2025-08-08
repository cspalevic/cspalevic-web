import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { detectTheme } from "@/lib/theme/detection";
import { Theme } from "@/types/theme";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Noto_Sans } from "next/font/google";
import React from "react";

export const metadata: Metadata = {
  title: "Charlie Spalevic",
  description: "Charlie Spalevic's personal website",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const NotoSans = Noto_Sans({
  subsets: ["latin"],
  weight: "500",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = await detectTheme();
  const rootClasses = [NotoSans.className];
  if (theme === Theme.Dark) {
    rootClasses.push("dark");
  }
  return (
    <html lang="en" className={`h-full ${rootClasses.join(" ")}`}>
      <body className="flex justify-center h-full text-gray-800 dark:text-gray-50 bg-neutral-50 dark:bg-neutral-900">
        <div className="flex h-full flex-col px-5 md:w-[72rem]">
          <Header theme={theme} />
          <main className="flex flex-row justify-center flex-1 w-full pt-10 pb-10">
            <div className="w-full h-full">{children}</div>
          </main>
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
