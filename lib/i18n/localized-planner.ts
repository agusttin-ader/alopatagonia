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
    userNote?: string;
  },
) {
  const destinationText = getLocalizedPlannerDestinationLabel(t, params.destination);
  const people = params.travelers.trim();
  const peopleCount = Number(people);
  const isSingleTraveler =
    people.length > 0 && !Number.isNaN(peopleCount) && peopleCount === 1;
  const groupLine =
    people && !Number.isNaN(peopleCount)
      ? isSingleTraveler
        ? t("message.groupOne")
        : t("message.groupMany", { count: people })
      : t("message.groupUnknown");

  const help = isSingleTraveler ? t("message.helpSingular") : t("message.helpPlural");
  const messageParams = {
    name: params.name,
    destination: destinationText,
    group: groupLine,
    from: params.formatDate(params.fromDate),
    to: params.formatDate(params.toDate),
    help,
  };

  const note = params.userNote?.trim();
  const templateKey = note
    ? isSingleTraveler
      ? "message.bodyWithNoteSingular"
      : "message.bodyWithNote"
    : isSingleTraveler
      ? "message.bodySingular"
      : "message.body";

  return t(templateKey, note ? { ...messageParams, note } : messageParams);
}
