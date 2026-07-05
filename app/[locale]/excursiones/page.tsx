import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { CatalogBrowsePage } from "@/components/catalog/CatalogBrowsePage";
import { CatalogHubPageShell } from "@/components/catalog-hub/CatalogHubPageShell";
import { Footer } from "@/components/footer/Footer";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { getAllExcursions } from "@/lib/catalog/catalog-items";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import { getCatalogHubPillar } from "@/lib/catalog-hub/config";
import type { AppLocale } from "@/i18n/routing";
import { localizeExcursionItem } from "@/lib/i18n/localized-excursions";
import { getLocalizedExcursionesHubFaq } from "@/lib/i18n/localized-excursions-hub";
import { localizeDestinationCatalog } from "@/lib/i18n/localized-destinations-page";
import { buildHubPageMetadata } from "@/lib/i18n/localized-seo-metadata";
import { buildExcursionesHubGraphJsonLd } from "@/lib/json-ld";
import { EXCURSIONES_HUB_FAQ } from "@/lib/seo-destinations";
import { getSiteUrl } from "@/lib/site-url";

const pillar = getCatalogHubPillar("excursiones");

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as AppLocale;
  return buildHubPageMetadata(locale, "excursiones", {
    index: pillar?.status === "live",
  });
}

export default async function ExcursionesPage() {
  if (!pillar) return null;

  const locale = (await getLocale()) as AppLocale;
  const tHome = await getTranslations("homeDestinations");
  const tExc = await getTranslations("excursions");
  const tNav = await getTranslations("nav");
  const tCatalog = await getTranslations("catalog");

  const entries = getAllExcursions().map((entry) => {
    const destination = localizeDestinationCatalog(tHome, entry.destination);
    return {
      ...entry,
      destination,
      item: localizeExcursionItem(
        tExc,
        locale,
        destination.slug,
        destination.name,
        entry.item,
      ),
    };
  });

  const faq =
    locale === "es"
      ? [...EXCURSIONES_HUB_FAQ]
      : getLocalizedExcursionesHubFaq(await getTranslations("excursionsHub"), locale);
  const excursionesGraphJsonLd = buildExcursionesHubGraphJsonLd(getSiteUrl(), entries, faq, {
    breadcrumbs: { home: tNav("home"), destinations: tNav("destinations"), excursions: tNav("excursions") },
  });

  return (
    <>
      <JsonLdScript id="alo-excursiones-graph-jsonld" data={excursionesGraphJsonLd} />
      <CatalogHubPageShell pillar={pillar}>
        <CatalogBrowsePage mode="excursion" entries={entries} />
        <FaqSection
          items={faq}
          title={tCatalog("faqExcursions")}
          className="mt-16 border-t border-border/70 pt-12 max-md:mt-10 max-md:pt-8"
        />
      </CatalogHubPageShell>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
