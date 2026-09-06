"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { CatalogSplitBrowsePanel } from "@/components/catalog/CatalogSplitBrowsePanel";
import type { CatalogSplitGroup } from "@/lib/catalog/accommodation-types";
import { groupEntriesByDestination } from "@/lib/catalog/catalog-grouping";
import type { CatalogItemEntry, DestinationCatalog } from "@/lib/catalog/types";
import { destinationSlugRank } from "@/lib/catalog/destination-order";
import {
  catalogAccommodationCount,
  catalogExcursionCount,
} from "@/lib/i18n/localized-catalog";

type CatalogBrowseMode = "accommodation" | "excursion";

function destinationSectionHash(mode: CatalogBrowseMode) {
  return mode === "accommodation" ? "alojamientos-heading" : "excursiones-heading";
}

type CatalogBrowsePageProps = {
  mode: CatalogBrowseMode;
  entries: CatalogItemEntry[];
  /** Destinos con excursiones “próximamente” (resueltos en el servidor). */
  comingSoonDestinations?: Pick<DestinationCatalog, "slug" | "name" | "region">[];
};

export function CatalogBrowsePage({
  mode,
  entries,
  comingSoonDestinations = [],
}: CatalogBrowsePageProps) {
  const t = useTranslations("catalog");

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

    const comingSoonGroups: CatalogSplitGroup[] = comingSoonDestinations
      .filter((destination) => !grouped.has(destination.slug))
      .map((destination) => ({
        id: destination.slug,
        title: destination.name,
        navSubtitle: destination.region,
        panelSubtitle: `${destination.region} · ${comingSoonLabel}`,
        meta: comingSoonLabel,
        entries: [],
        comingSoon: true,
      }));

    return [...fromEntries, ...comingSoonGroups].sort(
      (a, b) => destinationSlugRank(a.id) - destinationSlugRank(b.id),
    );
  }, [comingSoonDestinations, entries, mode, t]);

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
