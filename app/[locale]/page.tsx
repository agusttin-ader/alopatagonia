import type { Metadata } from "next";
import { getLocale, setRequestLocale } from "next-intl/server";

import { HomeCriticalMediaPreload } from "@/components/home/HomeCriticalMediaPreload";
import { LazyInView } from "@/components/media/LazyInView";
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
import { sectionDeferClass } from "@/lib/section-defer";
import { cn } from "@/lib/utils";

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
      <HomeCriticalMediaPreload />
      <PlannerLegacyHashRedirect />
      <HomeSectionHashScroll />
      <Hero />
      <HomeTrustBar />
      <main className="min-w-0 flex-1 overflow-x-clip pb-20 sm:pb-0">
        <div className={sectionDeferClass("heroAdjacent")}>
          <AboutUsSection />
        </div>
        <div className={sectionDeferClass("default")}>
          <SignatureSection />
        </div>
        <div className={sectionDeferClass("default")}>
          <HowItWorks />
        </div>
        <div className={sectionDeferClass("tall")}>
          <HomeDestinations />
        </div>
        <LazyInView
          className={cn(sectionDeferClass("tall"), "min-h-[min(72vh,520px)]")}
          placeholderClassName="bg-background"
        >
          <HomeGallerySection />
        </LazyInView>
        <div className={sectionDeferClass("compact")}>
          <HomeDestinationsReinforcement />
        </div>
        <div className={sectionDeferClass("default")}>
          <CatalogHubSection />
        </div>
        <div className={sectionDeferClass("default")}>
          <WinterStorePromoSection />
        </div>
        <LazyInView className={sectionDeferClass("tall")} placeholderClassName="bg-background">
          <EscapadasExpressSection />
        </LazyInView>
        <div className={sectionDeferClass("default")}>
          <Testimonials />
        </div>
        <LazyInView className={sectionDeferClass("default")} placeholderClassName="bg-background">
          <InstagramStats />
        </LazyInView>
        <div className={sectionDeferClass("compact")}>
          <CTA />
        </div>
      </main>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
