"use client";

import { CatalogSplitBrowsePanel } from "@/components/catalog/CatalogSplitBrowsePanel";
import { groupAccommodationEntriesByType } from "@/lib/catalog/accommodation-types";
import type { CatalogItemEntry } from "@/lib/catalog/catalog-items";
import type { DestinationCatalog } from "@/lib/catalog/types";

type DestinationAccommodationBrowseProps = {
  destination: DestinationCatalog;
  entries: CatalogItemEntry[];
};

export function DestinationAccommodationBrowse({
  destination,
  entries,
}: DestinationAccommodationBrowseProps) {
  const groups = groupAccommodationEntriesByType(entries).map((group) => ({
    ...group,
    panelSubtitle: `${destination.region} · ${group.meta}`,
  }));

  return (
    <CatalogSplitBrowsePanel
      groups={groups}
      mode="accommodation"
      navAriaLabel="Elegir tipo de alojamiento"
      panelAction={() => ({
        label: "Ver catálogo",
        href: "/alojamientos",
      })}
    />
  );
}
