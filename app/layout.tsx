import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Noto_Sans } from "next/font/google";
import React from "react";
import "./globals.css";
import { Header } from "@/components/header";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`h-full dark ${NotoSans.className}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <div className="py-6">{children}</div>
          </main>
        </div>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
