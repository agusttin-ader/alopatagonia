import { SECTION_IDS } from "@/lib/constants";

/** Hashes de sección en home que deben conservarse al cargar (no borrarlos en el boot de intro). */
export const HOME_SECTION_HASH_IDS = new Set<string>([
  "inicio",
  ...Object.values(SECTION_IDS),
]);

export function getHomeSectionHref(sectionId: string, isHome: boolean): string {
  return isHome ? `#${sectionId}` : `/#${sectionId}`;
}
