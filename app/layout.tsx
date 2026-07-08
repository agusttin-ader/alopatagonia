import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { getLocale } from "next-intl/server";

import { getGoogleSiteVerification } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";
import { SITE } from "@/lib/site";
import {
  SITE_INTRO_CRITICAL_CSS,
  SITE_INTRO_LOGO,
} from "@/lib/site-intro-config";

import "./globals.css";

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

const siteUrl = getSiteUrl();
const metadataBase = new URL(siteUrl);
const googleSiteVerification = getGoogleSiteVerification();

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
    default: "Alo Patagonia | Viajes por la Patagonia",
    template: "Alo Patagonia | %s",
  },
  description:
    "Viajes a la Patagonia con auto, alojamiento y excursiones. Bariloche, Calafate, Ushuaia, Madryn y más. Escribinos por WhatsApp.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: SITE.name,
    title: "Alo Patagonia | Viajes por la Patagonia",
    description:
      "Viajes a la Patagonia con auto, alojamiento y excursiones. Bariloche, Calafate, Ushuaia, Madryn y más. Escribinos por WhatsApp.",
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
    title: "Alo Patagonia | Viajes por la Patagonia",
    description:
      "Viajes a la Patagonia con auto, alojamiento y excursiones. Bariloche, Calafate, Ushuaia, Madryn y más. Escribinos por WhatsApp.",
    images: [SITE.ogImage],
  },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
        sizes: "48x48",
      },
      {
        url: SITE.faviconBrand96,
        type: "image/png",
        sizes: "96x96",
      },
      {
        url: SITE.faviconLight96,
        type: "image/png",
        sizes: "96x96",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: SITE.faviconDark96,
        type: "image/png",
        sizes: "96x96",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <style
          id="alo-site-intro-critical"
          dangerouslySetInnerHTML={{ __html: SITE_INTRO_CRITICAL_CSS }}
        />
        <link rel="preload" href={SITE_INTRO_LOGO} as="image" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="48x48" />
        <link rel="icon" href={SITE.faviconBrand96} type="image/png" sizes="96x96" />
        <link
          rel="icon"
          href={SITE.faviconLight96}
          type="image/png"
          sizes="96x96"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href={SITE.faviconDark96}
          type="image/png"
          sizes="96x96"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
      </head>
      <body
        suppressHydrationWarning
        className="flex min-h-dvh w-full max-w-full flex-col overflow-x-clip overscroll-x-none"
      >
        {children}
      </body>
    </html>
  );
}
