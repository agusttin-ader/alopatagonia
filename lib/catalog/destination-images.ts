import manifest from "@/lib/catalog/generated/destination-images.json";

type DestinationImageManifest = Record<string, string[]>;

const MANIFEST = manifest as DestinationImageManifest;

/** Rutas web pre-generadas (sin fs en runtime → compatible con Vercel). */
export function getDestinationImagePaths(folder: string): string[] {
  return MANIFEST[folder] ?? [];
}
