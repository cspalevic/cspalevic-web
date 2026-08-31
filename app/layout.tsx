import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Noto_Sans } from "next/font/google";
import React from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://cspalevic.com"),
  title: "Charlie Spalevic",
  description: "Charlie Spalevic's personal website",
  openGraph: {
    type: "website",
    siteName: "Charlie Spalevic",
    title: "Charlie Spalevic",
    description: "Charlie Spalevic's personal website",
    url: "/",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Charlie Spalevic",
    description: "Charlie Spalevic's personal website",
  },
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
        <Header />
        <main className="max-w-2xl mx-auto flex-1">
          <div className="p-6 pb-18">{children}</div>
        </main>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
