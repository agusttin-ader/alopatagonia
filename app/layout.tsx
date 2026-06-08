import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { HomeIntroGate } from "@/components/motion/home-intro-gate";
import { MotionProvider } from "@/components/motion/motion-provider";
import { NoZoomLock } from "@/components/mobile/no-zoom-lock";
import { ScrollProgressGate } from "@/components/motion/scroll-progress-gate";
import { GlobalNav } from "@/components/navigation/GlobalNav";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { buildSiteGraphJsonLd } from "@/lib/json-ld";
import { getGoogleSiteVerification } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import { SITE } from "@/lib/site";
import {
  SITE_INTRO_CRITICAL_CSS,
  SITE_INTRO_IMAGE_PRELOAD,
  SITE_INTRO_LOGO,
  SITE_INTRO_OVERLAY_CSS,
} from "@/lib/site-intro-config";
import "./globals.css";

const siteUrl = getSiteUrl();
const metadataBase = new URL(siteUrl);
const googleSiteVerification = getGoogleSiteVerification();

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
    default: "Alo Patagonia | Organizá tu viaje",
    template: "Alo Patagonia | %s",
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
    title: "Alo Patagonia | Organizá tu viaje",
    description:
      "Auto, alojamiento y excursiones en un solo plan. Coordinamos tu viaje por la Patagonia Argentina.",
    images: [
      {
        url: SITE.ogImage,
        width: SITE.ogImageWidth,
        height: SITE.ogImageHeight,
        alt: SITE.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: `@${SITE.instagramHandle}`,
    creator: `@${SITE.instagramHandle}`,
    title: "Alo Patagonia | Organizá tu viaje",
    description:
      "Auto, alojamiento y excursiones en un solo plan. Coordinamos tu viaje por la Patagonia Argentina.",
    images: [SITE.ogImage],
  },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon-96.png", type: "image/png", sizes: "96x96" },
      {
        url: "/images/logo/logo-alo-favicon-light.png",
        type: "image/png",
        sizes: "96x96",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/images/logo/logo-alo-favicon-dark.png",
        type: "image/png",
        sizes: "96x96",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    shortcut: "/favicon.png",
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteGraphJsonLd = buildSiteGraphJsonLd(siteUrl);

  return (
    <html
      lang="es"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <style
          id="alo-site-intro-critical"
          dangerouslySetInnerHTML={{ __html: SITE_INTRO_CRITICAL_CSS }}
        />
        <link rel="preload" href={SITE_INTRO_IMAGE_PRELOAD} as="image" fetchPriority="high" />
        <link rel="preload" href={SITE_INTRO_LOGO} as="image" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="48x48" />
        <link rel="icon" href="/favicon-96.png" type="image/png" sizes="96x96" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      </head>
      <body suppressHydrationWarning className="flex min-h-dvh flex-col">
        <div
          id="site-intro-placeholder"
          suppressHydrationWarning
          className="pointer-events-none fixed inset-0 z-[2199] flex items-center justify-center"
          style={{
            backgroundColor: "#1a2f26",
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
        <JsonLdScript id="alo-site-graph-jsonld" data={siteGraphJsonLd} />
        <GoogleAnalytics />
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
