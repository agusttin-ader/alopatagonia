import { CatalogHubPageShell } from "@/components/catalog-hub/CatalogHubPageShell";
import { Footer } from "@/components/footer/Footer";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import { getCatalogHubPillar } from "@/lib/catalog-hub/config";
import { buildPageMetadata } from "@/lib/seo";

const pillar = getCatalogHubPillar("alojamientos");

export const metadata = buildPageMetadata({
  title: "Alojamientos en la Patagonia",
  description:
    pillar?.description ??
    "Cabañas, departamentos y hostels en la Patagonia. Opciones reales por destino.",
  path: "/alojamientos",
  index: pillar?.status === "live",
});

export default function AlojamientosPage() {
  if (!pillar) return null;

  return (
    <>
      <CatalogHubPageShell pillar={pillar} />
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
