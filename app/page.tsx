import type { Metadata } from "next";

import { CTA } from "@/components/cta/CTA";
import { InstagramStats } from "@/components/community/instagram-stats";
import { Destinations } from "@/components/destinations/Destinations";
import { Footer } from "@/components/footer/Footer";
import { Hero } from "@/components/hero/Hero";
import { HowItWorks } from "@/components/how-it-works/HowItWorks";
import { TripPlannerSection } from "@/components/planner/TripPlannerSection";
import { Services } from "@/components/services/Services";
import { SignatureSection } from "@/components/signature/SignatureSection";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { UrgencyTrust } from "@/components/urgency/UrgencyTrust";
import { WinterStoreSection } from "@/components/winter-store/WinterStoreSection";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";

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
        <TripPlannerSection />
        <Testimonials />
        <HowItWorks />
        <Services />
        <Destinations />
        <InstagramStats />
        <WinterStoreSection />
        <UrgencyTrust />
        <CTA />
      </main>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
