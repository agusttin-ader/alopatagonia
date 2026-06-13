import type { getTranslations } from "next-intl/server";

import {
  PLANNER_DESTINATIONS,
  type PlannerDestinationKey,
  type PlannerDestinationValue,
} from "@/lib/constants";

type Translator = Awaited<ReturnType<typeof getTranslations>>;

export function getLocalizedPlannerDestinationLabel(
  t: Translator,
  value: PlannerDestinationValue,
): string {
  if (value === "none") return t("destinations.none");
  return t(`destinations.${value}.label`);
}

export function getLocalizedPlannerDestinationHook(
  t: Translator,
  value: PlannerDestinationKey,
): string {
  return t(`destinations.${value}.hook`);
}

export function getLocalizedPlannerDestinationOptions(t: Translator) {
  return [
    { value: "none" as const, label: t("destinations.none") },
    ...PLANNER_DESTINATIONS.map((destination) => ({
      value: destination.key,
      label: t(`destinations.${destination.key}.label`),
    })),
  ];
}

export function buildLocalizedPlannerMessage(
  t: Translator,
  params: {
    name: string;
    destination: PlannerDestinationValue;
    travelers: string;
    fromDate: string;
    toDate: string;
    formatDate: (value: string) => string;
  },
) {
  const destinationText = getLocalizedPlannerDestinationLabel(t, params.destination);
  const people = params.travelers.trim();
  const peopleCount = Number(people);
  const groupLine =
    people && !Number.isNaN(peopleCount)
      ? peopleCount === 1
        ? t("message.groupOne")
        : t("message.groupMany", { count: people })
      : t("message.groupUnknown");

  return t("message.body", {
    name: params.name,
    destination: destinationText,
    group: groupLine,
    from: params.formatDate(params.fromDate),
    to: params.formatDate(params.toDate),
  });
}
