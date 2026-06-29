import type { getTranslations } from "next-intl/server";

import { getExcursionContentForItem } from "@/lib/catalog/excursion-content";
import type { CatalogItem } from "@/lib/catalog/types";

type Translator = Awaited<ReturnType<typeof getTranslations>>;

function getLocalizedExcursionCopy(
  t: Translator,
  locale: string,
  destinationSlug: string,
  itemSlug: string,
) {
  if (locale === "es") {
    const content = getExcursionContentForItem(destinationSlug, itemSlug);
    if (!content) return undefined;
    return {
      name: content.name,
      description: content.description,
      highlights: [...content.highlights],
    };
  }

  const key = `items.${destinationSlug}.${itemSlug}`;
  if (!t.has(`${key}.description`)) return undefined;

  return {
    name: t.has(`${key}.name`) ? t(`${key}.name`) : undefined,
    description: t(`${key}.description`),
    highlights: t.raw(`${key}.highlights`) as string[],
  };
}

export function localizeExcursionItem(
  t: Translator,
  locale: string,
  destinationSlug: string,
  destinationName: string,
  item: CatalogItem,
): CatalogItem {
  const localized = getLocalizedExcursionCopy(t, locale, destinationSlug, item.itemSlug);

  const name = localized?.name ?? item.name;
  const description =
    localized?.description ??
    t("fallback.description", { destination: destinationName });
  const fallbackHighlights = t.raw("fallback.highlights");
  const highlights =
    localized?.highlights ??
    (Array.isArray(fallbackHighlights)
      ? (fallbackHighlights as string[]).map((line) =>
          line.replace("{destination}", destinationName),
        )
      : []);

  return {
    ...item,
    name,
    description,
    highlights: [...highlights],
    images: item.images.map((image, index) => ({
      ...image,
      alt: t("photoAlt", { name, n: index + 1 }),
    })),
  };
}
