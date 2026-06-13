import { getTranslations } from "next-intl/server";

import { HomeDestinationsClient } from "@/components/destinations/HomeDestinationsClient";
import { HOME_DESTINATION_EDITORIAL } from "@/lib/home-destinations";
import { localizeHomeDestinations } from "@/lib/i18n/localized-home";

export async function HomeDestinations() {
  const t = await getTranslations("homeDestinations");
  const destinations = localizeHomeDestinations(t, HOME_DESTINATION_EDITORIAL);

  return <HomeDestinationsClient destinations={destinations} />;
}
