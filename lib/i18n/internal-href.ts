/** Rutas internas del sitio (no externas, mailto ni tel). */
export function isInternalAppHref(href: string): boolean {
  const trimmed = href.trim();
  if (!trimmed || trimmed.startsWith("#")) return false;
  if (/^(mailto:|tel:|https?:)/i.test(trimmed)) return false;
  return trimmed.startsWith("/");
}

/** Enlace a una sección de la home conservando el idioma activo. */
export function getLocalizedHomeSectionHref(sectionId: string): `/#${string}` {
  return `/#${sectionId}`;
}
