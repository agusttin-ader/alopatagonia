export { SITE } from "@/lib/site";

import {
  getHomeExperienceImagePath,
  getHomeHeroImagePath,
  getHomeImagePaths,
  getInstagramImagePaths,
} from "@/lib/home-images";

export const HERO_COPY = {
  headline: "Organizá con nosotros tu viaje a Patagonia sin complicaciones",
  headlineMobile: "Tu viaje a Patagonia, sin complicaciones",
  subline:
    "Alojamientos + transfers + alquiler de autos y excursiones… todo en un solo lugar.",
  sublineMobile:
    "Alojamientos, transfers, autos y excursiones en un solo lugar.",
} as const;

export const SECTION_IDS = {
  planner: "planear-viaje",
  community: "comunidad",
  signature: "esencia-alo",
  gallery: "galeria-patagonia",
  testimonials: "testimonios",
  howItWorks: "como-funciona",
  catalogHub: "explorar-catalogo",
  destinations: "destinos",
  winterShop: "tienda-invierno",
  cta: "contacto",
} as const;

import { BARILOCHE_HERO_IMAGE } from "@/lib/catalog/bariloche-curated";

export const PLANNER_PATH = "/planear-mi-viaje" as const;

export const PLANNER_BANNER = {
  src: BARILOCHE_HERO_IMAGE,
  alt: "Panorámica de lagos y montaña en Bariloche, Patagonia Argentina",
} as const;

export const PLANNER_PAGE_COPY = {
  title: "Planear mi viaje",
  description:
    "Decinos a dónde querés ir, cuándo y cuántos son. Te dejamos el texto para WhatsApp o mail.",
  intro:
    "En dos minutos completás destino, fechas y datos. Nosotros te escribimos el mensaje; vos solo lo enviás.",
} as const;

export const PLANNER_TEASER_COPY = {
  title: "¿Tenés fechas? Empecemos.",
  description:
    "Elegí destino, fechas y cuántos son. Te dejamos el mensaje listo para mandar por WhatsApp.",
  cta: "Armar mi consulta",
} as const;

/** URL fallback de tienda; priorizar `NEXT_PUBLIC_WINTER_STORE_URL` en producción. */
const DEFAULT_WINTER_STORE_URL = "https://www.boulder.com.ar/";
const DEFAULT_WHATSAPP_E164 = "5491170954933";
const ALLOWED_WINTER_STORE_HOSTS = new Set([
  "www.boulder.com.ar",
  "boulder.com.ar",
]);
const ALLOWED_WHATSAPP_HOSTS = new Set(["wa.me", "api.whatsapp.com"]);

function getTrustedHttpsUrl(
  rawUrl: string | undefined,
  allowedHosts: Set<string>,
): string | null {
  if (!rawUrl) return null;
  try {
    const parsedUrl = new URL(rawUrl);
    if (parsedUrl.protocol !== "https:") return null;
    if (!allowedHosts.has(parsedUrl.hostname)) return null;
    return parsedUrl.toString();
  } catch {
    return null;
  }
}

export function getWinterStoreUrl(): string {
  const fromEnv = getTrustedHttpsUrl(
    process.env.NEXT_PUBLIC_WINTER_STORE_URL?.trim(),
    ALLOWED_WINTER_STORE_HOSTS,
  );
  return fromEnv || DEFAULT_WINTER_STORE_URL;
}

export const WINTER_STORE_COPY = {
  metaDescription:
    "Indumentaria Boulder para el frío patagónico. 3, 6 y 9 cuotas sin interés, 15% off por transferencia y envíos gratis desde $130.000.",
  heroTitle: "Equipate para el frío patagónico",
  heroSubtitle:
    "Camperas, buzos y pantalones outdoor Boulder. 3, 6 y 9 cuotas sin interés, 15% off por transferencia y envíos gratis desde $130.000.",
  ctaPrimary: "Ir a Boulder",
  ctaSecondaryHome: "Volver al inicio",
  homeEyebrow: "Indumentaria",
  homeHeading:
    "Porque el viaje comienza con la planificación, equipate fuerte para la montaña!!",
  homeBodyParagraphs: [
    "Todo lo que necesitás para tu próxima aventura… está acá.",
    "Viajá cómodo y preparado para afrontar el clima patagónico. Conocé la calidad de la indumentaria Boulder y completá tu experiencia… entrá a la tienda online y aprovechá nuestro beneficio para llevarte todo!!",
  ],
  homeCta: "Ver indumentaria",
  bullets: [
    "3, 6 y 9 cuotas sin interés, sin monto mínimo",
    "15% off pagando por transferencia en toda la web",
    "Envíos gratis a partir de $130.000 · a todo el país",
  ],
} as const;

/** Cifras del perfil @alo_patagonia (actualizar posts/seguidores si cambian en Instagram). */
export type InstagramStatItem = {
  id: string;
  label: string;
  description: string;
  /** Valor final del contador: entero, o miles con un decimal para formato «12,7k». */
  target: number;
  variant: "integer" | "k";
};

const DEFAULT_WHATSAPP_MESSAGE =
  "Hola! Quiero ir a la Patagonia. ¿Me ayudan con auto, alojamiento y excursiones?";

export const WHATSAPP_MESSAGES = {
  primary: DEFAULT_WHATSAPP_MESSAGE,
} as const;

export function getWhatsAppUrl(message = DEFAULT_WHATSAPP_MESSAGE): string {
  const preset = getTrustedHttpsUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim(),
    ALLOWED_WHATSAPP_HOSTS,
  );
  if (preset) {
    const presetUrl = new URL(preset);
    presetUrl.searchParams.set("text", message);
    return presetUrl.toString();
  }

  const raw = process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? DEFAULT_WHATSAPP_E164;
  const digits = raw.replace(/\D/g, "");
  const safeDigits = /^\d{10,15}$/.test(digits) ? digits : DEFAULT_WHATSAPP_E164;
  const text = encodeURIComponent(message);
  return `https://wa.me/${safeDigits}?text=${text}`;
}

export type PlannerDestinationKey =
  | "bariloche"
  | "san-martin"
  | "el-chalten"
  | "esquel"
  | "villa-la-angostura"
  | "puerto-madryn"
  | "el-calafate"
  | "traful"
  | "ushuaia";

export type PlannerDestinationValue = PlannerDestinationKey | "none";

type PlannerDestinationConfig = {
  key: PlannerDestinationKey;
  label: string;
  mapCenter: [number, number];
  mapZoom: number;
  previewHook: string;
};

export const PLANNER_DESTINATIONS: PlannerDestinationConfig[] = [
  {
    key: "bariloche",
    label: "Bariloche",
    mapCenter: [-41.1335, -71.3103],
    mapZoom: 12,
    previewHook: "Lagos, cipreses y ruta en auto sin apuro.",
  },
  {
    key: "san-martin",
    label: "San Martín de los Andes",
    mapCenter: [-40.1579, -71.3534],
    mapZoom: 12.2,
    previewHook: "Bosque andino y rutas junto al lago.",
  },
  {
    key: "el-chalten",
    label: "El Chaltén",
    mapCenter: [-49.3317, -72.8866],
    mapZoom: 12.4,
    previewHook: "Trekking al pie del Fitz Roy y senderos de montaña.",
  },
  {
    key: "esquel",
    label: "Esquel / Trevelin",
    mapCenter: [-42.9115, -71.3195],
    mapZoom: 12.8,
    previewHook: "Estepa, bosque y el Tren Patagónico.",
  },
  {
    key: "villa-la-angostura",
    label: "Villa La Angostura",
    mapCenter: [-40.7617, -71.6463],
    mapZoom: 13,
    previewHook: "Reserva, pueblo chico y lagos para ir sin apuro.",
  },
  {
    key: "puerto-madryn",
    label: "Puerto Madryn",
    mapCenter: [-42.7692, -65.0385],
    mapZoom: 12.4,
    previewHook: "Ballenas, pingüinos y costa atlántica.",
  },
  {
    key: "el-calafate",
    label: "El Calafate",
    mapCenter: [-50.3379, -72.2648],
    mapZoom: 12.2,
    previewHook: "Glaciares que se escuchan antes de verse.",
  },
  {
    key: "traful",
    label: "Traful / Villa Traful",
    mapCenter: [-40.6583, -71.4597],
    mapZoom: 12.6,
    previewHook: "Lago Traful, el bosque sumergido y la ruta de los Siete Lagos.",
  },
  {
    key: "ushuaia",
    label: "Ushuaia",
    mapCenter: [-54.8019, -68.303],
    mapZoom: 12.2,
    previewHook: "Canal Beagle, montaña y el sur más sur.",
  },
];

export const PLANNER_DEFAULT_FOCUS = {
  center: [-44.5, -70.2] as [number, number],
  zoom: 4.6,
};

export const PLANNER_DESTINATION_OPTIONS: Array<{
  value: PlannerDestinationValue;
  label: string;
}> = [
  { value: "none", label: "Sin destino definido" },
  ...PLANNER_DESTINATIONS.map((destination) => ({
    value: destination.key,
    label: destination.label,
  })),
];

const plannerDestinationLabels = {
  none: "sin destino definido",
} as Record<PlannerDestinationValue, string>;

const plannerDestinationFocus = {} as Record<
  PlannerDestinationKey,
  { center: [number, number]; zoom: number }
>;

for (const destination of PLANNER_DESTINATIONS) {
  plannerDestinationLabels[destination.key] = destination.label;
  plannerDestinationFocus[destination.key] = {
    center: destination.mapCenter,
    zoom: destination.mapZoom,
  };
}

export const PLANNER_DESTINATION_LABELS = plannerDestinationLabels;
export const PLANNER_DESTINATION_FOCUS = plannerDestinationFocus;

const plannerDestinationHooks = {} as Record<PlannerDestinationKey, string>;

for (const destination of PLANNER_DESTINATIONS) {
  plannerDestinationHooks[destination.key] = destination.previewHook;
}

export const PLANNER_DESTINATION_HOOKS = plannerDestinationHooks;

/** Claves legacy del planner (antes del sync con `/destinos`). */
export const LEGACY_PLANNER_DESTINATION_ALIASES = {
  calafate: "el-calafate",
  "san-martin-andes": "san-martin",
} as const satisfies Partial<Record<string, PlannerDestinationKey>>;

export function resolvePlannerDestinationKey(value: string): PlannerDestinationValue {
  if (value === "none") return "none";
  const aliased =
    LEGACY_PLANNER_DESTINATION_ALIASES[
      value as keyof typeof LEGACY_PLANNER_DESTINATION_ALIASES
    ] ?? value;
  return aliased in PLANNER_DESTINATION_FOCUS
    ? (aliased as PlannerDestinationKey)
    : "none";
}

export function getPlannerDestinationFocus(destination: PlannerDestinationValue) {
  const key = resolvePlannerDestinationKey(destination);
  return key === "none" ? PLANNER_DEFAULT_FOCUS : PLANNER_DESTINATION_FOCUS[key];
}

export const INSTAGRAM_STATS: InstagramStatItem[] = [
  {
    id: "posts",
    label: "Publicaciones",
    target: 1408,
    variant: "integer",
    description: "Rutas, clima y tips de cada zona.",
  },
  {
    id: "followers",
    label: "Seguidores",
    target: 12.7,
    variant: "k",
    description: "Comunidad que sigue el sur.",
  },
  {
    id: "coverage",
    label: "Destinos",
    target: PLANNER_DESTINATIONS.length,
    variant: "integer",
    description: "Zonas donde trabajamos.",
  },
];

export type Testimonial = {
  name: string;
  highlight: string;
  quote: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Florencia y Tomás, Buenos Aires",
    highlight: "8 días · Bariloche y Calafate",
    quote:
      "En un chat nos quedó el auto, el hotel y el Perito Moreno. Llegamos y no tuvimos que correr.",
  },
  {
    name: "Camila R., Córdoba",
    highlight: "4 días · Ushuaia",
    quote:
      "Nos respondieron el mismo día. Cambiaron una excursión por lluvia y nos salió mejor que el plan original.",
  },
  {
    name: "Familia Quiroga, Rosario",
    highlight: "10 días · con chicos",
    quote:
      "Sin días corridos, hoteles bien ubicados y paradas para que los chicos no se fundan.",
  },
  {
    name: "Nicolás M., Mendoza",
    highlight: "Primera vez en el sur",
    quote:
      "En dos días teníamos fechas, auto y alojamiento. Nos respondieron por WhatsApp durante todo el viaje.",
  },
];

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** Reexportado desde lib/image-config.ts (calidad + sizes centralizados). */
export {
  IMAGE_BLUR_PLACEHOLDER,
  IMAGE_QUALITY,
  IMAGE_QUALITY_CARD,
  IMAGE_QUALITY_GALLERY,
  IMAGE_QUALITY_HERO,
  IMAGE_QUALITY_INTRO,
  IMAGE_QUALITY_LIGHTBOX,
  IMAGE_PRELOAD_WIDTH,
  IMAGE_SIZES,
  buildNextImageUrl,
} from "@/lib/image-config";

function galleryFromPaths(paths: string[], altPrefix: string): GalleryImage[] {
  return paths.map((src, index) => ({
    src,
    alt: `${altPrefix} — foto ${index + 1}`,
    width: 3840,
    height: 2560,
  }));
}

export const HERO_IMAGE: GalleryImage = {
  src: getHomeHeroImagePath(),
  alt: "Patagonia",
  width: 3840,
  height: 2560,
};

/** MP4 en `public/videos/`; conviene exportarlo en alta resolución (p. ej. 4K) para buena nitidez. */
export const HERO_VIDEO = {
  src: "/videos/hero-video-final.mp4",
} as const;

/** Versión liviana para móviles/iOS para mejorar estabilidad de reproducción. */
export const HERO_VIDEO_MOBILE = {
  src: "/videos/hero-video-mobile-1080-premium.mp4",
} as const;

/** Fallback más liviano para móviles muy chicos o con menor rendimiento. */
export const HERO_VIDEO_MOBILE_LITE = {
  src: "/videos/hero-video-mobile-720-hq.mp4",
} as const;

/** Velocidad del video del hero: 1 = normal; valores menores = más lento (más pausado). */
export const HERO_VIDEO_PLAYBACK_RATE = 1 as const;

export const EXPERIENCE_IMAGE: GalleryImage = {
  src: getHomeExperienceImagePath(),
  alt: "Patagonia",
  width: 3840,
  height: 2880,
};

/** Carrusel home: fem → promo 2 → masc → promo 1. */
export const BOULDER_HOME_CAROUSEL_IMAGES = [
  {
    src: "/images/boulder-indumentaria/promocion-boulder-fem.png",
    alt: "Indumentaria Boulder para mujer — camperas y abrigos outdoor",
    width: 930,
    height: 465,
  },
  {
    src: "/images/boulder-indumentaria/promocion-boulder-2.jpg",
    alt: "Boulder — 3, 6 y 9 cuotas sin interés",
    width: 1280,
    height: 640,
  },
  {
    src: "/images/boulder-indumentaria/promocion-boulder-masc.png",
    alt: "Indumentaria Boulder para hombre — camperas y abrigos outdoor",
    width: 930,
    height: 465,
  },
  {
    src: "/images/boulder-indumentaria/promocion-boulder-1.png",
    alt: "Boulder — 15% off por transferencia y envíos gratis",
    width: 1774,
    height: 887,
  },
] as const satisfies readonly GalleryImage[];

/** Hero `/invierno` — solo promos gráficas (sin fotos de producto). */
export const BOULDER_INVIERNO_HERO_IMAGES = [
  {
    src: "/images/boulder-indumentaria/promocion-boulder-2.jpg",
    alt: "Boulder — 3, 6 y 9 cuotas sin interés",
    width: 1280,
    height: 640,
  },
  {
    src: "/images/boulder-indumentaria/promocion-boulder-1.png",
    alt: "Boulder — 15% off por transferencia y envíos gratis",
    width: 1774,
    height: 887,
  },
] as const satisfies readonly GalleryImage[];

/** Promos Boulder — mismo set que el carrusel del home. */
export const BOULDER_INDUMENTARIA_IMAGES = BOULDER_HOME_CAROUSEL_IMAGES;

/** Primera promo Boulder — OG / fallback estático. */
export const WINTER_STORE_IMAGE: GalleryImage = BOULDER_INDUMENTARIA_IMAGES[0];

export const GALLERY_IMAGES: GalleryImage[] = galleryFromPaths(
  getInstagramImagePaths(),
  "Patagonia en Instagram",
);

/** Galería editorial home — todas las fotos de `imagenes-home`. */
export const HOME_GALLERY_IMAGES: GalleryImage[] = galleryFromPaths(
  getHomeImagePaths(),
  "Patagonia",
);
