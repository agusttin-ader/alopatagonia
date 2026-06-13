import type { getTranslations } from "next-intl/server";

import { getClientAccommodationCopy } from "@/lib/client-protected-copy";
import type { CatalogItem } from "@/lib/catalog/types";
import type { AccommodationType } from "@/lib/catalog/types";

type Translator = Awaited<ReturnType<typeof getTranslations>>;

function getLocalizedClientCopy(
  t: Translator,
  locale: string,
  destinationSlug: string,
  itemSlug: string,
) {
  if (locale === "es") {
    return getClientAccommodationCopy(destinationSlug, itemSlug);
  }

  const key = `items.${destinationSlug}.${itemSlug}`;
  if (!t.has(`${key}.description`)) return undefined;

  return {
    name: t.has(`${key}.name`) ? t(`${key}.name`) : undefined,
    description: t(`${key}.description`),
    highlights: t.raw(`${key}.highlights`) as string[],
  };
}

export function localizeAccommodationItem(
  t: Translator,
  locale: string,
  destinationSlug: string,
  destinationName: string,
  item: CatalogItem,
): CatalogItem {
  const clientCopy = getLocalizedClientCopy(t, locale, destinationSlug, item.itemSlug);

  const name = clientCopy?.name ?? item.name;
  const description =
    clientCopy?.description ??
    t(`fallback.${item.type as AccommodationType}.description`, { name, destination: destinationName });
  const fallbackHighlights = t.raw(`fallback.${item.type as AccommodationType}.highlights`);
  const highlights =
    clientCopy?.highlights ??
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
