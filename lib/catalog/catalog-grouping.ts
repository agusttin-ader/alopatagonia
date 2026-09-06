import type { CatalogItemEntry } from "@/lib/catalog/types";

export function groupEntriesByDestination(
  entries: CatalogItemEntry[],
): Map<string, CatalogItemEntry[]> {
  const grouped = new Map<string, CatalogItemEntry[]>();

  for (const entry of entries) {
    const slug = entry.destination.slug;
    const list = grouped.get(slug) ?? [];
    list.push(entry);
    grouped.set(slug, list);
  }

  return grouped;
}
