import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { CTA } from "@/components/cta/CTA";
import { HomeDestinations } from "@/components/destinations/HomeDestinations";
import { Footer } from "@/components/footer/Footer";
import { Hero } from "@/components/hero/Hero";
import { HowItWorks } from "@/components/how-it-works/HowItWorks";
import { SignatureSection } from "@/components/signature/SignatureSection";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";

const TripPlannerSection = dynamic(
  () =>
    import("@/components/planner/TripPlannerSection").then((mod) => mod.TripPlannerSection),
  { loading: () => <div className="min-h-[480px]" aria-hidden /> },
);

const InstagramStats = dynamic(
  () => import("@/components/community/instagram-stats").then((mod) => mod.InstagramStats),
  { loading: () => <div className="min-h-[320px]" aria-hidden /> },
);

export const metadata: Metadata = {
  title: "Organizá tu viaje a Patagonia",
  description:
    "Auto, alojamiento y excursiones en un solo plan. Coordinamos tu viaje por la Patagonia Argentina.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <main className="min-w-0 flex-1">
        <SignatureSection />
        <HomeDestinations />
        <TripPlannerSection />
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
