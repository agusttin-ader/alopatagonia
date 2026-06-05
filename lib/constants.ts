export { SITE } from "@/lib/site";
import { SITE } from "@/lib/site";

export const HERO_COPY = {
  headline: "Organizá tu viaje a Patagonia sin complicaciones",
  headlineMobile: "Patagonia sin complicaciones",
  subline: "Auto + alojamiento + excursiones. Todo en un solo lugar.",
  sublineMobile: "Auto, alojamiento y excursiones. Un solo equipo.",
} as const;

export const SECTION_IDS = {
  planner: "planear-viaje",
  community: "comunidad",
  signature: "esencia-alo",
  testimonials: "testimonios",
  howItWorks: "como-funciona",
  services: "beneficios",
  catalogHub: "explorar-catalogo",
  destinations: "destinos",
  experience: "experiencia",
  winterShop: "tienda-invierno",
  urgency: "urgencia",
  cta: "contacto",
} as const;

/** URL fallback de tienda; priorizar `NEXT_PUBLIC_WINTER_STORE_URL` en producción. */
const DEFAULT_WINTER_STORE_URL = "https://www.laguaridainstrumentos.com";
const DEFAULT_WHATSAPP_E164 = "5491170954933";
const ALLOWED_WINTER_STORE_HOSTS = new Set([
  "www.laguaridainstrumentos.com",
  "laguaridainstrumentos.com",
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

export const WINTER_STORE_WHATSAPP_MESSAGE =
  "Hola! Quiero consultar por la tienda de invierno / equipamiento para mi viaje.";

export const WINTER_STORE_COPY = {
  metaTitle: "Alo Patagonia | Equipamiento de invierno",
  metaDescription:
    "Abrigos y equipo pensados para el frío patagónico. Elegimos prendas para que viajes cómodo y seguro.",
  heroTitle: "Equipate para el frío patagónico",
  heroSubtitle:
    "Abrigos y capas para el frío real del sur. Consultá talles por WhatsApp antes de salir.",
  ctaPrimary: "Ir a la tienda",
  ctaSecondaryHome: "Volver al inicio",
  ctaWhatsApp: "Consultar por WhatsApp",
  homeEyebrow: "Tienda de invierno",
  homeHeading: "En Ushuaia hace frío de verdad. Equipate antes de salir.",
  homeBody:
    "Abrigos y capas para el viento sur. Entrá a la tienda, consultá talles por WhatsApp y sumalo a tu itinerario.",
  homeCta: "Ver tienda de invierno",
  bullets: [
    "Selección pensada para temperaturas reales del sur",
    "Consultas rápidas por WhatsApp si dudás con talles o envíos",
    "Complementa tu itinerario Alo con equipo confiable",
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
  "Hola! Quiero planear mi viaje a Patagonia. ¿Me ayudan?";

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
  | "ushuaia"
  | "calafate"
  | "san-martin-andes"
  | "villa-la-angostura"
  | "puerto-madryn"
  | "el-bolson"
  | "esquel"
  | "mendoza";

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
    key: "ushuaia",
    label: "Ushuaia",
    mapCenter: [-54.8019, -68.303],
    mapZoom: 12.2,
    previewHook: "Canal Beagle, montaña y el sur más sur.",
  },
  {
    key: "calafate",
    label: "El Calafate",
    mapCenter: [-50.3379, -72.2648],
    mapZoom: 12.2,
    previewHook: "Glaciares que se escuchan antes de verse.",
  },
  {
    key: "san-martin-andes",
    label: "San Martin de los Andes",
    mapCenter: [-40.1579, -71.3534],
    mapZoom: 12.2,
    previewHook: "Bosque andino y rutas junto al lago.",
  },
  {
    key: "villa-la-angostura",
    label: "Villa La Angostura",
    mapCenter: [-40.7617, -71.6463],
    mapZoom: 13,
    previewHook: "Reserva, pueblo chico y paisajes de postal.",
  },
  {
    key: "puerto-madryn",
    label: "Puerto Madryn",
    mapCenter: [-42.7692, -65.0385],
    mapZoom: 12.4,
    previewHook: "Mar patagónico y fauna en su hábitat.",
  },
  {
    key: "el-bolson",
    label: "El Bolson",
    mapCenter: [-41.9664, -71.5336],
    mapZoom: 12.8,
    previewHook: "Montaña alternativa y feria artesanal.",
  },
  {
    key: "esquel",
    label: "Esquel",
    mapCenter: [-42.9115, -71.3195],
    mapZoom: 12.8,
    previewHook: "Estepa, bosque y el Tren Patagónico.",
  },
  {
    key: "mendoza",
    label: "Mendoza",
    mapCenter: [-32.8895, -68.8458],
    mapZoom: 12.2,
    previewHook: "Viñedos al pie de la cordillera.",
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
    description: "Regiones que coordinamos en un viaje.",
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
      "Auto, hotel y Perito Moreno reservados en un solo mensaje. Llegamos y solo disfrutamos.",
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
      "Itinerario sin corridas, hoteles cerca de todo y paradas pensadas para que los chicos descansen.",
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
  IMAGE_QUALITY,
  IMAGE_QUALITY_GALLERY,
  IMAGE_QUALITY_HERO,
  IMAGE_QUALITY_INTRO,
  IMAGE_QUALITY_LIGHTBOX,
  IMAGE_QUALITY_MAX,
  IMAGE_PRELOAD_WIDTH,
  IMAGE_SIZES,
  buildNextImageUrl,
} from "@/lib/image-config";

/**
 * Archivos en `public/images/` → URL `/images/nombre`.
 * Los `width`/`height` son la relación de aspecto a escala 4K para el optimizador (no fuerzan ampliar el archivo).
 */
const img = (file: string) => `/images/${file}`;

export const HERO_IMAGE: GalleryImage = {
  src: img("IMG_1506.jpeg"),
  alt: "Montañas y valle al amanecer en la Patagonia",
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
  src: img("IMG_1459.jpeg"),
  alt: "Cumbres y lagos de la Patagonia",
  width: 3840,
  height: 2880,
};

/** Imagen nevada para la tienda de invierno (reusa archivo de galería). */
export const WINTER_STORE_IMAGE: GalleryImage = {
  src: img("IMG_1657.jpeg"),
  alt: "Nieve y cumbres patagónicas",
  width: 3840,
  height: 2560,
};

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: img("IMG_0915.jpeg"),
    alt: "Lago y montañas nevadas",
    width: 3840,
    height: 3840,
  },
  {
    src: img("IMG_1370.jpeg"),
    alt: "Cordillera al atardecer",
    width: 3840,
    height: 2880,
  },
  {
    src: img("IMG_1391.jpeg"),
    alt: "Sendero entre bosque y montaña",
    width: 2880,
    height: 3840,
  },
  {
    src: img("IMG_1398.jpeg"),
    alt: "Vista panorámica de picos",
    width: 3840,
    height: 2560,
  },
  {
    src: img("IMG_1426.jpeg"),
    alt: "Lago turquesa y bosque",
    width: 3840,
    height: 3840,
  },
  {
    src: img("IMG_1437.jpeg"),
    alt: "Niebla suave sobre el valle",
    width: 3840,
    height: 2560,
  },
  {
    src: img("IMG_1446.jpeg"),
    alt: "Bosque y río de montaña",
    width: 3072,
    height: 3840,
  },
  {
    src: img("IMG_1526.jpeg"),
    alt: "Cumbres rocosas y cielo despejado",
    width: 3840,
    height: 3840,
  },
  {
    src: img("IMG_1459.jpeg"),
    alt: "Cumbres y lagos de la Patagonia",
    width: 3840,
    height: 2560,
  },
  {
    src: img("IMG_1667.jpeg"),
    alt: "Luz y montañas en la Patagonia",
    width: 3840,
    height: 2880,
  },
  {
    src: img("IMG_1657.jpeg"),
    alt: "Nieve y cumbres patagónicas",
    width: 3840,
    height: 2560,
  },
];
