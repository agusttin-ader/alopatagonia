import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { CatalogBrowsePage } from "@/components/catalog/CatalogBrowsePage";
import { CatalogHubPageShell } from "@/components/catalog-hub/CatalogHubPageShell";
import { Footer } from "@/components/footer/Footer";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import { getAllAccommodations } from "@/lib/catalog/catalog-items";
import { getCatalogHubPillar } from "@/lib/catalog-hub/config";
import type { AppLocale } from "@/i18n/routing";
import { localizeAccommodationItem } from "@/lib/i18n/localized-accommodations";
import { localizeDestinationCatalog } from "@/lib/i18n/localized-destinations-page";
import { buildHubPageMetadata } from "@/lib/i18n/localized-seo-metadata";

const pillar = getCatalogHubPillar("alojamientos");

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as AppLocale;
  return buildHubPageMetadata(locale, "alojamientos", {
    index: pillar?.status === "live",
  });
}

export default async function AlojamientosPage() {
  if (!pillar) return null;

  const locale = (await getLocale()) as AppLocale;
  const tHome = await getTranslations("homeDestinations");
  const tAcc = await getTranslations("accommodations");

  const entries = getAllAccommodations().map((entry) => {
    const destination = localizeDestinationCatalog(tHome, entry.destination);
    return {
      ...entry,
      destination,
      item: localizeAccommodationItem(
        tAcc,
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
        <CatalogBrowsePage mode="accommodation" entries={entries} />
      </CatalogHubPageShell>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
