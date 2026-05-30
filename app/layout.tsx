import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";

import { HomeIntroGate } from "@/components/motion/home-intro-gate";
import { MotionProvider } from "@/components/motion/motion-provider";
import { NoZoomLock } from "@/components/mobile/no-zoom-lock";
import { ScrollProgressGate } from "@/components/motion/scroll-progress-gate";
import { GlobalNav } from "@/components/navigation/GlobalNav";
import { SITE } from "@/lib/site";
import {
  SITE_INTRO_BOOT_SCRIPT,
  SITE_INTRO_IMAGE_PRELOAD,
  SITE_INTRO_LOGO,
  SITE_INTRO_OVERLAY_CSS,
} from "@/lib/site-intro-config";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://alopatagonia.com";
const metadataBase = new URL(siteUrl);
const ogImage = "/videos/hero-poster.jpg";

const inter = Inter({
  variable: "--font-sans-modern",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-display-modern",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

export const viewport: Viewport = {
  themeColor: "#717336",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Alo Patagonia | Organizá tu viaje a Patagonia",
    template: "%s | Alo Patagonia",
  },
  description:
    "Auto, alojamiento y excursiones en un solo plan. Coordinamos tu viaje por la Patagonia Argentina.",
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
    title: "Alo Patagonia | Organizá tu viaje a Patagonia",
    description:
      "Auto, alojamiento y excursiones en un solo plan. Coordinamos tu viaje por la Patagonia Argentina.",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Paisajes de Patagonia — Alo Patagonia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alo Patagonia | Organizá tu viaje a Patagonia",
    description:
      "Auto, alojamiento y excursiones en un solo plan. Coordinamos tu viaje por la Patagonia Argentina.",
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
      addressLocality: "Buenos Aires",
      addressRegion: "Ciudad Autónoma de Buenos Aires",
      addressCountry: "AR",
    },
  };

  return (
    <html
      lang="es"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" href={SITE_INTRO_IMAGE_PRELOAD} as="image" fetchPriority="high" />
        <link rel="preload" href={SITE_INTRO_LOGO} as="image" />
        <script
          id="alo-site-intro-boot"
          dangerouslySetInnerHTML={{ __html: SITE_INTRO_BOOT_SCRIPT }}
        />
      </head>
      <body suppressHydrationWarning className="flex min-h-dvh flex-col">
        <div
          id="site-intro-placeholder"
          suppressHydrationWarning
          className="pointer-events-none fixed inset-0 z-[2199] flex items-center justify-center"
          style={{
            backgroundColor: "#0a0f0d",
            backgroundImage: `url(${SITE_INTRO_IMAGE_PRELOAD})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{ background: SITE_INTRO_OVERLAY_CSS }}
            aria-hidden
          />
          <div className="site-intro-placeholder-brand relative z-[1]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SITE_INTRO_LOGO} alt="" decoding="sync" fetchPriority="high" />
          </div>
        </div>
        <Script
          id="alo-organization-jsonld"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <MotionProvider>
          <NoZoomLock />
          <ScrollProgressGate />
          <HomeIntroGate />
          <div id="site-app-shell" className="flex min-h-dvh flex-1 flex-col">
            <GlobalNav />
            {children}
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
