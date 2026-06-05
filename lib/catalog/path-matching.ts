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
