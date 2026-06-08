import type { ReactNode } from "react";
import { AppImage } from "@/components/media/AppImage";
import Link from "next/link";

import { CatalogItemShowcase } from "@/components/catalog/CatalogItemShowcase";
import { FaqSection } from "@/components/seo/FaqSection";
import { buttonVariants } from "@/components/ui/button";
import { buildCarRentalWhatsAppMessage } from "@/lib/catalog/placeholders";
import type { CatalogItem, DestinationCatalog } from "@/lib/catalog/types";
import { PLANNER_PATH, getWhatsAppUrl } from "@/lib/constants";
import { IMAGE_SIZES } from "@/lib/image-config";
import { getDestinationSeo } from "@/lib/seo-destinations";
import { cn } from "@/lib/utils";

function accommodationBadge(item: CatalogItem) {
  if (item.type === "cabana") return "Cabaña";
  if (item.type === "departamento") return "Departamento";
  return "Hotel";
}

type CatalogSectionProps = {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
};

function CatalogSection({ id, title, description, children }: CatalogSectionProps) {
  return (
    <section aria-labelledby={id} className="scroll-mt-24 sm:scroll-mt-28">
      <div className="flex flex-col gap-3 border-b border-border/70 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id={id} className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export function DestinationDetail({ destination }: { destination: DestinationCatalog }) {
  const carWhatsApp = getWhatsAppUrl(buildCarRentalWhatsAppMessage(destination.name));
  const seo = getDestinationSeo(destination.slug);

  return (
    <>
      <section className="relative min-h-[40vh] overflow-hidden px-4 pb-10 pt-28 sm:px-8 sm:pt-32 lg:px-14 2xl:px-20">
        <AppImage
          src={destination.heroImage}
          alt={`Viajes a ${destination.name} — Patagonia Argentina`}
          fill
          priority
          qualityPreset="gallery"
          className="object-cover"
          sizes={IMAGE_SIZES.viewport}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30" />
        <div className="relative mx-auto max-w-7xl 2xl:max-w-[90rem]">
          <nav className="mb-4 text-sm text-white/85">
            <Link href="/" className="hover:text-white">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <Link href="/destinos" className="hover:text-white">
              Destinos
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{destination.name}</span>
          </nav>
          <p className="text-sm font-medium text-white/90">{destination.region}</p>
          <h1 className="font-heading mt-2 max-w-3xl text-3xl font-medium tracking-tight text-white sm:text-4xl">
            {destination.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/92 sm:text-lg">
            {destination.intro}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-8 lg:space-y-20 lg:px-14 2xl:max-w-[90rem] 2xl:py-16">
        {seo ? (
          <section aria-labelledby="destination-seo-heading" className="max-w-3xl">
            <h2
              id="destination-seo-heading"
              className="font-heading text-2xl font-medium tracking-tight sm:text-3xl"
            >
              Viajes a {destination.name}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {seo.seoIntro}
            </p>
            <Link
              href={PLANNER_PATH}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "mt-6 inline-flex",
              )}
            >
              Planear viaje a {destination.name}
            </Link>
          </section>
        ) : null}

        <CatalogSection
          id="alojamientos-heading"
          title="Alojamientos"
          description="Elegí una opción para ver la galería completa y consultar disponibilidad."
        >
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {destination.accommodations.map((item) => (
              <CatalogItemShowcase
                key={item.id}
                item={item}
                destinationSlug={destination.slug}
                badge={accommodationBadge(item)}
                mobileCardVariant="frame"
              />
            ))}
          </div>
        </CatalogSection>

        <CatalogSection
          id="excursiones-heading"
          title="Excursiones"
          description="Salidas y experiencias en la zona. Mirá fotos y fechas según temporada."
        >
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {destination.excursions.map((item) => (
              <CatalogItemShowcase
                key={item.id}
                item={item}
                destinationSlug={destination.slug}
                badge="Excursión"
              />
            ))}
          </div>
        </CatalogSection>

        <section
          aria-labelledby="auto-heading"
          className="border-t border-border/70 pt-12 lg:pt-14"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2
                id="auto-heading"
                className="font-heading text-2xl font-medium tracking-tight sm:text-3xl"
              >
                Alquiler de auto
              </h2>
              <p className="mt-3 text-muted-foreground">{destination.carRental.description}</p>
              <p className="mt-2 text-sm font-medium">
                Operador:{" "}
                <span className="font-normal text-muted-foreground">
                  {destination.carRental.operatorName}
                </span>
              </p>
            </div>
            <a
              href={carWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "marketing", size: "lg" }), "shrink-0")}
            >
              Consultar auto
            </a>
          </div>
        </section>

        {seo?.faq.length ? (
          <FaqSection
            items={seo.faq}
            title={`Preguntas sobre viajar a ${destination.name}`}
            className="border-t border-border/70 pt-12 lg:pt-14"
          />
        ) : null}
      </div>
    </>
  );
}
