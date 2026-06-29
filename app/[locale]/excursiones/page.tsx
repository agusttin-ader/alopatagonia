import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { CatalogBrowsePage } from "@/components/catalog/CatalogBrowsePage";
import { CatalogHubPageShell } from "@/components/catalog-hub/CatalogHubPageShell";
import { Footer } from "@/components/footer/Footer";
import { getAllExcursions } from "@/lib/catalog/catalog-items";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import { getCatalogHubPillar } from "@/lib/catalog-hub/config";
import type { AppLocale } from "@/i18n/routing";
import { localizeExcursionItem } from "@/lib/i18n/localized-excursions";
import { localizeDestinationCatalog } from "@/lib/i18n/localized-destinations-page";
import { buildHubPageMetadata } from "@/lib/i18n/localized-seo-metadata";

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

  return (
    <>
      <CatalogHubPageShell pillar={pillar}>
        <CatalogBrowsePage mode="excursion" entries={entries} />
      </CatalogHubPageShell>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
