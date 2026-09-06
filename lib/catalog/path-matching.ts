/** Normaliza rutas (p. ej. `n` + tilde combinada → `ñ`) para comparar carpetas. */
export function normalizeCatalogPath(value: string): string {
  return value.normalize("NFC").toLowerCase();
}

export function pathIncludesFolder(imagePath: string, folderSegment: string): boolean {
  const segments = normalizeCatalogPath(imagePath).split("/").filter(Boolean);
  const normalizedSegment = normalizeCatalogPath(folderSegment);
  return segments.includes(normalizedSegment);
}

/** Imagen dentro de `…/excursiones/{folderSlug}/` (o carpeta legacy `excurisiones`). */
export function pathInExcursionFolder(imagePath: string, folderSlug: string): boolean {
  const segments = normalizeCatalogPath(imagePath).split("/").filter(Boolean);
  const normalizedSlug = normalizeCatalogPath(folderSlug);
  const excursionIndex = segments.findIndex(
    (segment) => segment === "excursiones" || segment === "excurisiones",
  );
  if (excursionIndex === -1) return false;
  return segments[excursionIndex + 1] === normalizedSlug;
}

export function pathMatchesAnyFolder(
  imagePath: string,
  folderSegments: string[],
): boolean {
  return folderSegments.some((segment) => pathIncludesFolder(imagePath, segment));
}

/** Segmentos de carpeta bajo `public/images/destinations/[destino]/`. */
export const CATALOG_ACCOMMODATION_FOLDERS = [
  "alojamientos",
  "cabanas",
  "cabana",
  "dptos",
  "departamento",
  "hoteles",
  "hostel",
  "Bariloche dptos",
  "Bariloche cabañas",
  "Bariloche Hoteles",
] as const;

export const CATALOG_EXCURSION_FOLDERS = [
  "excursiones",
  "excurisiones",
] as const;

export const CATALOG_NATURE_FOLDERS = ["naturaleza", "paisajes"] as const;

export const CATALOG_PAISAJES_FOLDER = "paisajes" as const;

export function pathsInAnyFolder(
  imagePaths: string[],
  folderSegments: readonly string[],
): string[] {
  return imagePaths.filter((path) => pathMatchesAnyFolder(path, [...folderSegments]));
}
