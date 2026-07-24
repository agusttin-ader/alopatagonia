"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { CatalogSplitBrowsePanel } from "@/components/catalog/CatalogSplitBrowsePanel";
import type { CatalogSplitGroup } from "@/lib/catalog/accommodation-types";
import {
  groupEntriesByDestination,
  type CatalogItemEntry,
} from "@/lib/catalog/catalog-items";
import { getAllDestinations } from "@/lib/catalog/destinations";
import { destinationSlugRank } from "@/lib/catalog/destination-order";
import { getDestinationsExcursionsComingSoon } from "@/lib/catalog/excursion-image-folders";
import {
  catalogAccommodationCount,
  catalogExcursionCount,
} from "@/lib/i18n/localized-catalog";
import { localizeDestinationCatalog } from "@/lib/i18n/localized-destinations-page";

type CatalogBrowseMode = "accommodation" | "excursion";

function destinationSectionHash(mode: CatalogBrowseMode) {
  return mode === "accommodation" ? "alojamientos-heading" : "excursiones-heading";
}

type CatalogBrowsePageProps = {
  mode: CatalogBrowseMode;
  entries: CatalogItemEntry[];
};

export function CatalogBrowsePage({ mode, entries }: CatalogBrowsePageProps) {
  const t = useTranslations("catalog");
  const tHome = useTranslations("homeDestinations");

  const groups = useMemo((): CatalogSplitGroup[] => {
    const grouped = groupEntriesByDestination(entries);
    const comingSoonLabel = t("excursionsComingSoon.navMeta");

    const fromEntries: CatalogSplitGroup[] = Array.from(grouped.entries()).map(
      ([slug, destinationEntries]) => {
        const destination = destinationEntries[0]!.destination;
        const meta =
          mode === "excursion"
            ? catalogExcursionCount(t, destinationEntries.length)
            : catalogAccommodationCount(t, destinationEntries.length);

        return {
          id: slug,
          title: destination.name,
          navSubtitle: destination.region,
          panelSubtitle: `${destination.region} · ${meta}`,
          meta,
          entries: destinationEntries,
        };
      },
    );

    if (mode !== "excursion") {
      return fromEntries.sort((a, b) => destinationSlugRank(a.id) - destinationSlugRank(b.id));
    }

    const comingSoonGroups: CatalogSplitGroup[] = getDestinationsExcursionsComingSoon()
      .filter((slug) => !grouped.has(slug))
      .flatMap((slug) => {
        const raw = getAllDestinations().find((destination) => destination.slug === slug);
        if (!raw) return [];

        const destination = localizeDestinationCatalog(tHome, raw);

        return [
          {
            id: slug,
            title: destination.name,
            navSubtitle: destination.region,
            panelSubtitle: `${destination.region} · ${comingSoonLabel}`,
            meta: comingSoonLabel,
            entries: [],
            comingSoon: true,
          } satisfies CatalogSplitGroup,
        ];
      });

    return [...fromEntries, ...comingSoonGroups].sort(
      (a, b) => destinationSlugRank(a.id) - destinationSlugRank(b.id),
    );
  }, [entries, mode, t, tHome]);

  return (
    <section className="mt-10 max-md:mt-6">
      <CatalogSplitBrowsePanel
        groups={groups}
        mode={mode}
        navAriaLabel={t("chooseDestination")}
        panelAction={(group) => ({
          label: t("viewDestination"),
          href: `/destinos/${group.id}#${destinationSectionHash(mode)}`,
        })}
      />
    </section>
  );
}
