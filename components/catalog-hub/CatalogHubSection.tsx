import { getTranslations } from "next-intl/server";

import { CatalogHubMobileChips } from "@/components/catalog-hub/CatalogHubMobileChips";
import { CatalogHubPillarCard } from "@/components/catalog-hub/CatalogHubPillarCard";
import { SECTION_IDS } from "@/lib/constants";
import { localizeCatalogHubPillars } from "@/lib/i18n/localized-home";
import { MOBILE_MAGAZINE_G_ENABLED } from "@/lib/mobile-magazine-g";
import { cn } from "@/lib/utils";

/** Hub liviano en home: destinos, alojamientos y excursiones (server-only, sin JS). */
export async function CatalogHubSection() {
  const t = await getTranslations("catalogHub");
  const pillars = localizeCatalogHubPillars(t);
  const labels = {
    comingSoon: t("comingSoon"),
    explore: t("explore"),
    preview: t("preview"),
  };

  return (
    <section
      id={SECTION_IDS.catalogHub}
      className={cn(
        "scroll-mt-24 bg-background px-4 py-12 sm:px-8 sm:py-16 lg:px-14 2xl:px-20",
        MOBILE_MAGAZINE_G_ENABLED &&
          "max-md:relative max-md:z-[1] max-md:-mt-px max-md:rounded-t-[1.75rem] max-md:bg-secondary/35 max-md:px-4 max-md:pb-14 max-md:pt-11 max-md:shadow-[0_-16px_44px_-30px_rgba(0,0,0,0.28)]",
      )}
      aria-labelledby="catalog-hub-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/85 max-md:tracking-[0.14em]">
            {t("eyebrow")}
          </p>
          <h2
            id="catalog-hub-heading"
            className="font-heading mt-3 text-3xl font-semibold tracking-tight text-foreground max-md:text-[1.65rem] max-md:leading-tight sm:text-4xl 2xl:text-[2.6rem]"
          >
            {t("title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground max-md:mt-3 max-md:text-base max-md:leading-relaxed">
            {t("description")}
          </p>
        </div>

        <CatalogHubMobileChips pillars={pillars} className="mt-6 max-md:mt-5" />

        <ul className="mt-10 grid list-none gap-6 max-md:mt-6 max-md:gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:items-start lg:gap-8">
          {pillars.map((pillar, index) => (
            <li key={pillar.slug} id={`hub-card-${pillar.slug}`} className="min-h-0 scroll-mt-28">
              <CatalogHubPillarCard pillar={pillar} priority={index === 0} labels={labels} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
