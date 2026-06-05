import { getDestinationImagePaths } from "@/lib/catalog/destination-images";
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
    intro: "Bosque andino y rutas junto al lago.",
    folder: "san-martin",
  },
  {
    slug: "el-chalten",
    name: "El Chaltén",
    region: "Santa Cruz · Capital del trekking",
    intro: "Montaña, senderos y glaciares.",
    folder: "chalten",
  },
  {
    slug: "esquel",
    name: "Esquel / Trevelin",
    region: "Chubut · Patagonia andina",
    intro: "Estepa, bosque y Tren Patagónico.",
    folder: "esquel-trevelin ",
  },
  {
    slug: "villa-la-angostura",
    name: "Villa La Angostura",
    region: "Neuquén · Reserva Nacional",
    intro: "Pueblo chico y lagos cristalinos.",
    folder: "la-angostura",
  },
  {
    slug: "puerto-madryn",
    name: "Puerto Madryn",
    region: "Chubut · Costa patagónica",
    intro: "Mar patagónico y fauna.",
    folder: "madryn",
  },
] as const;

const structuredConfigs = [
  {
    slug: "el-calafate",
    name: "El Calafate",
    region: "Santa Cruz · Glaciar Perito Moreno",
    intro: "Glaciares, lagos turquesa y base para el sur austral.",
    folder: "calafate",
  },
  {
    slug: "traful",
    name: "Traful / Villa Traful",
    region: "Neuquén · Lago Traful",
    intro: "Bosque nativo, aguas claras y ritmo de pueblo.",
    folder: "traful",
  },
  {
    slug: "ushuaia",
    name: "Ushuaia",
    region: "Tierra del Fuego · Fin del mundo",
    intro: "Canal Beagle, montaña y naturaleza austral.",
    folder: "ushuaia",
  },
] as const;

const ALL_DESTINATIONS: DestinationCatalog[] = [
  buildBarilocheCatalog(),
  ...flatConfigs.map((config) =>
    buildFlatCatalog({
      slug: config.slug,
      name: config.name,
      region: config.region,
      intro: config.intro,
      imagePaths: getDestinationImagePaths(config.folder),
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
];

export function getAllDestinations(): DestinationCatalog[] {
  return ALL_DESTINATIONS;
}

export function getDestinationBySlug(slug: string): DestinationCatalog | undefined {
  return ALL_DESTINATIONS.find((destination) => destination.slug === slug);
}

export function getDestinationSlugs(): string[] {
  return ALL_DESTINATIONS.map((destination) => destination.slug);
}
