"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { CatalogSplitBrowsePanel } from "@/components/catalog/CatalogSplitBrowsePanel";
import type { CatalogSplitGroup } from "@/lib/catalog/accommodation-types";
import {
  groupEntriesByDestination,
  type CatalogItemEntry,
} from "@/lib/catalog/catalog-items";
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
};

export function CatalogBrowsePage({ mode, entries }: CatalogBrowsePageProps) {
  const t = useTranslations("catalog");

  const groups = useMemo(
    (): CatalogSplitGroup[] =>
      Array.from(groupEntriesByDestination(entries).entries()).map(([slug, destinationEntries]) => {
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
      }),
    [entries, mode, t],
  );

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
