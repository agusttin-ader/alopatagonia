import {
  getAllDestinations,
  getDestinationBySlug,
} from "@/lib/catalog/destinations";
import type {
  AccommodationType,
  CatalogItem,
  CatalogItemKind,
  DestinationCatalog,
  ExcursionCategory,
} from "@/lib/catalog/types";

export type CatalogItemEntry = {
  destination: DestinationCatalog;
  item: CatalogItem;
  kind: CatalogItemKind;
};

export type CatalogEntryFilters = {
  destinationSlug?: string;
  accommodationType?: AccommodationType;
  excursionCategory?: ExcursionCategory;
};

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

export function filterCatalogEntries(
  entries: CatalogItemEntry[],
  filters: CatalogEntryFilters,
): CatalogItemEntry[] {
  return entries.filter((entry) => {
    if (filters.destinationSlug && entry.destination.slug !== filters.destinationSlug) {
      return false;
    }

    if (filters.accommodationType && entry.kind === "accommodation") {
      return entry.item.type === filters.accommodationType;
    }

    if (filters.accommodationType && entry.kind !== "accommodation") {
      return false;
    }

    if (filters.excursionCategory && entry.kind === "excursion") {
      return entry.item.category === filters.excursionCategory;
    }

    if (filters.excursionCategory && entry.kind !== "excursion") {
      return false;
    }

    return true;
  });
}

export function groupEntriesByDestination(
  entries: CatalogItemEntry[],
): Map<string, CatalogItemEntry[]> {
  const grouped = new Map<string, CatalogItemEntry[]>();

  for (const destination of getAllDestinations()) {
    const destinationEntries = entries.filter(
      (entry) => entry.destination.slug === destination.slug,
    );
    if (destinationEntries.length > 0) {
      grouped.set(destination.slug, destinationEntries);
    }
  }

  return grouped;
}

export function getCatalogItemBadge(entry: CatalogItemEntry): string {
  if (entry.kind === "excursion") return "Excursión";
  if (entry.item.type === "cabana") return "Cabaña";
  if (entry.item.type === "departamento") return "Departamento";
  return "Hotel";
}

export function getCatalogItemPath(destinationSlug: string, itemSlug: string): string {
  return `/destinos/${destinationSlug}/${itemSlug}`;
}
