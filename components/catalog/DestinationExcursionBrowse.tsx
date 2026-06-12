"use client";

import { CatalogSplitBrowsePanel } from "@/components/catalog/CatalogSplitBrowsePanel";
import { groupExcursionEntriesByCategory } from "@/lib/catalog/excursion-categories";
import type { CatalogItemEntry } from "@/lib/catalog/catalog-items";
import type { DestinationCatalog } from "@/lib/catalog/types";

type DestinationExcursionBrowseProps = {
  destination: DestinationCatalog;
  entries: CatalogItemEntry[];
};

export function DestinationExcursionBrowse({
  destination,
  entries,
}: DestinationExcursionBrowseProps) {
  const groups = groupExcursionEntriesByCategory(entries).map((group) => ({
    ...group,
    panelSubtitle: `${destination.region} · ${group.meta}`,
  }));

  return (
    <CatalogSplitBrowsePanel
      groups={groups}
      mode="excursion"
      navAriaLabel="Elegir tipo de excursión"
      panelAction={() => ({
        label: "Ver catálogo",
        href: "/excursiones",
      })}
    />
  );
}
