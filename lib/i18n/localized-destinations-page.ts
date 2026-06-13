import type { getTranslations } from "next-intl/server";

import type { ClientDestinationPageCopy, ClientDestinationZoneCopy, ClientFaqItem } from "@/lib/client-protected-copy";
import {
  CLIENT_DESTINATIONS_INDEX_FAQ_COPY,
  getClientDestinationPageCopy,
  getClientDestinationZoneCopy,
} from "@/lib/client-protected-copy";
import type { DestinationCatalog } from "@/lib/catalog/types";
import type { DestinationZoneGroup } from "@/lib/catalog/destination-zones";

type Translator = Awaited<ReturnType<typeof getTranslations>>;

export function getLocalizedDestinationPageCopy(
  t: Translator,
  locale: string,
  slug: string,
): ClientDestinationPageCopy | undefined {
  const clientCopy = getClientDestinationPageCopy(slug);
  if (locale === "es" && clientCopy) return clientCopy;

  const key = `pages.${slug}`;
  if (!t.has(`${key}.title`)) return clientCopy;

  return {
    title: t(`${key}.title`),
    paragraphs: t.raw(`${key}.paragraphs`) as string[],
  };
}

export function getLocalizedDestinationZoneCopy(
  t: Translator,
  locale: string,
  zoneId: string,
): ClientDestinationZoneCopy | undefined {
  const clientCopy = getClientDestinationZoneCopy(zoneId);
  if (locale === "es" && clientCopy) return clientCopy;

  const key = `zones.${zoneId}`;
  if (!t.has(`${key}.title`)) return clientCopy;

  return {
    title: t(`${key}.title`),
    paragraphs: t.raw(`${key}.paragraphs`) as string[],
  };
}

export function getLocalizedDestinationsIndexFaq(
  t: Translator,
  locale: string,
): ClientFaqItem[] {
  if (locale === "es") return [...CLIENT_DESTINATIONS_INDEX_FAQ_COPY];

  const items = t.raw("faq") as ClientFaqItem[];
  return items;
}

export function localizeDestinationCatalog(
  tHome: Translator,
  destination: DestinationCatalog,
): DestinationCatalog {
  const slug = destination.slug;
  const nameKey = `destinations.${slug}.name`;
  const regionKey = `destinations.${slug}.region`;
  const introKey = `destinations.${slug}.description`;

  return {
    ...destination,
    name: tHome.has(nameKey) ? tHome(nameKey) : destination.name,
    region: tHome.has(regionKey) ? tHome(regionKey) : destination.region,
    intro: tHome.has(introKey) ? tHome(introKey) : destination.intro,
  };
}

export function localizeDestinationZones(
  t: Translator,
  tHome: Translator,
  locale: string,
  zones: DestinationZoneGroup[],
): DestinationZoneGroup[] {
  return zones.map((zone) => {
    const clientZoneCopy = getLocalizedDestinationZoneCopy(t, locale, zone.id);
    const localizedDestinations = zone.destinations.map((destination) =>
      localizeDestinationCatalog(tHome, destination),
    );

    return {
      ...zone,
      title: clientZoneCopy?.title ?? zone.title,
      description: clientZoneCopy?.paragraphs.join(" ") ?? zone.description,
      paragraphs: clientZoneCopy?.paragraphs ?? [zone.description],
      destinations: localizedDestinations,
    };
  });
}
