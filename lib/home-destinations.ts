import { BARILOCHE_EDITORIAL_IMAGES } from "@/lib/catalog/bariloche-curated";
import { getDestinationImagePaths } from "@/lib/catalog/destination-images";
import type { HomeDestinationEditorial } from "@/lib/home-destinations-types";

export type { HomeDestinationEditorial } from "@/lib/home-destinations-types";

const DESTINATION_META = [
  {
    slug: "bariloche",
    folder: "bariloche",
    name: "Bariloche",
    region: "San Carlos de Bariloche · Río Negro",
    description:
      "Bosques, lagos y circuitos. Base ideal para combinar montaña y ruta en auto.",
    fallback: BARILOCHE_EDITORIAL_IMAGES[0],
    curatedGallery: BARILOCHE_EDITORIAL_IMAGES,
  },
  {
    slug: "san-martin",
    folder: "san-martin",
    name: "San Martín de los Andes",
    region: "Neuquén · Lago Lácar",
    description:
      "Bosque andino y rutas junto al lago. Relax, caminatas y ruta escénica.",
    fallback: "/images/destinations/san-martin/Screenshot_20251106_191521_Instagram.jpg",
  },
  {
    slug: "el-chalten",
    folder: "chalten",
    name: "El Chaltén",
    region: "Santa Cruz · Capital del trekking",
    description:
      "Montaña, senderos y glaciares. Ajustamos el plan según la ventana del día.",
    fallback: "/images/destinations/chalten/IMG-20260525-WA0136.jpg",
  },
  {
    slug: "esquel",
    folder: "esquel-trevelin ",
    name: "Esquel / Trevelin",
    region: "Chubut · Patagonia andina",
    description:
      "Estepa, bosque y el Tren Patagónico. Cordillera y paisajes auténticos del sur.",
    fallback: "/images/destinations/esquel-trevelin /IMG_20231023_203417_099.jpg",
  },
  {
    slug: "villa-la-angostura",
    folder: "la-angostura",
    name: "Villa La Angostura",
    region: "Neuquén · Reserva Nacional",
    description:
      "Reserva, pueblo chico y lagos cristalinos. Ritmo tranquilo y muy fotografiable.",
    fallback: "/images/destinations/la-angostura/IMG_20240117_155008_248.jpg",
  },
  {
    slug: "puerto-madryn",
    folder: "madryn",
    name: "Puerto Madryn",
    region: "Chubut · Costa patagónica",
    description:
      "Mar patagónico y fauna en su hábitat. Ballenas, costa y excursiones de día.",
    fallback: "/images/destinations/madryn/IMG-20260525-WA0122.jpg",
  },
  {
    slug: "el-calafate",
    folder: "calafate",
    name: "El Calafate",
    region: "Santa Cruz · Glaciar Perito Moreno",
    description:
      "Glaciares, lagos turquesa y base para recorrer el sur austral en auto.",
    fallback: "/images/IMG_1506.jpeg",
  },
  {
    slug: "traful",
    folder: "traful",
    name: "Traful / Villa Traful",
    region: "Neuquén · Lago Traful",
    description:
      "Bosque nativo y aguas claras. Ideal para desconectar con ritmo de pueblo.",
    fallback: "/images/IMG_1506.jpeg",
  },
  {
    slug: "ushuaia",
    folder: "ushuaia",
    name: "Ushuaia",
    region: "Tierra del Fuego · Fin del mundo",
    description:
      "Canal Beagle, montaña y naturaleza austral. Coordinamos alojamiento y salidas.",
    fallback: "/images/IMG_1506.jpeg",
  },
] as const;

function buildGalleryImages(
  folder: string,
  name: string,
  fallback: string,
  curated?: readonly string[],
): { src: string; alt: string }[] {
  const paths = curated?.length
    ? [...curated]
    : getDestinationImagePaths(folder);
  const barilocheAlts = [
    "Departamento en Bariloche",
    "Cabaña en Bariloche",
    "Hotel en Bariloche",
    "Hotel en Bariloche",
  ];
  const picked = (paths.length > 0 ? paths.slice(0, 4) : [fallback]).map((src, index) => ({
    src,
    alt:
      name === "Bariloche" && curated?.length
        ? (barilocheAlts[index] ?? `${name} — foto ${index + 1}`)
        : `${name} — foto ${index + 1}`,
  }));

  while (picked.length < 4) {
    const src = picked[picked.length - 1]?.src ?? fallback;
    picked.push({ src, alt: `${name} — foto ${picked.length + 1}` });
  }

  return picked;
}

/** Destinos con catálogo en `/destinos/[slug]` — datos para la sección editorial en home. */
export const HOME_DESTINATION_EDITORIAL: HomeDestinationEditorial[] = DESTINATION_META.map(
  (meta) => ({
    slug: meta.slug,
    name: meta.name,
    region: meta.region,
    description: meta.description,
    galleryImages: buildGalleryImages(
      meta.folder,
      meta.name,
      meta.fallback,
      "curatedGallery" in meta ? meta.curatedGallery : undefined,
    ),
  }),
);
