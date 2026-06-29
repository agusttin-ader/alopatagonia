"use client";

import { ExcursionEditorialList } from "@/components/catalog/ExcursionEditorialList";
import type { CatalogItemEntry } from "@/lib/catalog/catalog-items";
import type { DestinationCatalog } from "@/lib/catalog/types";

type DestinationExcursionBrowseProps = {
  destination: DestinationCatalog;
  entries: CatalogItemEntry[];
};

export function DestinationExcursionBrowse({ entries }: DestinationExcursionBrowseProps) {
  return <ExcursionEditorialList entries={entries} />;
}
