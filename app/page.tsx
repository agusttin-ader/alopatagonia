import type { Metadata } from "next";

import { CTA } from "@/components/cta/CTA";
import { InstagramStats } from "@/components/community/instagram-stats";
import { Destinations } from "@/components/destinations/Destinations";
import { Experience } from "@/components/experience/Experience";
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
  title: "Viajes y experiencias en la Patagonia",
  description:
    "Organizamos tu viaje por Patagonia con alojamiento, movilidad y excursiones en un plan claro y personalizado.",
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
        <Experience />
        <WinterStoreSection />
        <UrgencyTrust />
        <CTA />
      </main>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
