/** Orden editorial acordado para listados de destinos en todo el sitio. */
export const DESTINATION_SLUG_ORDER = [
  "bariloche",
  "san-martin",
  "traful",
  "villa-la-angostura",
  "esquel",
  "puerto-madryn",
  "el-calafate",
  "el-chalten",
  "ushuaia",
] as const;

export type DestinationSlug = (typeof DESTINATION_SLUG_ORDER)[number];

export function destinationSlugRank(slug: string): number {
  const index = DESTINATION_SLUG_ORDER.indexOf(slug as DestinationSlug);
  return index === -1 ? Number.MAX_SAFE_INTEGER : index;
}

export function sortByDestinationSlugOrder<T extends { slug: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => destinationSlugRank(a.slug) - destinationSlugRank(b.slug));
}
