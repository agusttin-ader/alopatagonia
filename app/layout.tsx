import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  themeColor: "#2f5d50",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Alo Patagonia | Viajes y experiencias en la Patagonia",
  description:
    "Alojamientos, autos y transfers, excursiones y asesoramiento para Bariloche, El Calafate, Ushuaia y más. Demo de sitio.",
  openGraph: {
    title: "Alo Patagonia",
    description:
      "Coordinamos tu viaje en la Patagonia: destinos icónicos, movilidad y excursiones con un solo contacto.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${dmSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
