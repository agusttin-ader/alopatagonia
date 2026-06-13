export { SITE } from "@/lib/site";

import { CLIENT_HERO_COPY } from "@/lib/client-protected-copy";
import {
  getHomeExperienceImagePath,
  getHomeHeroImagePath,
  getHomeImagePaths,
  getInstagramImagePaths,
} from "@/lib/home-images";

export const HERO_COPY = CLIENT_HERO_COPY;

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
  aboutUs: "quienes-somos",
  promosPatagonia: "promos-patagonia",
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
    "Contanos destino, fechas y cuántos viajan. Te armamos el mensaje para WhatsApp o mail con todo en un solo texto.",
  intro:
    "En dos minutos cargás lo básico. Nosotros redactamos el mensaje; vos solo lo enviás y seguimos charlando por ahí.",
} as const;

export const PLANNER_TEASER_COPY = {
  title: "¿Tenés fechas? Empecemos.",
  description:
    "Elegí destino, fechas y cuántos son. Te dejamos el mensaje listo para mandar por WhatsApp — sin formularios eternos.",
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
  "Quiero planear un viaje a la Patagonia. ¿Me ayudan con alojamiento, auto y excursiones?";

/** Prefijo en todos los WhatsApp que salen de la web — la clienta identifica el origen. */
export const WEB_WHATSAPP_LEAD_PREFIX = "Hola, vengo de la web de Alo Patagonia.";

export function buildWebWhatsAppMessage(body: string): string {
  const trimmed = body.trim();
  if (trimmed.startsWith(WEB_WHATSAPP_LEAD_PREFIX)) return trimmed;
  return `${WEB_WHATSAPP_LEAD_PREFIX} ${trimmed}`;
}

export const WHATSAPP_MESSAGES = {
  primary: DEFAULT_WHATSAPP_MESSAGE,
} as const;

export function getWhatsAppUrl(message = DEFAULT_WHATSAPP_MESSAGE): string {
  const fullMessage = buildWebWhatsAppMessage(message);
  const preset = getTrustedHttpsUrl(
    process.env.NEXT_PUBLIC_WHATSAPP_URL?.trim(),
    ALLOWED_WHATSAPP_HOSTS,
  );
  if (preset) {
    const presetUrl = new URL(preset);
    presetUrl.searchParams.set("text", fullMessage);
    return presetUrl.toString();
  }

  const raw = process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? DEFAULT_WHATSAPP_E164;
  const digits = raw.replace(/\D/g, "");
  const safeDigits = /^\d{10,15}$/.test(digits) ? digits : DEFAULT_WHATSAPP_E164;
  const text = encodeURIComponent(fullMessage);
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
    previewHook: "Circuito Chico, Catedral y el Nahuel Huapi en auto.",
  },
  {
    key: "san-martin",
    label: "San Martín de los Andes",
    mapCenter: [-40.1579, -71.3534],
    mapZoom: 12.2,
    previewHook: "Lácar, Lanín y la Ruta de los Siete Lagos.",
  },
  {
    key: "el-chalten",
    label: "El Chaltén",
    mapCenter: [-49.3317, -72.8866],
    mapZoom: 12.4,
    previewHook: "Laguna de los Tres y el Fitz Roy — el clima manda.",
  },
  {
    key: "esquel",
    label: "Esquel / Trevelin",
    mapCenter: [-42.9115, -71.3195],
    mapZoom: 12.8,
    previewHook: "Los Alerces, La Hoya y Trevelin gales.",
  },
  {
    key: "villa-la-angostura",
    label: "Villa La Angostura",
    mapCenter: [-40.7617, -71.6463],
    mapZoom: 13,
    previewHook: "Arrayanes, Cerro Bayo y el Nahuel Huapi sin apuro.",
  },
  {
    key: "puerto-madryn",
    label: "Puerto Madryn",
    mapCenter: [-42.7692, -65.0385],
    mapZoom: 12.4,
    previewHook: "Ballenas sep–dic, Península Valdés y pingüinos.",
  },
  {
    key: "el-calafate",
    label: "El Calafate",
    mapCenter: [-50.3379, -72.2648],
    mapZoom: 12.2,
    previewHook: "Perito Moreno y el azul del Lago Argentino.",
  },
  {
    key: "traful",
    label: "Traful / Villa Traful",
    mapCenter: [-40.6583, -71.4597],
    mapZoom: 12.6,
    previewHook: "Lago Traful turquesa y bosque sumergido.",
  },
  {
    key: "ushuaia",
    label: "Ushuaia",
    mapCenter: [-54.8019, -68.303],
    mapZoom: 12.2,
    previewHook: "Canal Beagle, Tierra del Fuego y viento del sur.",
  },
];

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

export const INSTAGRAM_STATS: InstagramStatItem[] = [
  {
    id: "posts",
    label: "Publicaciones",
    target: 1408,
    variant: "integer",
    description: "Rutas, clima y lo que vimos en cada zona.",
  },
  {
    id: "followers",
    label: "Seguidores",
    target: 12.7,
    variant: "k",
    description: "Gente que sigue el sur desde el celular.",
  },
  {
    id: "coverage",
    label: "Destinos",
    target: PLANNER_DESTINATIONS.length,
    variant: "integer",
    description: "Bases donde armamos viajes.",
  },
];

export type Testimonial = {
  name: string;
  highlight: string;
  quote: string;
  rating?: number;
  timeAgo?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Florencia y Tomás, Buenos Aires",
    highlight: "8 días · Bariloche y Calafate",
    timeAgo: "Hace 1 mes",
    quote:
      "En un chat nos cerraron auto, hotel y el día del Perito Moreno. Llegamos y solo disfrutamos — cero llamadas de último momento.",
  },
  {
    name: "Camila R., Córdoba",
    highlight: "4 días · Ushuaia",
    timeAgo: "Hace 3 semanas",
    quote:
      "Nos respondieron el mismo día. Llovió el martes, movieron la navegación al miércoles y nos quedó mejor: más calma en el Canal Beagle.",
  },
  {
    name: "Familia Quiroga, Rosario",
    highlight: "10 días · con chicos",
    timeAgo: "Hace 2 meses",
    quote:
      "Itinerario sin días corridos: hoteles cerca de todo, paradas para que los chicos descansen y excursiones que no eran maratones.",
  },
  {
    name: "Nicolás M., Mendoza",
    highlight: "Primera vez en el sur",
    timeAgo: "Hace 5 semanas",
    quote:
      "En dos días teníamos fechas, auto y alojamiento. Durante el viaje les escribimos por WhatsApp dos veces y siempre contestaron al toque.",
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
  IMAGE_QUALITY_DETAIL,
  IMAGE_QUALITY_GALLERY,
  IMAGE_QUALITY_HERO,
  IMAGE_QUALITY_INTRO,
  IMAGE_QUALITY_LIGHTBOX,
  IMAGE_PRELOAD_WIDTH,
  IMAGE_SIZES,
  buildNextImageUrl,
  preloadOptimizedImage,
  preloadOptimizedImagesIdle,
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

/** Video vertical dentro del mockup de iPhone en planear mi viaje. */
export const PLANNER_PHONE_VIDEO = {
  src: "/videos/formulario.mp4",
  poster: "/images/quienes-somos/quienes-somos-1.jpg",
  label: "Video de la Patagonia — Alo Patagonia",
} as const;

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
