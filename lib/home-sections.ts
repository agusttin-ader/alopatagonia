import { SECTION_IDS } from "@/lib/constants";

/** Hashes de sección en home que deben conservarse al cargar (no borrarlos en el boot de intro). */
export const HOME_SECTION_HASH_IDS = new Set<string>([
  "inicio",
  ...Object.values(SECTION_IDS),
]);

export function getHomeSectionHref(sectionId: string, isHome: boolean): string {
  return isHome ? `#${sectionId}` : `/#${sectionId}`;
}

/** App Router puede fallar con `<Link href="/#…">`; usar `<a>` nativo. */
export function isCrossPageHomeHashHref(href: string): boolean {
  return href.startsWith("/#");
}

export function scrollToHomeSection(
  sectionId: string,
  options?: { behavior?: ScrollBehavior },
): boolean {
  const behavior = options?.behavior ?? "smooth";

  if (sectionId === "inicio") {
    window.scrollTo({ top: 0, behavior });
    return true;
  }

  const section = document.getElementById(sectionId);
  if (!section) return false;

  section.scrollIntoView({
    behavior,
    block: "start",
    inline: "nearest",
  });
  return true;
}
