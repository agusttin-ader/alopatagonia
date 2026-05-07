import { CTA } from "@/components/cta/CTA";
import { InstagramStats } from "@/components/community/instagram-stats";
import { Destinations } from "@/components/destinations/Destinations";
import { Experience } from "@/components/experience/Experience";
import { Footer } from "@/components/footer/Footer";
import { ContextGallery } from "@/components/gallery/ContextGallery";
import { Hero } from "@/components/hero/Hero";
import { HowItWorks } from "@/components/how-it-works/HowItWorks";
import { TripPlannerSection } from "@/components/planner/TripPlannerSection";
import { Services } from "@/components/services/Services";
import { SignatureSection } from "@/components/signature/SignatureSection";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { UrgencyTrust } from "@/components/urgency/UrgencyTrust";
import { WinterStoreSection } from "@/components/winter-store/WinterStoreSection";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";

export default function Home() {
  return (
    <>
      <Hero />
      <main className="min-w-0 flex-1">
        <SignatureSection />
        <TripPlannerSection />
        <ContextGallery />
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
