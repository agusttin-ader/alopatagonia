import type { CatalogItemEntry } from "@/lib/catalog/catalog-items";
import type { AccommodationType } from "@/lib/catalog/types";
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

export const ACCOMMODATION_TYPE_NAV: {
  type: AccommodationType;
  id: string;
  title: string;
  navSubtitle: string;
}[] = [
  {
    type: "cabana",
    id: "cabana",
    title: "Cabañas",
    navSubtitle: "Privacidad y espacio",
  },
  {
    type: "departamento",
    id: "departamento",
    title: "Departamentos",
    navSubtitle: "Barrios y capacidades",
  },
  {
    type: "hostel",
    id: "hostel",
    title: "Hoteles",
    navSubtitle: "Según categoría",
  },
];

function accommodationCountLabel(count: number) {
  return count === 1 ? "1 alojamiento" : `${count} alojamientos`;
}

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

export function groupAccommodationEntriesByType(
  entries: CatalogItemEntry[],
): CatalogSplitGroup[] {
  return ACCOMMODATION_TYPE_NAV.map(({ type, id, title, navSubtitle }) => {
    const typeEntries = entries.filter((entry) => entry.item.type === type);

    return {
      id,
      title,
      navSubtitle,
      panelSubtitle: accommodationCountLabel(typeEntries.length),
      meta: accommodationCountLabel(typeEntries.length),
      entries: typeEntries,
    };
  }).filter((group) => group.entries.length > 0);
}
