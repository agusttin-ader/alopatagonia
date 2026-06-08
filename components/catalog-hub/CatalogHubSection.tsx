import { CATALOG_HUB_PILLARS } from "@/lib/catalog-hub/config";
import { SECTION_IDS } from "@/lib/constants";
import { MOBILE_MAGAZINE_G_ENABLED } from "@/lib/mobile-magazine-g";
import { cn } from "@/lib/utils";

import { CatalogHubMobileChips } from "@/components/catalog-hub/CatalogHubMobileChips";
import { CatalogHubPillarCard } from "@/components/catalog-hub/CatalogHubPillarCard";

/** Hub liviano en home: destinos, alojamientos y excursiones (server-only, sin JS). */
export function CatalogHubSection() {
  return (
    <section
      id={SECTION_IDS.catalogHub}
      className={cn(
        "scroll-mt-24 bg-background px-4 py-12 sm:px-8 sm:py-16 lg:px-14 2xl:px-20",
        MOBILE_MAGAZINE_G_ENABLED && "max-md:bg-secondary/35 max-md:py-14",
      )}
      aria-labelledby="catalog-hub-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/85">
            Catálogo
          </p>
          <h2
            id="catalog-hub-heading"
            className="font-heading mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl 2xl:text-[2.6rem]"
          >
            Explorá por categorías
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Navegá entre destinos, alojamientos y excursiones… mirá las fotos y consultá sobre
            las opciones que más te interesen.
          </p>
        </div>

        <CatalogHubMobileChips className="mt-8" />

        <ul className="mt-10 grid list-none gap-6 max-md:mt-8 max-md:gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:items-start lg:gap-8">
          {CATALOG_HUB_PILLARS.map((pillar, index) => (
            <li key={pillar.slug} id={`hub-card-${pillar.slug}`} className="min-h-0 scroll-mt-28">
              <CatalogHubPillarCard pillar={pillar} priority={index === 0} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
