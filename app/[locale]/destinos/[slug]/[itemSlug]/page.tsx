import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { CatalogItemDetail } from "@/components/catalog/CatalogItemDetail";
import { Footer } from "@/components/footer/Footer";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import type { AppLocale } from "@/i18n/routing";
import {
  getAllCatalogItemParams,
  getCatalogItemEntry,
} from "@/lib/catalog/catalog-items";
import { localizeAccommodationItem } from "@/lib/i18n/localized-accommodations";
import { localizeExcursionItem } from "@/lib/i18n/localized-excursions";
import { localizeDestinationCatalog } from "@/lib/i18n/localized-destinations-page";
import { buildCatalogItemPageMetadata } from "@/lib/i18n/localized-seo-metadata";
import { buildLocalizedPageMetadata } from "@/lib/seo-i18n";
import { buildCatalogItemGraphJsonLd } from "@/lib/json-ld";
import { getSiteUrl } from "@/lib/site-url";

type PageProps = { params: Promise<{ slug: string; itemSlug: string }> };

export function generateStaticParams() {
  return getAllCatalogItemParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (await getLocale()) as AppLocale;
  const { slug, itemSlug } = await params;
  const entry = getCatalogItemEntry(slug, itemSlug);

  if (!entry) {
    const t = await getTranslations("seo");
    return buildLocalizedPageMetadata({
      locale,
      path: `/destinos/${slug}/${itemSlug}`,
      title: t("catalogItem.notFound"),
      description: t("catalogItem.notFound"),
      index: false,
    });
  }

  const tHome = await getTranslations("homeDestinations");
  const tAcc = await getTranslations("accommodations");
  const tExc = await getTranslations("excursions");
  const destination = localizeDestinationCatalog(tHome, entry.destination);
  const item =
    entry.kind === "accommodation"
      ? localizeAccommodationItem(tAcc, locale, destination.slug, destination.name, entry.item)
      : localizeExcursionItem(tExc, locale, destination.slug, destination.name, entry.item);

  return buildCatalogItemPageMetadata(locale, { ...entry, destination, item });
}

export default async function CatalogItemPage({ params }: PageProps) {
  const { slug, itemSlug } = await params;
  const entry = getCatalogItemEntry(slug, itemSlug);
  if (!entry) notFound();

  const locale = await getLocale();
  const tNav = await getTranslations("nav");
  const tHome = await getTranslations("homeDestinations");
  const tAcc = await getTranslations("accommodations");
  const tExc = await getTranslations("excursions");

  const destination = localizeDestinationCatalog(tHome, entry.destination);
  const item =
    entry.kind === "accommodation"
      ? localizeAccommodationItem(tAcc, locale, destination.slug, destination.name, entry.item)
      : localizeExcursionItem(tExc, locale, destination.slug, destination.name, entry.item);
  const localizedEntry = { ...entry, destination, item };

  const catalogItemJsonLd = buildCatalogItemGraphJsonLd(getSiteUrl(), localizedEntry, {
    breadcrumbs: { home: tNav("home"), destinations: tNav("destinations") },
  });

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
