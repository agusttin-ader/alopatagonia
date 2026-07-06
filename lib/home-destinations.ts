import { BARILOCHE_HERO_IMAGE } from "@/lib/catalog/bariloche-curated";
import { getDestinationImagePaths } from "@/lib/catalog/destination-images";
import { pathIncludesFolder } from "@/lib/catalog/path-matching";
import { sortByDestinationSlugOrder } from "@/lib/catalog/destination-order";
import type { HomeDestinationEditorial } from "@/lib/home-destinations-types";

export type { HomeDestinationEditorial } from "@/lib/home-destinations-types";

const DESTINATION_META = [
  {
    slug: "bariloche",
    folder: "bariloche",
    name: "Bariloche",
    region: "San Carlos de Bariloche · Río Negro",
    description:
      "Lagos, bosque andino y el Nahuel Huapi. La base más elegida para arrancar un viaje por el sur.",
    fallback: BARILOCHE_HERO_IMAGE,
  },
  {
    slug: "san-martin",
    folder: "san-martin",
    name: "San Martín de los Andes",
    region: "Neuquén · Lago Lácar",
    description:
      "Más tranquilo que Bariloche: Lácar, Lanín y la Ruta de los Siete Lagos a mano.",
    fallback: "/images/destinations/san-martin/alojamientos/Screenshot_20251106_191521_Instagram.jpg",
  },
  {
    slug: "traful",
    folder: "traful",
    name: "Traful / Villa Traful",
    region: "Neuquén · Lago Traful",
    description:
      "Lago Traful turquesa, bosque sumergido y pueblo chico sin el ritmo de Bariloche.",
    fallback: "/images/IMG_1506.jpeg",
  },
  {
    slug: "villa-la-angostura",
    folder: "la-angostura",
    name: "Villa La Angostura",
    region: "Neuquén · Reserva Nacional",
    description:
      "Arrayanes, bahías del Nahuel Huapi y calles de pueblo. Para bajar un cambio.",
    fallback: "/images/destinations/la-angostura/alojamientos/IMG_20240117_155008_248.jpg",
  },
  {
    slug: "esquel",
    folder: "esquel-trevelin ",
    name: "Esquel / Trevelin",
    region: "Chubut · Patagonia andina",
    description:
      "Los Alerces (Patrimonio UNESCO), La Hoya en invierno y Trevelin gales a pocos kilómetros.",
    fallback: "/images/destinations/esquel-trevelin /alojamientos/IMG_20231023_203417_099.jpg",
  },
  {
    slug: "puerto-madryn",
    folder: "madryn",
    name: "Puerto Madryn",
    region: "Chubut · Costa patagónica",
    description:
      "Ballenas, pingüinos y Península Valdés — cada mes tiene su fauna protagonista.",
    fallback: "/images/destinations/madryn/alojamientos/IMG-20260525-WA0122.jpg",
  },
  {
    slug: "el-calafate",
    folder: "calafate",
    name: "El Calafate",
    region: "Santa Cruz · Glaciar Perito Moreno",
    description:
      "Perito Moreno, Lago Argentino y conexión en auto con El Chaltén (220 km).",
    fallback: "/images/IMG_1506.jpeg",
  },
  {
    slug: "el-chalten",
    folder: "chalten",
    name: "El Chaltén",
    region: "Santa Cruz · Capital del trekking",
    description:
      "Trekking al Fitz Roy desde el pueblo. Si el clima cierra un sendero, buscamos otro plan.",
    fallback: "/images/destinations/chalten/alojamientos/IMG-20260525-WA0136.jpg",
  },
  {
    slug: "ushuaia",
    folder: "ushuaia",
    name: "Ushuaia",
    region: "Tierra del Fuego · Fin del mundo",
    description:
      "Canal Beagle, Parque Nacional Tierra del Fuego y el sur más austral.",
    fallback: "/images/IMG_1506.jpeg",
  },
] as const;

/** Fotos de paisaje en la sección Destinos del home (4 por destino). */
export const HOME_DESTINATION_GALLERY_DESKTOP_COUNT = 4;

function buildPaisajeGalleryImages(
  folder: string,
  name: string,
  fallback: string,
): { src: string; alt: string }[] {
  const paths = getDestinationImagePaths(folder)
    .filter((path) => pathIncludesFolder(path, "paisajes"))
    .slice(0, HOME_DESTINATION_GALLERY_DESKTOP_COUNT);

  const picked = (paths.length > 0 ? paths : [fallback]).map((src, index) => ({
    src,
    alt: `${name} — paisaje ${index + 1}`,
  }));

  while (picked.length < HOME_DESTINATION_GALLERY_DESKTOP_COUNT) {
    const src = picked[picked.length - 1]?.src ?? fallback;
    picked.push({ src, alt: `${name} — paisaje ${picked.length + 1}` });
  }

  return picked;
}

/** Destinos con catálogo en `/destinos/[slug]` — datos para la sección editorial en home. */
export const HOME_DESTINATION_EDITORIAL: HomeDestinationEditorial[] = sortByDestinationSlugOrder(
  DESTINATION_META.map((meta) => ({
    slug: meta.slug,
    name: meta.name,
    region: meta.region,
    description: meta.description,
    galleryImages: buildPaisajeGalleryImages(meta.folder, meta.name, meta.fallback),
  })),
);
