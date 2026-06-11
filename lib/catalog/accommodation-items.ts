import manifest from "@/lib/catalog/generated/destination-accommodations.json";
import type { AccommodationType, CatalogImage, CatalogItem } from "@/lib/catalog/types";

const FALLBACK_IMAGE = "/images/IMG_1506.jpeg";

type AccommodationManifestEntry = {
  name: string;
  itemSlug: string;
  type: AccommodationType;
  categoryFolder?: string;
  images: string[];
};

type DestinationAccommodationsManifest = Record<string, AccommodationManifestEntry[]>;

const MANIFEST = manifest as DestinationAccommodationsManifest;

function toCatalogImage(src: string, alt: string): CatalogImage {
  return { src, alt };
}

function defaultHighlights(type: AccommodationType, destinationName: string): string[] {
  if (type === "departamento") {
    return [
      `Ubicación en ${destinationName} según la unidad`,
      "Cocina y espacio para varios días de viaje",
      "Parejas o familias chicas",
      "Coordinamos fechas y check-in por WhatsApp",
    ];
  }
  if (type === "cabana") {
    return [
      `Entorno natural en ${destinationName}`,
      "Más espacio y privacidad que un hotel",
      "Buena base si vas a cocinar o quedarte una semana",
      "Consultanos capacidad y qué incluye",
    ];
  }
  return [
    `Hotel en ${destinationName}, cerca de las salidas del día`,
    "Servicios según categoría del establecimiento",
    "Disponibilidad según temporada",
  ];
}

function accommodationDescription(
  name: string,
  type: AccommodationType,
  destinationName: string,
): string {
  if (type === "cabana") {
    return `${name} — cabaña en ${destinationName} para instalarte varios días y salir a recorrer.`;
  }
  if (type === "departamento") {
    return `${name} — departamento en ${destinationName} con lo necesario para una estadía más larga.`;
  }
  return `${name} — hotel en ${destinationName} como base para tus salidas diarias.`;
}

export function getDestinationAccommodationEntries(
  destinationSlug: string,
): AccommodationManifestEntry[] {
  return MANIFEST[destinationSlug] ?? [];
}

export function buildDestinationAccommodationItems(
  destinationSlug: string,
  destinationName: string,
): CatalogItem[] {
  const entries = getDestinationAccommodationEntries(destinationSlug);
  const usedSlugs = new Set<string>();

  return entries.map((entry) => {
    let itemSlug = entry.itemSlug;
    if (usedSlugs.has(itemSlug)) {
      let suffix = 2;
      while (usedSlugs.has(`${itemSlug}-${suffix}`)) suffix += 1;
      itemSlug = `${itemSlug}-${suffix}`;
    }
    usedSlugs.add(itemSlug);

    const images = entry.images.length > 0 ? entry.images : [FALLBACK_IMAGE];
    const name = entry.name.trim();

    return {
      id: `${destinationSlug}-${itemSlug}`,
      itemSlug,
      name,
      type: entry.type,
      description: accommodationDescription(name, entry.type, destinationName),
      highlights: defaultHighlights(entry.type, destinationName),
      images: images.map((src, index) =>
        toCatalogImage(src, `${name} — foto ${index + 1}`),
      ),
    };
  });
}

export function getDestinationAccommodationCoverImages(destinationSlug: string): {
  cabana?: string;
  departamento?: string;
  hotel?: string;
} {
  const entries = getDestinationAccommodationEntries(destinationSlug);
  const cabana = entries.find((entry) => entry.type === "cabana")?.images[0];
  const departamento = entries.find((entry) => entry.type === "departamento")?.images[0];
  const hotel = entries.find((entry) => entry.type === "hostel")?.images[0];

  return { cabana, departamento, hotel };
}
