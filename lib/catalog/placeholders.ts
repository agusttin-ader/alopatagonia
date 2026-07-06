import type {
  AccommodationType,
  CatalogImage,
  CatalogItem,
  DestinationCatalog,
} from "@/lib/catalog/types";
import { buildDestinationAccommodationItems } from "@/lib/catalog/accommodation-items";
import { BARILOCHE_HERO_IMAGE } from "@/lib/catalog/bariloche-curated";
import { getDestinationImagePaths } from "@/lib/catalog/destination-images";
import { getExcursionImageFoldersForSlug } from "@/lib/catalog/excursion-image-folders";
import {
  CATALOG_ACCOMMODATION_FOLDERS,
  CATALOG_EXCURSION_FOLDERS,
  CATALOG_NATURE_FOLDERS,
  pathIncludesFolder,
  pathMatchesAnyFolder,
  pathsInAnyFolder,
} from "@/lib/catalog/path-matching";

export const CATALOG_LIMITS = {
  itemsPerAccommodationType: 1,
  imagesPerCatalogItem: 6,
  imagesPerExcursion: 1,
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

import { EXCURSION_CONTENT_BY_DESTINATION } from "@/lib/catalog/excursion-content";

export function buildCatalogWhatsAppMessage(itemName: string, destinationName: string) {
  return `Me interesa ${itemName} en ${destinationName}. ¿Me ayudan?`;
}

function toCatalogImage(src: string, alt: string): CatalogImage {
  return { src, alt };
}

function withFallbackImages(paths: string[]): string[] {
  return paths.length > 0 ? paths : [CATALOG_PLACEHOLDER_IMAGE];
}

function defaultHighlights(type: AccommodationType, destinationName: string): string[] {
  if (type === "departamento") {
    return [
      `Ubicación en ${destinationName} según la unidad que elijas`,
      "Cocina y espacio para varios días sin depender del restaurante",
      "Buena opción para parejas o familias chicas",
      "Fechas y check-in los vemos por WhatsApp",
    ];
  }
  if (type === "cabana") {
    return [
      `Entorno natural en ${destinationName}`,
      "Más espacio y privacidad que un hotel",
      "Ideal si vas a cocinar o quedarte varios días",
      "Preguntanos capacidad, camas y qué incluye la estadía",
    ];
  }
  return [
    `Hotel en ${destinationName}, cerca de las salidas del día`,
    "Desayuno y servicios según categoría del establecimiento",
    "Disponibilidad según temporada — escribinos con tus fechas",
  ];
}

function accommodationDisplayName(type: AccommodationType, destinationName: string): string {
  if (type === "cabana") return `Cabaña en ${destinationName}`;
  if (type === "departamento") return `Departamento en ${destinationName}`;
  return `Hotel en ${destinationName}`;
}

function buildAccommodationItems(
  slugPrefix: string,
  type: AccommodationType,
  paths: string[],
  destinationName: string,
): CatalogItem[] {
  const label = ACCOMMODATION_LABELS[type];
  const group = withFallbackImages(paths).slice(0, CATALOG_LIMITS.imagesPerCatalogItem);
  const name = accommodationDisplayName(type, destinationName);

  return [
    {
      id: `${slugPrefix}-${type}-1`,
      itemSlug: ACCOMMODATION_ITEM_SLUGS[type],
      name,
      type,
      description: `${label} en ${destinationName} para quedarte varios días y salir a recorrer la zona.`,
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
  const excursionContent = EXCURSION_CONTENT_BY_DESTINATION[slug] ?? [];
  const itemCount =
    excursionContent.length > 0 ? excursionContent.length : CATALOG_LIMITS.maxExcursions;

  return pools.slice(0, itemCount).map((pool, index) => {
    const num = index + 1;
    const group = withFallbackImages(pool).slice(0, CATALOG_LIMITS.imagesPerExcursion);
    const content = excursionContent[index];
    const folderConfig = getExcursionImageFoldersForSlug(slug)[index];
    const name = content?.name ?? `Excursión en ${destinationName}`;
    const cover = group[0]!;
    const itemSlug = folderConfig?.folderSlug ?? `excursion-${num}`;

    return {
      id: `${slug}-${itemSlug}`,
      itemSlug,
      name,
      category: content?.category,
      description:
        content?.description ??
        `Excursión en ${destinationName}. Fechas y salidas según temporada.`,
      highlights: content?.highlights ?? [
        `Salidas desde ${destinationName} con guías locales`,
        "Horarios y cupos según temporada y clima",
        "Te pasamos qué llevar y cómo vestirte",
        "Reservá con tiempo en enero, febrero y julio",
      ],
      images: [toCatalogImage(cover, `${name} — foto principal`)],
    };
  });
}

export function pathsInSubfolder(imagePaths: string[], subfolder: string): string[] {
  return imagePaths.filter((path) => pathIncludesFolder(path, subfolder));
}

function splitAccommodationPools(imagePaths: string[]) {
  const per = CATALOG_LIMITS.imagesPerCatalogItem;
  const all = pathsInAnyFolder(imagePaths, CATALOG_ACCOMMODATION_FOLDERS);
  const cabana = all.filter((path) =>
    pathMatchesAnyFolder(path, ["cabanas", "cabana", "Bariloche cabañas"]),
  );
  const departamento = all.filter((path) =>
    pathMatchesAnyFolder(path, ["dptos", "departamento", "Bariloche dptos"]),
  );
  const hostel = all.filter((path) =>
    pathMatchesAnyFolder(path, ["hoteles", "hostel", "Bariloche Hoteles"]),
  );

  if (cabana.length || departamento.length || hostel.length) {
    return {
      cabana: (cabana.length ? cabana : all).slice(0, per),
      departamento: (departamento.length ? departamento : all).slice(0, per),
      hostel: (hostel.length ? hostel : all).slice(0, per),
    };
  }

  return {
    cabana: all.slice(0, per),
    departamento: all.slice(per, per * 2),
    hostel: all.slice(per * 2, per * 3),
  };
}

function buildExcursionImageGroups(slug: string, imagePaths: string[]) {
  const per = CATALOG_LIMITS.imagesPerExcursion;
  const folderConfigs = getExcursionImageFoldersForSlug(slug);

  if (folderConfigs.length > 0) {
    const namedGroups = folderConfigs.map(({ folderSlug, legacyFolders = [] }) => {
      const primary = pathsInSubfolder(imagePaths, folderSlug);
      if (primary.length > 0) return primary;

      for (const legacyFolder of legacyFolders) {
        const legacy = pathsInSubfolder(imagePaths, legacyFolder);
        if (legacy.length > 0) return legacy;
      }

      return [];
    });

    if (namedGroups.some((group) => group.length > 0)) {
      return namedGroups;
    }
  }

  const pool = pathsInAnyFolder(imagePaths, CATALOG_EXCURSION_FOLDERS);
  return [
    pool.slice(0, per),
    pool.slice(per, per * 2),
    pool.slice(per * 2, per * 3),
  ];
}

function pickCatalogHeroImage(
  imagePaths: string[],
  heroImage?: string,
): string {
  return (
    heroImage ??
    pathsInAnyFolder(imagePaths, CATALOG_NATURE_FOLDERS)[0] ??
    pathsInAnyFolder(imagePaths, CATALOG_ACCOMMODATION_FOLDERS)[0] ??
    imagePaths[0] ??
    CATALOG_PLACEHOLDER_IMAGE
  );
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

function buildDestinationAccommodations(
  slug: string,
  name: string,
  imagePaths: string[],
): CatalogItem[] {
  const fromFolders = buildDestinationAccommodationItems(slug, name);
  if (fromFolders.length > 0) return fromFolders;

  const accommodationPools = splitAccommodationPools(imagePaths);
  return buildStandardAccommodations(slug, name, accommodationPools);
}

export function buildFlatCatalog(config: {
  slug: string;
  name: string;
  region: string;
  intro: string;
  imagePaths: string[];
  heroImage?: string;
}): DestinationCatalog {
  const hero = pickCatalogHeroImage(config.imagePaths, config.heroImage);

  return {
    slug: config.slug,
    name: config.name,
    region: config.region,
    intro: config.intro,
    heroImage: hero,
    accommodations: buildDestinationAccommodations(
      config.slug,
      config.name,
      config.imagePaths,
    ),
    excursions: buildExcursions(
      config.slug,
      buildExcursionImageGroups(config.slug, config.imagePaths),
      config.name,
    ),
    carRental: {
      operatorName: "Operador local",
      description: `Auto en ${config.name} para recorrer rutas largas con libertad. Te pasamos el contacto del operador que usamos en la zona.`,
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
  heroImage?: string;
}): DestinationCatalog {
  const hero = pickCatalogHeroImage(config.imagePaths, config.heroImage);

  return {
    slug: config.slug,
    name: config.name,
    region: config.region,
    intro: config.intro,
    heroImage: hero,
    accommodations: buildDestinationAccommodations(
      config.slug,
      config.name,
      config.imagePaths,
    ),
    excursions: buildExcursions(
      config.slug,
      buildExcursionImageGroups(config.slug, config.imagePaths),
      config.name,
    ),
    carRental: {
      operatorName: "Operador local",
      description: `Auto en ${config.name} para recorrer rutas largas con libertad. Te pasamos el contacto del operador que usamos en la zona.`,
      images: [toCatalogImage(hero, `Auto en ${config.name}`)],
    },
    published: true,
  };
}

export function buildBarilocheCatalog(): DestinationCatalog {
  const all = getDestinationImagePaths("bariloche");

  return {
    slug: "bariloche",
    name: "Bariloche",
    region: "San Carlos de Bariloche · Río Negro",
    intro:
      "Capital del Nahuel Huapi: Circuito Chico, Cerro Catedral y navegaciones que salen desde Puerto Pañuelo.",
    heroImage: BARILOCHE_HERO_IMAGE,
    accommodations: buildDestinationAccommodations("bariloche", "Bariloche", all),
    excursions: buildExcursions(
      "bariloche",
      buildExcursionImageGroups("bariloche", all),
      "Bariloche",
    ),
    carRental: {
      operatorName: "Operador local",
      description:
        "Auto en Bariloche para Circuito Chico, Siete Lagos o ir a San Martín. Te pasamos el contacto del operador local.",
      images: [toCatalogImage(BARILOCHE_HERO_IMAGE, "Auto en Bariloche")],
    },
    published: true,
  };
}
