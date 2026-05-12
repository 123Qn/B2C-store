// import "@repo/ui/styles.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

import { CartProvider } from "@/components/Cart/CartContext";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Quan Store",
  description: "Modern Fashion Ecommerce Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">

      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
        `}
      >

        <CartProvider>
          {children}
        </CartProvider>

      </body>

    </html>
  );
}