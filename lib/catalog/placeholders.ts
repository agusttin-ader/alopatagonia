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
import { listDestinationWebImages } from "@/lib/catalog/server/image-paths";

export const CATALOG_LIMITS = {
  itemsPerAccommodationType: 1,
  imagesPerCatalogItem: 3,
  maxExcursions: 1,
} as const;

const LABELS: Record<AccommodationType, string> = {
  cabana: "Cabaña",
  departamento: "Departamento",
  hostel: "Hostel",
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

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

function buildAccommodationItems(
  slugPrefix: string,
  type: AccommodationType,
  paths: string[],
  destinationName: string,
): CatalogItem[] {
  const label = LABELS[type];
  return chunk(paths, CATALOG_LIMITS.imagesPerCatalogItem)
    .slice(0, CATALOG_LIMITS.itemsPerAccommodationType)
    .map((group, index) => {
      const name = `${label} ${index + 1}`;
      return {
        id: `${slugPrefix}-${type}-${index + 1}`,
        name,
        type,
        description: `Opción de alojamiento en ${destinationName}. Consultá disponibilidad por WhatsApp.`,
        images: group.map((src, i) =>
          toCatalogImage(src, `${name} — foto ${i + 1}`),
        ),
      };
    });
}

function buildExcursions(slug: string, paths: string[], destinationName: string): CatalogItem[] {
  return chunk(paths, CATALOG_LIMITS.imagesPerCatalogItem)
    .slice(0, CATALOG_LIMITS.maxExcursions)
    .map((group, index) => {
      const name = `Excursión ${index + 1}`;
      return {
        id: `${slug}-excursion-${index + 1}`,
        name,
        description: `Excursión en ${destinationName}. Coordinamos según temporada.`,
        images: group.map((src, i) => toCatalogImage(src, `${name} — foto ${i + 1}`)),
      };
    });
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
  const hero = config.imagePaths[0] ?? "/images/IMG_1506.jpeg";
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
      config.imagePaths.slice(per * 3, per * 4),
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
  const all = listDestinationWebImages("bariloche");
  const excursionPool = all.filter(
    (src) =>
      !src.includes("bari1") &&
      !src.includes("bari2") &&
      !src.includes("bari3") &&
      !src.includes("bari4"),
  );

  return {
    slug: "bariloche",
    name: "Bariloche",
    region: "San Carlos de Bariloche · Río Negro",
    intro:
      "Lagos, bosques y circuitos en auto. Coordinamos cabañas, departamentos y hostels.",
    heroImage: BARILOCHE_HERO_IMAGE,
    accommodations: buildStandardAccommodations("bariloche", "Bariloche", {
      cabana: [cabana],
      departamento: [departamento],
      hostel: [hotel3, hotel4],
    }),
    excursions: buildExcursions("bariloche", excursionPool, "Bariloche"),
    carRental: {
      operatorName: "Operador local",
      description: "Alquiler de auto en Bariloche con operador local.",
      images: [toCatalogImage(BARILOCHE_HERO_IMAGE, "Auto en Bariloche")],
    },
    published: true,
  };
}
