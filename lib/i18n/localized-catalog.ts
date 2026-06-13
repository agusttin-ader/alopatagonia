import type { getTranslations } from "next-intl/server";

import type { CatalogItemEntry } from "@/lib/catalog/catalog-items";
import type { CarRentalPartner, DestinationCatalog } from "@/lib/catalog/types";
import { getCarRentalI18n } from "@/lib/i18n/car-rental-i18n";

type Translator = Awaited<ReturnType<typeof getTranslations>>;

export function catalogDestinationCount(t: Translator, count: number) {
  return count === 1 ? t("counts.destinationOne") : t("counts.destinationMany", { count });
}

export function catalogAccommodationCount(t: Translator, count: number) {
  return count === 1 ? t("counts.accommodationOne") : t("counts.accommodationMany", { count });
}

export function catalogExcursionCount(t: Translator, count: number) {
  return count === 1 ? t("counts.excursionOne") : t("counts.excursionMany", { count });
}

export function getLocalizedCatalogItemBadge(t: Translator, entry: CatalogItemEntry): string {
  if (entry.kind === "excursion") return t("badges.excursion");
  if (entry.item.type === "cabana") return t("badges.cabana");
  if (entry.item.type === "departamento") return t("badges.departamento");
  return t("badges.hotel");
}

export function localizeCarRental(
  tDest: Translator,
  destination: DestinationCatalog,
  locale: string,
): CarRentalPartner {
  if (locale === "es") return destination.carRental;

  if (locale === "en" || locale === "pt") {
    const i18n = getCarRentalI18n(locale, destination.slug, destination.name);
    return {
      ...destination.carRental,
      operatorName: i18n.operatorName,
      description: i18n.description,
      images: destination.carRental.images?.map((image) => ({
        ...image,
        alt: i18n.imageAlt,
      })),
    };
  }

  const slugKey = `carRental.${destination.slug}.description`;
  const description = tDest.has(slugKey)
    ? tDest(slugKey)
    : tDest("carRental.defaultDescription", { destination: destination.name });

  return {
    ...destination.carRental,
    operatorName: tDest("carRental.operatorName"),
    description,
    images: destination.carRental.images?.map((image) => ({
      ...image,
      alt: tDest("carRental.imageAlt", { destination: destination.name }),
    })),
  };
}

export function getLocalizedAccommodationTypeNav(t: Translator) {
  return [
    {
      type: "cabana" as const,
      id: "cabana",
      title: t("accommodationTypes.cabana.title"),
      navSubtitle: t("accommodationTypes.cabana.subtitle"),
    },
    {
      type: "departamento" as const,
      id: "departamento",
      title: t("accommodationTypes.departamento.title"),
      navSubtitle: t("accommodationTypes.departamento.subtitle"),
    },
    {
      type: "hostel" as const,
      id: "hostel",
      title: t("accommodationTypes.hostel.title"),
      navSubtitle: t("accommodationTypes.hostel.subtitle"),
    },
  ];
}
