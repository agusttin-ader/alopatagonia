import type { Metadata } from "next";
import { getLocale, setRequestLocale } from "next-intl/server";

import { AboutUsSection } from "@/components/about/AboutUsSection";
import { EscapadasExpressSection } from "@/components/about/EscapadasExpressSection";
import { CTA } from "@/components/cta/CTA";
import { CatalogHubSection } from "@/components/catalog-hub/CatalogHubSection";
import { HomeDestinations } from "@/components/destinations/HomeDestinations";
import { HomeDestinationsReinforcement } from "@/components/destinations/HomeDestinationsReinforcement";
import { HomeTrustBar } from "@/components/trust/HomeTrustBar";
import { Footer } from "@/components/footer/Footer";
import { HomeGallerySection } from "@/components/gallery/HomeGallerySection";
import { Hero } from "@/components/hero/Hero";
import { HowItWorks } from "@/components/how-it-works/HowItWorks";
import { HomeSectionHashScroll } from "@/components/home/HomeSectionHashScroll";
import { PlannerLegacyHashRedirect } from "@/components/planner/PlannerLegacyHashRedirect";
import { SignatureSection } from "@/components/signature/SignatureSection";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { WinterStorePromoSection } from "@/components/winter-store/WinterStorePromoSection";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import { InstagramStats } from "@/components/community/instagram-stats";
import type { AppLocale } from "@/i18n/routing";
import { buildHubPageMetadata } from "@/lib/i18n/localized-seo-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as AppLocale;
  return buildHubPageMetadata(locale, "home");
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <PlannerLegacyHashRedirect />
      <HomeSectionHashScroll />
      <Hero />
      <HomeTrustBar />
      <main className="min-w-0 flex-1 overflow-x-clip pb-20 sm:pb-0">
        <SignatureSection />
        <HowItWorks />
        <HomeDestinations />
        <HomeGallerySection />
        <HomeDestinationsReinforcement />
        <CatalogHubSection />
        <WinterStorePromoSection />
        <EscapadasExpressSection />
        <Testimonials />
        <InstagramStats />
        <AboutUsSection />
        <CTA />
      </main>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
