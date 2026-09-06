import {
  getAllDestinations,
  getDestinationBySlug,
} from "@/lib/catalog/destinations";
import type { CatalogItemEntry } from "@/lib/catalog/types";

export type { CatalogItemEntry } from "@/lib/catalog/types";
export { getCatalogItemPath } from "@/lib/catalog/catalog-paths";

export function getCatalogItemEntry(
  destinationSlug: string,
  itemSlug: string,
): CatalogItemEntry | undefined {
  const destination = getDestinationBySlug(destinationSlug);
  if (!destination) return undefined;

  const accommodation = destination.accommodations.find((item) => item.itemSlug === itemSlug);
  if (accommodation) {
    return { destination, item: accommodation, kind: "accommodation" };
  }

  const excursion = destination.excursions.find((item) => item.itemSlug === itemSlug);
  if (excursion) {
    return { destination, item: excursion, kind: "excursion" };
  }

  return undefined;
}

export function getAllCatalogItemParams(): { slug: string; itemSlug: string }[] {
  return getAllDestinations().flatMap((destination) => {
    const slugs = [
      ...destination.accommodations.map((item) => item.itemSlug),
      ...destination.excursions.map((item) => item.itemSlug),
    ];
    return slugs.map((itemSlug) => ({ slug: destination.slug, itemSlug }));
  });
}

export function getAllAccommodations(): CatalogItemEntry[] {
  return getAllDestinations().flatMap((destination) =>
    destination.accommodations.map((item) => ({
      destination,
      item,
      kind: "accommodation" as const,
    })),
  );
}

export function getAllExcursions(): CatalogItemEntry[] {
  return getAllDestinations().flatMap((destination) =>
    destination.excursions.map((item) => ({
      destination,
      item,
      kind: "excursion" as const,
    })),
  );
}
