import dynamic from "next/dynamic";

import { CTA } from "@/components/cta/CTA";
import { CatalogHubSection } from "@/components/catalog-hub/CatalogHubSection";
import { HomeDestinations } from "@/components/destinations/HomeDestinations";
import { Footer } from "@/components/footer/Footer";
import { HomeGallerySection } from "@/components/gallery/HomeGallerySection";
import { Hero } from "@/components/hero/Hero";
import { HowItWorks } from "@/components/how-it-works/HowItWorks";
import { PlannerLegacyHashRedirect } from "@/components/planner/PlannerLegacyHashRedirect";
import { TripPlannerTeaser } from "@/components/planner/TripPlannerTeaser";
import { SignatureSection } from "@/components/signature/SignatureSection";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { WinterStorePromoSection } from "@/components/winter-store/WinterStorePromoSection";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_SEO } from "@/lib/seo-destinations";

const InstagramStats = dynamic(
  () => import("@/components/community/instagram-stats").then((mod) => mod.InstagramStats),
  { loading: () => <div className="min-h-[320px]" aria-hidden /> },
);

export const metadata = buildPageMetadata({
  title: SITE_SEO.home.title,
  description: SITE_SEO.home.description,
  path: "/",
  keywords: [...SITE_SEO.home.keywords],
  titleOrder: "keyword-first",
});

export default function Home() {
  return (
    <>
      <PlannerLegacyHashRedirect />
      <Hero />
      <main className="min-w-0 flex-1 pb-20 sm:pb-0">
        <SignatureSection />
        <HomeGallerySection />
        <CatalogHubSection />
        <HomeDestinations />
        <WinterStorePromoSection />
        <TripPlannerTeaser />
        <Testimonials />
        <InstagramStats />
        <HowItWorks />
        <CTA />
      </main>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
