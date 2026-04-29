import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fixr — Book trusted home services instantly",
  description: "Describe your issue, get an instant AI price, and dispatch a verified contractor fast.",
  keywords: "home services, plumbing, electrical, handyman, instant pricing",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossOrigin="" />

      </head>
      <body className={`${inter.className} bg-white text-slate-950 antialiased`}>

        <Navbar />
        {children}
      </body>
    </html>
  );
}
