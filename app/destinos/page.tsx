import Link from "next/link";

import { DestinationsIndex } from "@/components/catalog/DestinationsIndex";
import { Footer } from "@/components/footer/Footer";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { buildBreadcrumbJsonLd } from "@/lib/json-ld";
import { buildPageMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export const metadata = buildPageMetadata({
  title: "Destinos en la Patagonia",
  description:
    "Bariloche, El Chaltén, San Martín de los Andes, Puerto Madryn y más. Alojamientos, excursiones y auto por destino.",
  path: "/destinos",
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd(getSiteUrl(), [
  { name: "Inicio", path: "/" },
  { name: "Destinos", path: "/destinos" },
]);

export default function DestinosPage() {
  return (
    <>
      <JsonLdScript id="alo-destinos-breadcrumb-jsonld" data={breadcrumbJsonLd} />
      <main className="min-w-0 flex-1 bg-background px-4 pb-14 pt-28 sm:px-8 sm:pt-32 lg:px-14 2xl:px-20">
        <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">Destinos</span>
          </nav>

          <h1 className="font-heading mt-4 text-3xl font-medium tracking-tight sm:text-4xl">
            Destinos
          </h1>

          <DestinationsIndex />
        </div>
      </main>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
