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
