import Link from "next/link";
import Image from "next/image";

import { Footer } from "@/components/footer/Footer";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import { getAllDestinations } from "@/lib/catalog/destinations";
import { getDestinationCounts } from "@/lib/catalog/utils";
import { IMAGE_QUALITY_GALLERY, IMAGE_SIZES } from "@/lib/image-config";
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
  const destinations = getAllDestinations();

  return (
    <>
      <JsonLdScript id="alo-destinos-breadcrumb-jsonld" data={breadcrumbJsonLd} />
      <main className="min-w-0 flex-1 bg-background px-4 pb-12 pt-28 sm:px-8 sm:pt-32 lg:px-14 2xl:px-20">
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
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Elegí la zona y mirá opciones de alojamiento, excursiones y auto.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {destinations.map((destination) => {
              const counts = getDestinationCounts(destination);
              return (
                <Link
                  key={destination.slug}
                  href={`/destinos/${destination.slug}`}
                  className="group overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={destination.heroImage}
                      alt={destination.name}
                      fill
                      quality={IMAGE_QUALITY_GALLERY}
                      className="object-cover transition group-hover:scale-[1.03]"
                      sizes={IMAGE_SIZES.catalogHubCard}
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground">{destination.region}</p>
                    <h2 className="font-heading mt-1 text-xl font-medium">{destination.name}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {counts.accommodations} alojamientos · {counts.excursions} excursiones
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
