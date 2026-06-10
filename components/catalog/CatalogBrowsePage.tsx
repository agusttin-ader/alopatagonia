"use client";

import { useMemo } from "react";

import { CatalogSplitBrowsePanel } from "@/components/catalog/CatalogSplitBrowsePanel";
import type { CatalogSplitGroup } from "@/lib/catalog/accommodation-types";
import {
  groupEntriesByDestination,
  type CatalogItemEntry,
} from "@/lib/catalog/catalog-items";

type CatalogBrowseMode = "accommodation" | "excursion";

function itemCountLabel(count: number, mode: CatalogBrowseMode) {
  if (mode === "excursion") {
    return count === 1 ? "1 excursión" : `${count} excursiones`;
  }
  return count === 1 ? "1 alojamiento" : `${count} alojamientos`;
}

function destinationSectionHash(mode: CatalogBrowseMode) {
  return mode === "accommodation" ? "alojamientos-heading" : "excursiones-heading";
}

type CatalogBrowsePageProps = {
  mode: CatalogBrowseMode;
  entries: CatalogItemEntry[];
};

export function CatalogBrowsePage({ mode, entries }: CatalogBrowsePageProps) {
  const groups = useMemo(
    (): CatalogSplitGroup[] =>
      Array.from(groupEntriesByDestination(entries).entries()).map(([slug, destinationEntries]) => {
        const destination = destinationEntries[0]!.destination;
        const meta = itemCountLabel(destinationEntries.length, mode);

        return {
          id: slug,
          title: destination.name,
          navSubtitle: destination.region,
          panelSubtitle: `${destination.region} · ${meta}`,
          meta,
          entries: destinationEntries,
        };
      }),
    [entries, mode],
  );

  return (
    <section className="mt-10">
      <CatalogSplitBrowsePanel
        groups={groups}
        mode={mode}
        navAriaLabel="Elegir destino"
        panelAction={(group) => ({
          label: "Ver destino",
          href: `/destinos/${group.id}#${destinationSectionHash(mode)}`,
        })}
      />
    </section>
  );
}
