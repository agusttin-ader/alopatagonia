import { getAllDestinations } from "@/lib/catalog/destinations";
import type { DestinationCatalog } from "@/lib/catalog/types";

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
      "Lagos glaciares, bosque andino y la Ruta de los Siete Lagos entre Bariloche, Villa La Angostura, San Martín de los Andes y Villa Traful.",
    destinationSlugs: ["bariloche", "san-martin", "traful", "villa-la-angostura"],
  },
  {
    id: "santa-cruz",
    title: "Santa Cruz · glaciares y montaña",
    description:
      "El Calafate y El Chaltén están a 220 km: glaciares del Lago Argentino y trekking al Fitz Roy en la misma cordillera.",
    destinationSlugs: ["el-calafate", "el-chalten"],
  },
  {
    id: "tierra-del-fuego",
    title: "Tierra del Fuego",
    description:
      "Ushuaia, en el Canal Beagle y el Parque Nacional Tierra del Fuego. Suele combinarse con Calafate en vuelo, no en un día de ruta.",
    destinationSlugs: ["ushuaia"],
  },
  {
    id: "chubut",
    title: "Chubut · cordillera y costa",
    description:
      "Dos polos de la provincia, separados por cientos de kilómetros: la montaña de Esquel y Trevelin, y la fauna marina de Puerto Madryn.",
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
