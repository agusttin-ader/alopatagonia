import { Analytics } from "@vercel/analytics/next";
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
import {
  SITE_INTRO_IMAGE,
  SITE_INTRO_LOGO,
  SITE_INTRO_OVERLAY_CSS,
} from "@/lib/site-intro-config";

const siteUrl = getSiteUrl();

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
    <>
      <div
        id="site-intro-placeholder"
        suppressHydrationWarning
        className="pointer-events-none fixed inset-0 z-[2199] flex items-center justify-center"
        style={{
          backgroundColor: "#1a2f26",
          backgroundImage: `url(${SITE_INTRO_IMAGE})`,
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
    </>
  );
}
