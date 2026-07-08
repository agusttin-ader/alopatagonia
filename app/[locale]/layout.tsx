import { Analytics } from "@vercel/analytics/next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { HomeIntroGate } from "@/components/motion/home-intro-gate";
import { LocaleTransitionProvider } from "@/components/i18n/LocaleTransitionProvider";
import { MotionProvider } from "@/components/motion/motion-provider";
import { NoZoomLock } from "@/components/mobile/no-zoom-lock";
import { ScrollProgressGate } from "@/components/motion/scroll-progress-gate";
import { GlobalNav } from "@/components/navigation/GlobalNav";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { routing, type AppLocale } from "@/i18n/routing";
import { buildSiteGraphJsonLd } from "@/lib/json-ld";
import { getSiteUrl } from "@/lib/site-url";
import { SITE } from "@/lib/site";
import {
  SITE_INTRO_CRITICAL_CSS,
  SITE_INTRO_LOGO,
} from "@/lib/site-intro-config";

const siteUrl = getSiteUrl();

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

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as AppLocale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const siteGraphJsonLd = buildSiteGraphJsonLd(siteUrl, locale as AppLocale);

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
        <div
          id="site-intro-placeholder"
          suppressHydrationWarning
          className="pointer-events-none fixed inset-0 z-[2199] flex items-center justify-center bg-[#1a2f26]"
          aria-hidden
        >
          <div className="site-intro-placeholder-brand relative z-[1]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SITE_INTRO_LOGO} alt="" decoding="sync" fetchPriority="high" />
          </div>
        </div>
        <JsonLdScript id="alo-site-graph-jsonld" data={siteGraphJsonLd} />
        <GoogleAnalytics />
        <Analytics />
        <NextIntlClientProvider messages={messages}>
          <MotionProvider>
            <NoZoomLock />
            <ScrollProgressGate />
            <HomeIntroGate />
            <div
              id="site-app-shell"
              className="relative flex min-h-dvh w-full min-w-0 max-w-full flex-1 flex-col overflow-x-clip overscroll-x-none"
            >
              <LocaleTransitionProvider>
                <GlobalNav />
                {children}
              </LocaleTransitionProvider>
            </div>
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
