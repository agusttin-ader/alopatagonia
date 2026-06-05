import { Footer } from "@/components/footer/Footer";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { WinterStoreLanding } from "@/components/winter-store/WinterStoreLanding";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import { WINTER_STORE_COPY, WINTER_STORE_IMAGE } from "@/lib/constants";
import { buildBreadcrumbJsonLd } from "@/lib/json-ld";
import { buildPageMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export const metadata = buildPageMetadata({
  title: "Equipamiento de invierno patagónico",
  description: WINTER_STORE_COPY.metaDescription,
  path: "/invierno",
  ogImage: WINTER_STORE_IMAGE.src,
  ogImageAlt: "Equipamiento de invierno para viajar por Patagonia — Alo Patagonia",
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd(getSiteUrl(), [
  { name: "Inicio", path: "/" },
  { name: "Tienda de invierno", path: "/invierno" },
]);

export default function InviernoPage() {
  return (
    <>
      <JsonLdScript id="alo-invierno-breadcrumb-jsonld" data={breadcrumbJsonLd} />
      <main className="min-w-0 flex-1">
        <WinterStoreLanding />
      </main>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
