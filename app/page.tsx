import { CTA } from "@/components/cta/CTA";
import { InstagramStats } from "@/components/community/instagram-stats";
import { Destinations } from "@/components/destinations/Destinations";
import { Experience } from "@/components/experience/Experience";
import { Footer } from "@/components/footer/Footer";
import { Gallery } from "@/components/gallery/Gallery";
import { Hero } from "@/components/hero/Hero";
import { Services } from "@/components/services/Services";
import { Testimonials } from "@/components/testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <main className="min-w-0 flex-1">
        <Services />
        <InstagramStats />
        <Destinations />
        <Experience />
        <Gallery />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
