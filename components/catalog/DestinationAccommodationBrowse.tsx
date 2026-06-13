"use client";

import { useTranslations } from "next-intl";

import { CatalogSplitBrowsePanel } from "@/components/catalog/CatalogSplitBrowsePanel";
import { groupAccommodationEntriesByTypeLocalized } from "@/lib/catalog/accommodation-types";
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
  const t = useTranslations("catalog");
  const groups = groupAccommodationEntriesByTypeLocalized(t, entries).map((group) => ({
    ...group,
    panelSubtitle: `${destination.region} · ${group.meta}`,
  }));

  return (
    <CatalogSplitBrowsePanel
      groups={groups}
      mode="accommodation"
      navAriaLabel={t("chooseAccommodationType")}
      panelAction={() => ({
        label: t("viewCatalog"),
        href: "/alojamientos",
      })}
    />
  );
}
