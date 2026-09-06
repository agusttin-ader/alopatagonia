/** Carpeta bajo `public/images/destinations/` para cada slug de destino. */
export const DESTINATION_FOLDER_BY_SLUG: Record<string, string> = {
  bariloche: "bariloche",
  "san-martin": "san-martin",
  "el-chalten": "chalten",
  esquel: "esquel-trevelin ",
  "villa-la-angostura": "la-angostura",
  "puerto-madryn": "madryn",
  "el-calafate": "calafate",
  traful: "traful",
  ushuaia: "ushuaia",
};

export function getDestinationFolderForSlug(slug: string): string | undefined {
  return DESTINATION_FOLDER_BY_SLUG[slug];
}
