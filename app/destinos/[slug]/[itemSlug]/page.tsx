import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CatalogItemDetail } from "@/components/catalog/CatalogItemDetail";
import { Footer } from "@/components/footer/Footer";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import {
  getAllCatalogItemParams,
  getCatalogItemBadge,
  getCatalogItemEntry,
} from "@/lib/catalog/catalog-items";
import { buildCatalogItemGraphJsonLd } from "@/lib/json-ld";
import { buildPageMetadata, formatSiteTitle } from "@/lib/seo";
import { getDestinationSeoKeywords } from "@/lib/seo-destinations";
import { getSiteUrl } from "@/lib/site-url";
import { SITE } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string; itemSlug: string }> };

export function generateStaticParams() {
  return getAllCatalogItemParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, itemSlug } = await params;
  const entry = getCatalogItemEntry(slug, itemSlug);
  if (!entry) {
    return {
      title: { absolute: formatSiteTitle("Opción no encontrada") },
      robots: { index: false, follow: false },
    };
  }

  const { destination, item } = entry;
  const badge = getCatalogItemBadge(entry);
  const heroImage = item.images[0]?.src ?? destination.heroImage;
  const kindLabel = entry.kind === "accommodation" ? "alojamiento" : "excursión";

  return buildPageMetadata({
    title: `${item.name} en ${destination.name} — ${kindLabel}`,
    description:
      item.description ??
      `${badge} en ${destination.name}, Patagonia Argentina. Consultá fotos, detalles y disponibilidad por WhatsApp.`,
    path: `/destinos/${slug}/${itemSlug}`,
    ogImage: heroImage,
    ogImageAlt: `${item.name} en ${destination.name} — ${SITE.name}`,
    keywords: [
      item.name.toLowerCase(),
      `${kindLabel} ${destination.name.toLowerCase()}`,
      ...getDestinationSeoKeywords(slug),
    ],
    titleOrder: "keyword-first",
  });
}

export default async function CatalogItemPage({ params }: PageProps) {
  const { slug, itemSlug } = await params;
  const entry = getCatalogItemEntry(slug, itemSlug);
  if (!entry) notFound();

  const catalogItemJsonLd = buildCatalogItemGraphJsonLd(getSiteUrl(), entry);

  return (
    <>
      <JsonLdScript id="alo-catalog-item-graph-jsonld" data={catalogItemJsonLd} />
      <main className="min-w-0 flex-1">
        <CatalogItemDetail entry={entry} />
      </main>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
