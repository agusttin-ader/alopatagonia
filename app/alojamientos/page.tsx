import { CatalogBrowsePage } from "@/components/catalog/CatalogBrowsePage";
import { CatalogHubPageShell } from "@/components/catalog-hub/CatalogHubPageShell";
import { Footer } from "@/components/footer/Footer";
import { getAllAccommodations } from "@/lib/catalog/catalog-items";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import { getCatalogHubPillar } from "@/lib/catalog-hub/config";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_SEO } from "@/lib/seo-destinations";

const pillar = getCatalogHubPillar("alojamientos");

export const metadata = buildPageMetadata({
  title: SITE_SEO.alojamientos.title,
  description: SITE_SEO.alojamientos.description,
  path: "/alojamientos",
  keywords: [...SITE_SEO.alojamientos.keywords],
  titleOrder: "keyword-first",
  index: pillar?.status === "live",
});

export default function AlojamientosPage() {
  if (!pillar) return null;

  return (
    <>
      <CatalogHubPageShell pillar={pillar}>
        <CatalogBrowsePage mode="accommodation" entries={getAllAccommodations()} />
      </CatalogHubPageShell>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
