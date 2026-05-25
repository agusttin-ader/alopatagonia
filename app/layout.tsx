import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";

import { MotionProvider } from "@/components/motion/motion-provider";
import { NoZoomLock } from "@/components/mobile/no-zoom-lock";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { SiteIntro } from "@/components/motion/site-intro";
import { GlobalNav } from "@/components/navigation/GlobalNav";
import { EXPERIENCE_IMAGE, SITE } from "@/lib/constants";
import {
  buildNextImageUrl,
  IMAGE_PRELOAD_WIDTH,
  IMAGE_QUALITY,
} from "@/lib/image-config";
import {
  HERO_POSTER,
  SITE_INTRO_BOOT_SCRIPT,
  SITE_INTRO_IMAGE,
} from "@/lib/site-intro-config";
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

  const signaturePrefetch = buildNextImageUrl(EXPERIENCE_IMAGE.src, {
    width: IMAGE_PRELOAD_WIDTH.prefetchSection,
    quality: IMAGE_QUALITY,
  });

  return (
    <html
      lang="es"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <link rel="preload" href={SITE_INTRO_IMAGE} as="image" fetchPriority="high" />
        <link rel="preload" href={HERO_POSTER} as="image" />
        <link rel="prefetch" href={signaturePrefetch} as="image" />
        <style
          dangerouslySetInnerHTML={{
            __html: `#site-intro-placeholder{background-image:url("${SITE_INTRO_IMAGE}");background-size:cover;background-position:center;background-repeat:no-repeat}body.site-intro-pending #site-intro-placeholder{display:block}`,
          }}
        />
        <Script
          id="alo-site-intro-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: SITE_INTRO_BOOT_SCRIPT }}
        />
      </head>
      <body suppressHydrationWarning className="flex min-h-dvh flex-col">
        <div
          id="site-intro-placeholder"
          suppressHydrationWarning
          className="pointer-events-none fixed inset-0 z-[2199]"
          aria-hidden
        />
        <Script
          id="alo-organization-jsonld"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <MotionProvider>
          <NoZoomLock />
          <ScrollProgress />
          <SiteIntro />
          <div id="site-app-shell" className="flex min-h-dvh flex-1 flex-col">
            <GlobalNav />
            {children}
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
