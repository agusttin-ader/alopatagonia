import { CatalogBrowsePage } from "@/components/catalog/CatalogBrowsePage";
import { CatalogHubPageShell } from "@/components/catalog-hub/CatalogHubPageShell";
import { Footer } from "@/components/footer/Footer";
import { getAllExcursions } from "@/lib/catalog/catalog-items";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import { getCatalogHubPillar } from "@/lib/catalog-hub/config";
import { buildPageMetadata } from "@/lib/seo";

const pillar = getCatalogHubPillar("excursiones");

export const metadata = buildPageMetadata({
  title: "Excursiones en la Patagonia",
  description:
    pillar?.description ??
    "Trekking, navegación, fauna y más en la Patagonia.",
  path: "/excursiones",
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
