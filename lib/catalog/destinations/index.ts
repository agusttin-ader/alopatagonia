import { getDestinationImagePaths } from "@/lib/catalog/destination-images";
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
    intro: "Extremo del Camino de los Siete Lagos, con acceso al Parque Nacional Lanín y el Lácar.",
    folder: "san-martin",
    heroImage: SAN_MARTIN_HERO_IMAGE,
  },
  {
    slug: "el-chalten",
    name: "El Chaltén",
    region: "Santa Cruz · Capital del trekking",
    intro: "Capital nacional del trekking, al pie del Fitz Roy y senderos de alta montaña.",
    folder: "chalten",
  },
  {
    slug: "esquel",
    name: "Esquel / Trevelin",
    region: "Chubut · Patagonia andina",
    intro: "Al pie de los Andes: Parque Nacional Los Alerces, La Hoya y el Tren La Trochita.",
    folder: "esquel-trevelin ",
  },
  {
    slug: "villa-la-angostura",
    name: "Villa La Angostura",
    region: "Neuquén · Reserva Nacional",
    intro: "Aldea cordillerana en el Parque Nacional Nahuel Huapi, portal al Bosque de Arrayanes.",
    folder: "la-angostura",
    heroImage: LA_ANGOSTURA_HERO_IMAGE,
  },
  {
    slug: "puerto-madryn",
    name: "Puerto Madryn",
    region: "Chubut · Costa patagónica",
    intro: "Golfo Nuevo y Península Valdés: ballenas, pingüinos y costa atlántica patagónica.",
    folder: "madryn",
  },
] as const;

const structuredConfigs = [
  {
    slug: "el-calafate",
    name: "El Calafate",
    region: "Santa Cruz · Glaciar Perito Moreno",
    intro: "Puerta al Glaciar Perito Moreno y navegaciones por el Lago Argentino.",
    folder: "calafate",
  },
  {
    slug: "traful",
    name: "Traful / Villa Traful",
    region: "Neuquén · Lago Traful",
    intro: "Desvío del Camino de los Siete Lagos: lago Traful y bosque sumergido.",
    folder: "traful",
  },
  {
    slug: "ushuaia",
    name: "Ushuaia",
    region: "Tierra del Fuego · Fin del mundo",
    intro: "Canal Beagle, Parque Nacional Tierra del Fuego y la ciudad más austral del mundo.",
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
