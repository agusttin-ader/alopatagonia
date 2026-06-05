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
import { buildBreadcrumbJsonLd } from "@/lib/json-ld";
import { buildPageMetadata, formatSiteTitle } from "@/lib/seo";
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

  return buildPageMetadata({
    title: `${item.name} — ${destination.name}`,
    description: item.description ?? `${badge} en ${destination.name}. Consultá disponibilidad.`,
    path: `/destinos/${slug}/${itemSlug}`,
    ogImage: heroImage,
    ogImageAlt: `${item.name} — ${SITE.name}`,
  });
}

export default async function CatalogItemPage({ params }: PageProps) {
  const { slug, itemSlug } = await params;
  const entry = getCatalogItemEntry(slug, itemSlug);
  if (!entry) notFound();

  const siteUrl = getSiteUrl();
  const { destination, item } = entry;
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(siteUrl, [
    { name: "Inicio", path: "/" },
    { name: "Destinos", path: "/destinos" },
    { name: destination.name, path: `/destinos/${slug}` },
    { name: item.name, path: `/destinos/${slug}/${itemSlug}` },
  ]);

  return (
    <>
      <JsonLdScript id="alo-catalog-item-breadcrumb-jsonld" data={breadcrumbJsonLd} />
      <main className="min-w-0 flex-1">
        <CatalogItemDetail entry={entry} />
      </main>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
