import Link from "next/link";

import { DestinationsIndex } from "@/components/catalog/DestinationsIndex";
import { FaqSection } from "@/components/seo/FaqSection";
import { Footer } from "@/components/footer/Footer";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { getAllDestinations } from "@/lib/catalog/destinations";
import { buildDestinosHubGraphJsonLd } from "@/lib/json-ld";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_FAQ, SITE_SEO } from "@/lib/seo-destinations";
import { getSiteUrl } from "@/lib/site-url";

export const metadata = buildPageMetadata({
  title: SITE_SEO.destinos.title,
  description: SITE_SEO.destinos.description,
  path: "/destinos",
  keywords: [...SITE_SEO.destinos.keywords],
  titleOrder: "keyword-first",
});

const destinations = getAllDestinations();
const destinosGraphJsonLd = buildDestinosHubGraphJsonLd(getSiteUrl(), destinations, SITE_FAQ);

export default function DestinosPage() {
  return (
    <>
      <JsonLdScript id="alo-destinos-graph-jsonld" data={destinosGraphJsonLd} />
      <main className="min-w-0 flex-1 bg-background px-4 pb-14 pt-28 sm:px-8 sm:pt-32 lg:px-14 2xl:px-20">
        <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Destinos</span>
          </nav>

          <h1 className="font-heading mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
            Destinos en la Patagonia Argentina
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {SITE_SEO.destinos.intro}
          </p>

          <DestinationsIndex />

          <FaqSection
            items={SITE_FAQ}
            title="Preguntas sobre viajes a la Patagonia"
            className="mt-16 border-t border-border/70 pt-12"
          />
        </div>
      </main>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
