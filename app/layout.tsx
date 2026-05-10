import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

import { MotionProvider } from "@/components/motion/motion-provider";
import { SiteIntro } from "@/components/motion/site-intro";
import { GlobalNav } from "@/components/navigation/GlobalNav";
import { SITE } from "@/lib/constants";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://alopatagonia.com";
const metadataBase = new URL(siteUrl);
const ogImage = "/videos/hero-poster.jpg";

const inter = Inter({
  variable: "--font-sans-modern",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  adjustFontFallback: true,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display-modern",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  themeColor: "#717336",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Alo Patagonia | Viajes y experiencias en la Patagonia",
    template: "%s | Alo Patagonia",
  },
  description:
    "Alojamientos, movilidad, excursiones y asesoramiento integral para viajar la Patagonia con un solo equipo.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: SITE.name,
    title: "Alo Patagonia | Viajes y experiencias en la Patagonia",
    description:
      "Coordinamos tu viaje en la Patagonia: destinos icónicos, movilidad y excursiones con un solo contacto.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Paisajes de Patagonia con propuesta de viaje de Alo Patagonia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alo Patagonia | Viajes y experiencias en la Patagonia",
    description:
      "Coordinamos tu viaje en la Patagonia: destinos icónicos, movilidad y excursiones con un solo contacto.",
    images: [ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE.name,
    url: metadataBase.toString(),
    email: SITE.email,
    sameAs: [SITE.instagram],
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Carlos de Bariloche",
      addressRegion: "Rio Negro",
      addressCountry: "AR",
    },
  };

  return (
    <html
      lang="es"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <MotionProvider>
          <SiteIntro />
          <GlobalNav />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
