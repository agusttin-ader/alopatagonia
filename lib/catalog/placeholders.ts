import type {
  AccommodationType,
  CatalogImage,
  CatalogItem,
  DestinationCatalog,
} from "@/lib/catalog/types";
import {
  BARILOCHE_CURATED,
  BARILOCHE_HERO_IMAGE,
} from "@/lib/catalog/bariloche-curated";
import { getDestinationImagePaths } from "@/lib/catalog/destination-images";
import {
  pathIncludesFolder,
  pathMatchesAnyFolder,
} from "@/lib/catalog/path-matching";

export const CATALOG_LIMITS = {
  itemsPerAccommodationType: 1,
  imagesPerCatalogItem: 6,
  maxExcursions: 3,
} as const;

export const CATALOG_PLACEHOLDER_IMAGE = "/images/IMG_1506.jpeg";

const ACCOMMODATION_LABELS: Record<AccommodationType, string> = {
  cabana: "Cabaña",
  departamento: "Departamento",
  hostel: "Hotel",
};

const ACCOMMODATION_ITEM_SLUGS: Record<AccommodationType, string> = {
  cabana: "cabana-1",
  departamento: "depto-1",
  hostel: "hotel-1",
};

export function buildCatalogWhatsAppMessage(itemName: string, destinationName: string) {
  return `Hola! Me interesa ${itemName} en ${destinationName}. ¿Me ayudan?`;
}

export function buildCarRentalWhatsAppMessage(destinationName: string) {
  return `Hola! Quiero consultar por alquiler de auto en ${destinationName}. ¿Me ayudan?`;
}

function toCatalogImage(src: string, alt: string): CatalogImage {
  return { src, alt };
}

function withFallbackImages(paths: string[]): string[] {
  return paths.length > 0 ? paths : [CATALOG_PLACEHOLDER_IMAGE];
}

function defaultHighlights(type: AccommodationType, destinationName: string): string[] {
  const base = destinationName;
  if (type === "departamento") {
    return [
      `Ubicación céntrica o residencial en ${base}`,
      "Ideal para parejas o familias chicas",
      "Cocina equipada y espacio para descansar",
      "Coordinamos fechas y check-in por WhatsApp",
    ];
  }
  if (type === "cabana") {
    return [
      `Entorno natural cerca de ${base}`,
      "Más privacidad y espacio que un hotel",
      "Buena opción para varios días de estadía",
      "Consultá capacidad y servicios incluidos",
    ];
  }
  return [
    `Opción cómoda en ${base}`,
    "Servicios de hotel según categoría",
    "Buena base para salidas diarias",
    "Disponibilidad según temporada",
  ];
}

function accommodationDisplayName(type: AccommodationType): string {
  return `${ACCOMMODATION_LABELS[type]} 1`;
}

function buildAccommodationItems(
  slugPrefix: string,
  type: AccommodationType,
  paths: string[],
  destinationName: string,
): CatalogItem[] {
  const label = ACCOMMODATION_LABELS[type];
  const group = withFallbackImages(paths).slice(0, CATALOG_LIMITS.imagesPerCatalogItem);
  const name = accommodationDisplayName(type);

  return [
    {
      id: `${slugPrefix}-${type}-1`,
      itemSlug: ACCOMMODATION_ITEM_SLUGS[type],
      name,
      type,
      description: `Opción de ${label.toLowerCase()} en ${destinationName}. Mirá las fotos y consultá disponibilidad.`,
      highlights: defaultHighlights(type, destinationName),
      images: group.map((src, i) => toCatalogImage(src, `${name} — foto ${i + 1}`)),
    },
  ];
}

function buildExcursions(
  slug: string,
  pools: string[][],
  destinationName: string,
): CatalogItem[] {
  return pools.slice(0, CATALOG_LIMITS.maxExcursions).map((pool, index) => {
    const num = index + 1;
    const group = withFallbackImages(pool).slice(0, CATALOG_LIMITS.imagesPerCatalogItem);
    const name = `Excursión ${num}`;

    return {
      id: `${slug}-excursion-${num}`,
      itemSlug: `excursion-${num}`,
      name,
      description: `Excursión en ${destinationName}. Duración y salidas según temporada.`,
      highlights: [
        `Salidas desde ${destinationName}`,
        "Grupos reducidos o salida privada según opción",
        "Incluye coordinación y recomendaciones locales",
        "Reservá con anticipación en temporada alta",
      ],
      images: group.map((src, i) => toCatalogImage(src, `${name} — foto ${i + 1}`)),
    };
  });
}

export function pathsInSubfolder(imagePaths: string[], subfolder: string): string[] {
  return imagePaths.filter((path) => pathIncludesFolder(path, subfolder));
}

export function buildStandardAccommodations(
  slug: string,
  name: string,
  pools: { cabana: string[]; departamento: string[]; hostel: string[] },
): CatalogItem[] {
  const per = CATALOG_LIMITS.imagesPerCatalogItem;
  return [
    ...buildAccommodationItems(slug, "cabana", pools.cabana.slice(0, per), name),
    ...buildAccommodationItems(slug, "departamento", pools.departamento.slice(0, per), name),
    ...buildAccommodationItems(slug, "hostel", pools.hostel.slice(0, per), name),
  ];
}

export function buildFlatCatalog(config: {
  slug: string;
  name: string;
  region: string;
  intro: string;
  imagePaths: string[];
}): DestinationCatalog {
  const per = CATALOG_LIMITS.imagesPerCatalogItem;
  const hero = config.imagePaths[0] ?? CATALOG_PLACEHOLDER_IMAGE;
  return {
    slug: config.slug,
    name: config.name,
    region: config.region,
    intro: config.intro,
    heroImage: hero,
    accommodations: buildStandardAccommodations(config.slug, config.name, {
      cabana: config.imagePaths.slice(0, per),
      departamento: config.imagePaths.slice(per, per * 2),
      hostel: config.imagePaths.slice(per * 2, per * 3),
    }),
    excursions: buildExcursions(
      config.slug,
      [
        config.imagePaths.slice(per * 3, per * 4),
        config.imagePaths.slice(per * 4, per * 5),
        config.imagePaths.slice(per * 5, per * 6),
      ],
      config.name,
    ),
    carRental: {
      operatorName: "Operador local",
      description: `Alquiler de auto en ${config.name} con operador local.`,
      images: [toCatalogImage(hero, `Auto en ${config.name}`)],
    },
    published: true,
  };
}

export function buildStructuredCatalog(config: {
  slug: string;
  name: string;
  region: string;
  intro: string;
  imagePaths: string[];
}): DestinationCatalog {
  const paths = config.imagePaths;
  const hero =
    paths[0] ??
    pathsInSubfolder(paths, "hoteles")[0] ??
    pathsInSubfolder(paths, "cabanas")[0] ??
    CATALOG_PLACEHOLDER_IMAGE;

  return {
    slug: config.slug,
    name: config.name,
    region: config.region,
    intro: config.intro,
    heroImage: hero,
    accommodations: buildStandardAccommodations(config.slug, config.name, {
      cabana: pathsInSubfolder(paths, "cabanas"),
      departamento: pathsInSubfolder(paths, "dptos"),
      hostel: pathsInSubfolder(paths, "hoteles"),
    }),
    excursions: buildExcursions(
      config.slug,
      [
        pathsInSubfolder(paths, "excursion-1"),
        pathsInSubfolder(paths, "excursion-2"),
        pathsInSubfolder(paths, "excursion-3"),
      ],
      config.name,
    ),
    carRental: {
      operatorName: "Operador local",
      description: `Alquiler de auto en ${config.name} con operador local.`,
      images: [toCatalogImage(hero, `Auto en ${config.name}`)],
    },
    published: true,
  };
}

export function buildBarilocheCatalog(): DestinationCatalog {
  const { cabana, departamento, hotel3, hotel4 } = BARILOCHE_CURATED;
  const all = getDestinationImagePaths("bariloche");
  const per = CATALOG_LIMITS.imagesPerCatalogItem;

  const cabanaPaths = all.filter((src) =>
    pathMatchesAnyFolder(src, ["Bariloche cabañas", "cabanas"]),
  );
  const deptoPaths = all.filter((src) =>
    pathMatchesAnyFolder(src, ["Bariloche dptos", "dptos"]),
  );
  const hotelPaths = all.filter((src) =>
    pathMatchesAnyFolder(src, ["Bariloche Hoteles", "hoteles"]),
  );
  const excursionPool = all.filter(
    (src) =>
      !src.includes("bari1") &&
      !src.includes("bari2") &&
      !src.includes("bari3") &&
      !src.includes("bari4") &&
      !cabanaPaths.includes(src) &&
      !deptoPaths.includes(src) &&
      !hotelPaths.includes(src),
  );

  return {
    slug: "bariloche",
    name: "Bariloche",
    region: "San Carlos de Bariloche · Río Negro",
    intro:
      "Lagos, bosques y circuitos en auto. Coordinamos cabañas, departamentos y hoteles.",
    heroImage: BARILOCHE_HERO_IMAGE,
    accommodations: buildStandardAccommodations("bariloche", "Bariloche", {
      cabana: cabanaPaths.length > 0 ? cabanaPaths.slice(0, per) : [cabana],
      departamento: deptoPaths.length > 0 ? deptoPaths.slice(0, per) : [departamento],
      hostel: hotelPaths.length > 0 ? hotelPaths.slice(0, per) : [hotel3, hotel4],
    }),
    excursions: buildExcursions(
      "bariloche",
      [
        excursionPool.slice(0, per),
        excursionPool.slice(per, per * 2),
        excursionPool.slice(per * 2, per * 3),
      ],
      "Bariloche",
    ),
    carRental: {
      operatorName: "Operador local",
      description: "Alquiler de auto en Bariloche con operador local.",
      images: [toCatalogImage(BARILOCHE_HERO_IMAGE, "Auto en Bariloche")],
    },
    published: true,
  };
}
