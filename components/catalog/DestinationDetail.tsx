import type { ReactNode } from "react";
import { AppImage } from "@/components/media/AppImage";
import Link from "next/link";

import { CatalogItemShowcase } from "@/components/catalog/CatalogItemShowcase";
import { FaqSection } from "@/components/seo/FaqSection";
import { buttonVariants } from "@/components/ui/button";
import { buildCarRentalWhatsAppMessage } from "@/lib/catalog/placeholders";
import type { AccommodationType, CatalogItem, DestinationCatalog } from "@/lib/catalog/types";
import { PLANNER_PATH, getWhatsAppUrl } from "@/lib/constants";
import { IMAGE_SIZES } from "@/lib/image-config";
import {
  CATALOG_GRID_GAP,
  DETAIL_TITLE,
  SECTION_TITLE,
  SHELL_MAX,
  SHELL_PAGE_PT,
  SHELL_PX,
  SUBSECTION_TITLE,
  siteShell,
} from "@/lib/layout-shell";
import { getDestinationSeo } from "@/lib/seo-destinations";
import { cn } from "@/lib/utils";

function accommodationBadge(item: CatalogItem) {
  if (item.type === "cabana") return "Cabaña";
  if (item.type === "departamento") return "Departamento";
  return "Hotel";
}

const ACCOMMODATION_SECTIONS: {
  type: AccommodationType;
  id: string;
  title: string;
  description: string;
}[] = [
  {
    type: "cabana",
    id: "alojamientos-cabanas-heading",
    title: "Cabañas",
    description: "Cabañas con privacidad y espacio, cada una con su galería de fotos.",
  },
  {
    type: "departamento",
    id: "alojamientos-deptos-heading",
    title: "Departamentos",
    description: "Deptos en distintos barrios y capacidades. Tocá para ver fotos y consultar.",
  },
  {
    type: "hostel",
    id: "alojamientos-hoteles-heading",
    title: "Hoteles",
    description: "Hoteles según categoría. Mirá las fotos y preguntanos disponibilidad.",
  },
];

function groupAccommodationsByType(items: CatalogItem[]) {
  return ACCOMMODATION_SECTIONS.map((section) => ({
    ...section,
    items: items.filter((item) => item.type === section.type),
  })).filter((section) => section.items.length > 0);
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
          <h2 id={id} className={cn("font-heading", SECTION_TITLE)}>
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
      <section
        className={cn(
          "relative min-h-[40vh] overflow-hidden pb-10",
          SHELL_PAGE_PT,
          SHELL_PX,
          "min-[1920px]:min-h-[44vh] min-[2560px]:min-h-[46vh]",
        )}
      >
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
        <div className={cn("relative", SHELL_MAX)}>
          <nav className="mb-4 text-sm text-white/85 min-[1920px]:text-[0.9375rem]">
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
          <h1 className={cn("font-heading mt-2 max-w-3xl text-white", DETAIL_TITLE)}>
            {destination.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/92 sm:text-lg min-[1920px]:max-w-3xl min-[1920px]:text-xl">
            {destination.intro}
          </p>
        </div>
      </section>

      <div
        className={cn(
          siteShell("space-y-16 py-12 lg:space-y-20 2xl:py-16"),
          "min-[1920px]:space-y-24 min-[2560px]:space-y-28",
        )}
      >
        {seo ? (
          <section aria-labelledby="destination-seo-heading" className="max-w-3xl">
            <h2 id="destination-seo-heading" className={cn("font-heading", SECTION_TITLE)}>
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

        <section aria-labelledby="alojamientos-heading" className="scroll-mt-24 sm:scroll-mt-28">
          <div className="flex flex-col gap-3 border-b border-border/70 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="alojamientos-heading" className={cn("font-heading", SECTION_TITLE)}>
                Alojamientos
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Tocá una opción para ver todas las fotos y preguntar si hay lugar.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-14 min-[1920px]:space-y-16 min-[2560px]:space-y-20">
            {groupAccommodationsByType(destination.accommodations).map((section) => (
              <section key={section.id} aria-labelledby={section.id} className="scroll-mt-24 sm:scroll-mt-28">
                <div className="mb-6 max-w-2xl">
                  <h3 id={section.id} className={cn("font-heading", SUBSECTION_TITLE)}>
                    {section.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {section.description}
                  </p>
                </div>
                <div className={cn("grid sm:grid-cols-2 lg:grid-cols-3", CATALOG_GRID_GAP)}>
                  {section.items.map((item) => (
                    <CatalogItemShowcase
                      key={item.id}
                      item={item}
                      destinationSlug={destination.slug}
                      badge={accommodationBadge(item)}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <CatalogSection
          id="excursiones-heading"
          title="Excursiones"
          description="Excursiones que trabajamos acá. Fotos y fechas según la temporada."
        >
          <div className={cn("grid sm:grid-cols-2 lg:grid-cols-3", CATALOG_GRID_GAP)}>
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
              <h2 id="auto-heading" className={cn("font-heading", SECTION_TITLE)}>
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
