import type { CatalogSplitGroup } from "@/lib/catalog/accommodation-types";
import type { CatalogItemEntry } from "@/lib/catalog/catalog-items";
import type { ExcursionCategory } from "@/lib/catalog/types";

export const EXCURSION_CATEGORY_LABELS: Record<ExcursionCategory, string> = {
  trekking: "Trekking",
  navegacion: "Navegación",
  fauna: "Fauna",
  aventura: "Aventura",
};

export const EXCURSION_CATEGORY_NAV: {
  category: ExcursionCategory;
  id: string;
  title: string;
  navSubtitle: string;
}[] = [
  {
    category: "trekking",
    id: "trekking",
    title: "Trekking",
    navSubtitle: "Senderos y montaña",
  },
  {
    category: "navegacion",
    id: "navegacion",
    title: "Navegación",
    navSubtitle: "Lagos y canales",
  },
  {
    category: "fauna",
    id: "fauna",
    title: "Fauna",
    navSubtitle: "Vida silvestre",
  },
  {
    category: "aventura",
    id: "aventura",
    title: "Aventura",
    navSubtitle: "Día completo",
  },
];

function excursionCountLabel(count: number) {
  return count === 1 ? "1 excursión" : `${count} excursiones`;
}

export function groupExcursionEntriesByCategory(
  entries: CatalogItemEntry[],
): CatalogSplitGroup[] {
  const grouped = EXCURSION_CATEGORY_NAV.map(({ category, id, title, navSubtitle }) => {
    const categoryEntries = entries.filter((entry) => entry.item.category === category);

    return {
      id,
      title,
      navSubtitle,
      panelSubtitle: excursionCountLabel(categoryEntries.length),
      meta: excursionCountLabel(categoryEntries.length),
      entries: categoryEntries,
    };
  }).filter((group) => group.entries.length > 0);

  const uncategorized = entries.filter((entry) => !entry.item.category);
  if (uncategorized.length > 0) {
    grouped.push({
      id: "otras",
      title: "Otras",
      navSubtitle: "Según temporada",
      panelSubtitle: excursionCountLabel(uncategorized.length),
      meta: excursionCountLabel(uncategorized.length),
      entries: uncategorized,
    });
  }

  return grouped;
}
