import { CatalogBrowsePage } from "@/components/catalog/CatalogBrowsePage";
import { CatalogHubPageShell } from "@/components/catalog-hub/CatalogHubPageShell";
import { Footer } from "@/components/footer/Footer";
import { getAllExcursions } from "@/lib/catalog/catalog-items";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import { getCatalogHubPillar } from "@/lib/catalog-hub/config";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_SEO } from "@/lib/seo-destinations";

const pillar = getCatalogHubPillar("excursiones");

export const metadata = buildPageMetadata({
  title: SITE_SEO.excursiones.title,
  description: SITE_SEO.excursiones.description,
  path: "/excursiones",
  keywords: [...SITE_SEO.excursiones.keywords],
  titleOrder: "keyword-first",
  index: pillar?.status === "live",
});

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
