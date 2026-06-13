import type { getTranslations } from "next-intl/server";

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
