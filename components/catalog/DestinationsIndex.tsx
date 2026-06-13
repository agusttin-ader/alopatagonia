import { getLocale, getTranslations } from "next-intl/server";

import { DestinationsIndexClient } from "@/components/catalog/DestinationsIndexClient";
import { getDestinationsByZone } from "@/lib/catalog/destination-zones";
import { localizeDestinationZones } from "@/lib/i18n/localized-destinations-page";

export async function DestinationsIndex() {
  const locale = await getLocale();
  const t = await getTranslations("destinationsPage");
  const tHome = await getTranslations("homeDestinations");
  const zones = localizeDestinationZones(t, tHome, locale, getDestinationsByZone());

  return <DestinationsIndexClient zones={zones} />;
}
