import { HomeDestinationsClient } from "@/components/destinations/HomeDestinationsClient";
import { HOME_DESTINATION_EDITORIAL } from "@/lib/home-destinations";

export function HomeDestinations() {
  return <HomeDestinationsClient destinations={HOME_DESTINATION_EDITORIAL} />;
}
