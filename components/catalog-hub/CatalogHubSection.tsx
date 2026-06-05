import { CATALOG_HUB_PILLARS } from "@/lib/catalog-hub/config";
import { SECTION_IDS } from "@/lib/constants";

import { CatalogHubPillarCard } from "@/components/catalog-hub/CatalogHubPillarCard";

/** Hub liviano en home: destinos, alojamientos y excursiones (server-only, sin JS). */
export function CatalogHubSection() {
  return (
    <section
      id={SECTION_IDS.catalogHub}
      className="scroll-mt-24 bg-background px-4 py-12 sm:px-8 sm:py-16 lg:px-14 2xl:px-20"
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
            Explorá por categoría
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Destinos, alojamientos y excursiones en rutas separadas. Entrá, mirá fotos y
            consultanos lo que te interese.
          </p>
        </div>

        <ul className="mt-10 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:items-start lg:gap-8">
          {CATALOG_HUB_PILLARS.map((pillar, index) => (
            <li key={pillar.slug} className="min-h-0">
              <CatalogHubPillarCard pillar={pillar} priority={index === 0} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
