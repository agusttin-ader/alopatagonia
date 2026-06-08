import Link from "next/link";

import { DestinationsIndex } from "@/components/catalog/DestinationsIndex";
import { FaqSection } from "@/components/seo/FaqSection";
import { Footer } from "@/components/footer/Footer";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { getAllDestinations } from "@/lib/catalog/destinations";
import { buildDestinosHubGraphJsonLd } from "@/lib/json-ld";
import { PAGE_TITLE, SHELL_PAGE_PT, siteShell } from "@/lib/layout-shell";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_FAQ, SITE_SEO } from "@/lib/seo-destinations";
import { getSiteUrl } from "@/lib/site-url";
import { cn } from "@/lib/utils";

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
      <main className={cn("min-w-0 flex-1 bg-background pb-14", SHELL_PAGE_PT)}>
        <div className={siteShell()}>
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Destinos</span>
          </nav>

          <h1 className={cn("font-heading mt-4", PAGE_TITLE)}>
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
