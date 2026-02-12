import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/utils/hooks/useCart";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JM99 | Computer Requirements",
  description:
    "Venta y reparacion de computadoras. Te garantizamos productos de calidad y compatibilidad para que puedas trabaja y jugar sin problemas con tus dispositivos de cualquier marca.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased leading-normal tracking-normal text-indigo-400 my-4  md:my-6 !bg-gradient-to-br from-gray-100 to-[#350D70]`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
