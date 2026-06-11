import { getAllDestinations } from "@/lib/catalog/destinations";
import type { DestinationCatalog } from "@/lib/catalog/types";
import { CLIENT_DESTINATION_ZONES_COPY } from "@/lib/client-protected-copy";

export type DestinationZone = {
  id: string;
  title: string;
  description: string;
  destinationSlugs: string[];
};

/**
 * Corredores turísticos verificados con fuentes oficiales:
 * - Corredor de los Lagos: patagonia.gob.ar/circuitos/corredor-de-los-lagos, turismo.neuquen.gob.ar/siete-lagos
 * - El Calafate + El Chaltén: ~220 km, Santa Cruz (masrutaxfavor.com, turismo Santa Cruz)
 * - Ushuaia: Tierra del Fuego, circuito aéreo habitual con Calafate (~880 km por tierra)
 * - Chubut cordillera/costa: turismo provincial (Esquel/La Hoya/Los Alerces + Madryn/Península Valdés)
 */
export const DESTINATION_ZONES: DestinationZone[] = [
  {
    id: "corredor-lagos",
    title: "Corredor de los Lagos",
    description:
      "Lagos glaciares, bosque andino y la Ruta de los Siete Lagos: Bariloche, Villa La Angostura, San Martín y Traful en un mismo corredor.",
    destinationSlugs: ["bariloche", "san-martin", "traful", "villa-la-angostura"],
  },
  {
    id: "santa-cruz",
    title: CLIENT_DESTINATION_ZONES_COPY["santa-cruz"].title,
    description: CLIENT_DESTINATION_ZONES_COPY["santa-cruz"].paragraphs.join(" "),
    destinationSlugs: ["el-calafate", "el-chalten"],
  },
  {
    id: "tierra-del-fuego",
    title: CLIENT_DESTINATION_ZONES_COPY["tierra-del-fuego"].title,
    description: CLIENT_DESTINATION_ZONES_COPY["tierra-del-fuego"].paragraphs.join(" "),
    destinationSlugs: ["ushuaia"],
  },
  {
    id: "chubut",
    title: CLIENT_DESTINATION_ZONES_COPY.chubut.title,
    description: CLIENT_DESTINATION_ZONES_COPY.chubut.paragraphs.join(" "),
    destinationSlugs: ["esquel", "puerto-madryn"],
  },
];

export type DestinationZoneGroup = DestinationZone & {
  destinations: DestinationCatalog[];
};

export function getDestinationsByZone(): DestinationZoneGroup[] {
  const bySlug = new Map(getAllDestinations().map((destination) => [destination.slug, destination]));

  return DESTINATION_ZONES.map((zone) => ({
    ...zone,
    destinations: zone.destinationSlugs
      .map((slug) => bySlug.get(slug))
      .filter((destination): destination is DestinationCatalog => destination !== undefined),
  })).filter((zone) => zone.destinations.length > 0);
}
