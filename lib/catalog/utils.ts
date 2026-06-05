import type { DestinationCatalog } from "@/lib/catalog/types";

export function getDestinationCounts(destination: DestinationCatalog) {
  return {
    accommodations: destination.accommodations.length,
    excursions: destination.excursions.length,
  };
}