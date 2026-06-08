import { DestinationsIndexClient } from "@/components/catalog/DestinationsIndexClient";
import { getDestinationsByZone } from "@/lib/catalog/destination-zones";

export function DestinationsIndex() {
  const zones = getDestinationsByZone();

  return <DestinationsIndexClient zones={zones} />;
}
