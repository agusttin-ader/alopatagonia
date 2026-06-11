import { getDestinationImagePaths } from "@/lib/catalog/destination-images";
import { sortByDestinationSlugOrder } from "@/lib/catalog/destination-order";
import { LA_ANGOSTURA_HERO_IMAGE } from "@/lib/catalog/la-angostura-curated";
import { SAN_MARTIN_HERO_IMAGE } from "@/lib/catalog/san-martin-curated";
import {
  buildBarilocheCatalog,
  buildFlatCatalog,
  buildStructuredCatalog,
} from "@/lib/catalog/placeholders";
import type { DestinationCatalog } from "@/lib/catalog/types";

const flatConfigs = [
  {
    slug: "san-martin",
    name: "San Martín de los Andes",
    region: "Neuquén · Lago Lácar",
    intro: "Extremo norte del Corredor de los Lagos: San Martín mira al Lácar y al Lanín, con la Ruta de los Siete Lagos a un par de horas en auto.",
    folder: "san-martin",
    heroImage: SAN_MARTIN_HERO_IMAGE,
  },
  {
    slug: "el-chalten",
    name: "El Chaltén",
    region: "Santa Cruz · Capital del trekking",
    intro: "Capital nacional del trekking argentino: senderos al Fitz Roy y al Torre salen del mismo pueblo. El clima manda — y nosotros ajustamos el plan.",
    folder: "chalten",
  },
  {
    slug: "esquel",
    name: "Esquel / Trevelin",
    region: "Chubut · Patagonia andina",
    intro: "Cordillera y estepa en el sur de Chubut: Los Alerces (Patrimonio UNESCO), La Hoya en invierno y la colonia galesa de Trevelin.",
    folder: "esquel-trevelin ",
  },
  {
    slug: "villa-la-angostura",
    name: "Villa La Angostura",
    region: "Neuquén · Reserva Nacional",
    intro: "Entre Bariloche y San Martín, sobre el Nahuel Huapi: pueblo chico, Bosque de Arrayanes y ritmo más lento que el resto del corredor.",
    folder: "la-angostura",
    heroImage: LA_ANGOSTURA_HERO_IMAGE,
  },
  {
    slug: "puerto-madryn",
    name: "Puerto Madryn",
    region: "Chubut · Costa patagónica",
    intro: "Golfo Nuevo y Península Valdés: ballenas franca austral, elefantes marinos y pingüinos según la época del año.",
    folder: "madryn",
  },
] as const;

const structuredConfigs = [
  {
    slug: "el-calafate",
    name: "El Calafate",
    region: "Santa Cruz · Glaciar Perito Moreno",
    intro: "Puerta al Perito Moreno y al Lago Argentino; a 220 km está El Chaltén si querés sumar montaña a los glaciares.",
    folder: "calafate",
  },
  {
    slug: "traful",
    name: "Traful / Villa Traful",
    region: "Neuquén · Lago Traful",
    intro: "Desvío del Camino de los Siete Lagos: agua turquesa, bosque sumergido y mucho menos movimiento que Bariloche.",
    folder: "traful",
  },
  {
    slug: "ushuaia",
    name: "Ushuaia",
    region: "Tierra del Fuego · Fin del mundo",
    intro: "Canal Beagle, bosque fueguino y la ciudad más austral del mundo. Viento, frío real y navegaciones que valen cada minuto.",
    folder: "ushuaia",
  },
] as const;

const ALL_DESTINATIONS: DestinationCatalog[] = sortByDestinationSlugOrder([
  buildBarilocheCatalog(),
  ...flatConfigs.map((config) =>
    buildFlatCatalog({
      slug: config.slug,
      name: config.name,
      region: config.region,
      intro: config.intro,
      imagePaths: getDestinationImagePaths(config.folder),
      heroImage: "heroImage" in config ? config.heroImage : undefined,
    }),
  ),
  ...structuredConfigs.map((config) =>
    buildStructuredCatalog({
      slug: config.slug,
      name: config.name,
      region: config.region,
      intro: config.intro,
      imagePaths: getDestinationImagePaths(config.folder),
    }),
  ),
]);

export function getAllDestinations(): DestinationCatalog[] {
  return ALL_DESTINATIONS;
}

export function getDestinationBySlug(slug: string): DestinationCatalog | undefined {
  return ALL_DESTINATIONS.find((destination) => destination.slug === slug);
}

export function getDestinationSlugs(): string[] {
  return ALL_DESTINATIONS.map((destination) => destination.slug);
}
