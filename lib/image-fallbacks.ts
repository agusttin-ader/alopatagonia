import {
  CATALOG_ACCOMMODATION_FOLDERS,
  CATALOG_NATURE_FOLDERS,
  pathsInAnyFolder,
} from "@/lib/catalog/path-matching";

/** Último recurso global cuando no hay assets del destino. */
export const DEFAULT_IMAGE_FALLBACK =
  "/images/destinations/bariloche/banner-bariloche.jpg";

/** Elige la mejor imagen disponible dentro de un destino (paisaje → alojamiento → cualquiera). */
export function pickDestinationFallbackImage(imagePaths: string[]): string {
  return (
    pathsInAnyFolder(imagePaths, CATALOG_NATURE_FOLDERS)[0] ??
    pathsInAnyFolder(imagePaths, CATALOG_ACCOMMODATION_FOLDERS)[0] ??
    imagePaths[0] ??
    DEFAULT_IMAGE_FALLBACK
  );
}
