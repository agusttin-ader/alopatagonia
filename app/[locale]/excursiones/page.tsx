import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { CatalogBrowsePage } from "@/components/catalog/CatalogBrowsePage";
import { CatalogHubPageShell } from "@/components/catalog-hub/CatalogHubPageShell";
import { Footer } from "@/components/footer/Footer";
import { getAllExcursions } from "@/lib/catalog/catalog-items";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import { getCatalogHubPillar } from "@/lib/catalog-hub/config";
import type { AppLocale } from "@/i18n/routing";
import { buildHubPageMetadata } from "@/lib/i18n/localized-seo-metadata";

const pillar = getCatalogHubPillar("excursiones");

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as AppLocale;
  return buildHubPageMetadata(locale, "excursiones", {
    index: pillar?.status === "live",
  });
}

export default function ExcursionesPage() {
  if (!pillar) return null;

  return (
    <>
      <CatalogHubPageShell pillar={pillar}>
        <CatalogBrowsePage mode="excursion" entries={getAllExcursions()} />
      </CatalogHubPageShell>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
