import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  adjustFontFallback: true,
});

const manropeHeading = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  themeColor: "#717336",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Alo Patagonia | Viajes y experiencias en la Patagonia",
  description:
    "Alojamientos, movilidad, excursiones y asesoramiento integral para viajar la Patagonia con un solo equipo.",
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
      className={`${manrope.variable} ${manropeHeading.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
