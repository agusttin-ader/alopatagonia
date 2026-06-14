import type { CatalogItemEntry } from "@/lib/catalog/catalog-items";
import type { getTranslations } from "next-intl/server";

import { catalogAccommodationCount, getLocalizedAccommodationTypeNav } from "@/lib/i18n/localized-catalog";

type Translator = Awaited<ReturnType<typeof getTranslations>>;

export type CatalogSplitGroup = {
  id: string;
  title: string;
  /** Línea secundaria en la barra lateral / tabs. */
  navSubtitle: string;
  /** Línea bajo el título del panel derecho. */
  panelSubtitle: string;
  meta: string;
  entries: CatalogItemEntry[];
};

export function groupAccommodationEntriesByTypeLocalized(
  t: Translator,
  entries: CatalogItemEntry[],
): CatalogSplitGroup[] {
  return getLocalizedAccommodationTypeNav(t).map(({ type, id, title, navSubtitle }) => {
    const typeEntries = entries.filter((entry) => entry.item.type === type);

    return {
      id,
      title,
      navSubtitle,
      panelSubtitle: catalogAccommodationCount(t, typeEntries.length),
      meta: catalogAccommodationCount(t, typeEntries.length),
      entries: typeEntries,
    };
  }).filter((group) => group.entries.length > 0);
}
