import type { ReactNode } from "react";
import { AppImage } from "@/components/media/AppImage";
import Link from "next/link";

import { CatalogItemGrid } from "@/components/catalog/CatalogItemGrid";
import { DestinationAccommodationBrowse } from "@/components/catalog/DestinationAccommodationBrowse";
import { FaqSection } from "@/components/seo/FaqSection";
import { buttonVariants } from "@/components/ui/button";
import { buildCarRentalWhatsAppMessage } from "@/lib/catalog/placeholders";
import type { DestinationCatalog } from "@/lib/catalog/types";
import { PLANNER_PATH, getWhatsAppUrl } from "@/lib/constants";
import { IMAGE_SIZES } from "@/lib/image-config";
import {
  DETAIL_TITLE,
  SECTION_TITLE,
  SHELL_MAX,
  SHELL_PAGE_PT,
  SHELL_PX,
  siteShell,
} from "@/lib/layout-shell";
import { getDestinationSeo } from "@/lib/seo-destinations";
import { cn } from "@/lib/utils";

function accommodationCountLabel(count: number) {
  return count === 1 ? "1 alojamiento" : `${count} alojamientos`;
}

function excursionCountLabel(count: number) {
  return count === 1 ? "1 excursión" : `${count} excursiones`;
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
  const accommodationEntries = destination.accommodations.map((item) => ({
    destination,
    item,
    kind: "accommodation" as const,
  }));
  const excursionEntries = destination.excursions.map((item) => ({
    destination,
    item,
    kind: "excursion" as const,
  }));

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
          qualityPreset="hero"
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

        {accommodationEntries.length > 0 ? (
          <section aria-labelledby="alojamientos-heading" className="scroll-mt-24 sm:scroll-mt-28">
            <div className="mb-8 min-w-0">
              <h2 id="alojamientos-heading" className={cn("font-heading", SECTION_TITLE)}>
                Alojamientos
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {destination.region} · {accommodationCountLabel(accommodationEntries.length)}
              </p>
            </div>

            <DestinationAccommodationBrowse
              destination={destination}
              entries={accommodationEntries}
            />
          </section>
        ) : null}

        {excursionEntries.length > 0 ? (
          <CatalogSection
            id="excursiones-heading"
            title="Excursiones"
            description={`${destination.region} · ${excursionCountLabel(excursionEntries.length)}`}
          >
            <CatalogItemGrid
              entries={excursionEntries}
              mode="excursion"
              compact
              compactGap
              gridClassName="grid-cols-2 lg:grid-cols-3"
            />
          </CatalogSection>
        ) : null}

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
