import SessionProviderClientComponent from "./sessionprovider";
import type { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { getServerSession } from "next-auth/next";

const kumbh = Kumbh_Sans({
  subsets: ["latin"],
  variable: "--font-kumbh-sans",
});

export const metadata: Metadata = {
  title: "SimYou",
  description: "Your digital doppelgänger",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={`${kumbh.variable} antialiased`}>
        <SessionProviderClientComponent session={session}>
          <main>
            <Navbar />
            {children}
          </main>
        </SessionProviderClientComponent>
      </body>
    </html>
  );
}
