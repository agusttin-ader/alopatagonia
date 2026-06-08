/** Normaliza rutas (p. ej. `n` + tilde combinada → `ñ`) para comparar carpetas. */
export function normalizeCatalogPath(value: string): string {
  return value.normalize("NFC").toLowerCase();
}

export function pathIncludesFolder(imagePath: string, folderSegment: string): boolean {
  const normalizedPath = normalizeCatalogPath(imagePath);
  const normalizedSegment = normalizeCatalogPath(folderSegment);
  return normalizedPath.includes(`/${normalizedSegment}/`);
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
  "excursion-1",
  "excursion-2",
  "excursion-3",
] as const;

export const CATALOG_NATURE_FOLDERS = ["naturaleza"] as const;

export function pathsInAnyFolder(
  imagePaths: string[],
  folderSegments: readonly string[],
): string[] {
  return imagePaths.filter((path) => pathMatchesAnyFolder(path, [...folderSegments]));
}
