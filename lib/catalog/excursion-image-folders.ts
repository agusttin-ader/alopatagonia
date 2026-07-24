import excursionImageFolders from "@/lib/catalog/excursion-image-folders.json";

export type ExcursionImageFolderConfig = {
  folderSlug: string;
  name: string;
  legacyFolders?: string[];
};

export type DestinationExcursionFolderConfig = {
  folder: string;
  slug: string;
  excursions: ExcursionImageFolderConfig[];
};

export const DESTINATION_EXCURSION_FOLDERS =
  excursionImageFolders as DestinationExcursionFolderConfig[];

export function getExcursionImageFoldersForSlug(
  destinationSlug: string,
): ExcursionImageFolderConfig[] {
  return (
    DESTINATION_EXCURSION_FOLDERS.find((entry) => entry.slug === destinationSlug)
      ?.excursions ?? []
  );
}

/** True si el destino figura en excursion-image-folders.json (aunque tenga 0 excursiones). */
export function hasExplicitExcursionFolderConfig(destinationSlug: string): boolean {
  return DESTINATION_EXCURSION_FOLDERS.some((entry) => entry.slug === destinationSlug);
}

/** Destinos sin listado de excursiones todavía (cartel “próximamente”). */
const DESTINATIONS_EXCURSIONS_COMING_SOON = new Set(["ushuaia"]);

export function hasExcursionsComingSoon(destinationSlug: string): boolean {
  return DESTINATIONS_EXCURSIONS_COMING_SOON.has(destinationSlug);
}

export function getDestinationsExcursionsComingSoon(): string[] {
  return [...DESTINATIONS_EXCURSIONS_COMING_SOON];
}
