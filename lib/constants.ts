import type { LucideIcon } from "lucide-react";
import { Car, Compass, Hotel, Mountain } from "lucide-react";

export const SITE = {
  name: "Alo Patagonia",
  instagram: "https://www.instagram.com/alo_patagonia",
  /** Sin @; para textos y enlaces al perfil. */
  instagramHandle: "alo_patagonia",
  email: "alopatagonia.arg@gmail.com",
  phoneDisplay: "+54 9 11 7095 4933",
} as const;

export const HERO_COPY = {
  headline: "Organizá tu viaje a Patagonia sin complicaciones",
  subline: "Auto + alojamiento + excursiones. Todo en un solo lugar.",
} as const;

export const SITE_INTRO_COPY = {
  eyebrow: "Viajes y experiencias en la Patagonia",
  tagline: HERO_COPY.subline,
} as const;

export const SECTION_IDS = {
  planner: "planear-viaje",
  community: "comunidad",
  signature: "esencia-alo",
  testimonials: "testimonios",
  howItWorks: "como-funciona",
  services: "beneficios",
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
    "Una selección de invierno para combinar con tu viaje: menos improvisación, más calor y estilo en la montaña.",
  ctaPrimary: "Ir a la tienda",
  ctaSecondaryHome: "Volver al inicio",
  ctaWhatsApp: "Consultar por WhatsApp",
  homeEyebrow: "Tienda de invierno",
  homeHeading: "El frío no es excusa. Es parte del viaje.",
  homeBody:
    "Antes de salir, revisá abrigos y capas que marcan la diferencia entre disfrutar el paisaje y pasarla mal. Te llevamos a nuestra tienda en un clic.",
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

export type ServiceItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const SERVICES: ServiceItem[] = [
  {
    title: "Movete con libertad",
    description:
      "Te resolvemos el auto ideal para tu plan, con entrega clara y recomendaciones de ruta para aprovechar cada día.",
    icon: Car,
  },
  {
    title: "Hospedaje a tu medida",
    description:
      "Seleccionamos alojamientos por zona, estilo y presupuesto para que descanses bien y estés donde te conviene.",
    icon: Hotel,
  },
  {
    title: "Excursiones imperdibles",
    description:
      "Armamos actividades que realmente valen la pena según temporada, clima y tipo de viaje que querés hacer.",
    icon: Mountain,
  },
  {
    title: "Asesoramiento personalizado",
    description:
      "Tenés un solo contacto para ordenar fechas, traslados y reservas sin perder tiempo comparando por tu cuenta.",
    icon: Compass,
  },
];

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
};

export const PLANNER_DESTINATIONS: PlannerDestinationConfig[] = [
  {
    key: "bariloche",
    label: "Bariloche",
    mapCenter: [-41.1335, -71.3103],
    mapZoom: 12,
  },
  {
    key: "ushuaia",
    label: "Ushuaia",
    mapCenter: [-54.8019, -68.303],
    mapZoom: 12.2,
  },
  {
    key: "calafate",
    label: "El Calafate",
    mapCenter: [-50.3379, -72.2648],
    mapZoom: 12.2,
  },
  {
    key: "san-martin-andes",
    label: "San Martin de los Andes",
    mapCenter: [-40.1579, -71.3534],
    mapZoom: 12.2,
  },
  {
    key: "villa-la-angostura",
    label: "Villa La Angostura",
    mapCenter: [-40.7617, -71.6463],
    mapZoom: 13,
  },
  {
    key: "puerto-madryn",
    label: "Puerto Madryn",
    mapCenter: [-42.7692, -65.0385],
    mapZoom: 12.4,
  },
  {
    key: "el-bolson",
    label: "El Bolson",
    mapCenter: [-41.9664, -71.5336],
    mapZoom: 12.8,
  },
  {
    key: "esquel",
    label: "Esquel",
    mapCenter: [-42.9115, -71.3195],
    mapZoom: 12.8,
  },
  {
    key: "mendoza",
    label: "Mendoza",
    mapCenter: [-32.8895, -68.8458],
    mapZoom: 12.2,
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

export const INSTAGRAM_STATS: InstagramStatItem[] = [
  {
    id: "posts",
    label: "Contenido en el perfil",
    target: 1408,
    variant: "integer",
    description:
      "Rutas, paisajes y tips prácticos para planificar con información clara.",
  },
  {
    id: "followers",
    label: "Comunidad",
    target: 12.7,
    variant: "k",
    description:
      "Personas que siguen el día a día del sur y cómo armamos cada experiencia.",
  },
  {
    id: "coverage",
    label: "Cobertura en la Patagonia",
    target: PLANNER_DESTINATIONS.length,
    variant: "integer",
    description:
      "Grandes regiones que coordinamos en un mismo viaje, con un solo interlocutor.",
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
    highlight: "Viaje de 8 días",
    quote:
      "Llegamos con todo cerrado en una sola propuesta. Auto, hotel y excursiones coordinadas perfecto.",
  },
  {
    name: "Camila R., Córdoba",
    highlight: "Escapada en pareja",
    quote:
      "Nos respondieron rapidísimo por WhatsApp y nos recomendaron planes que terminaron siendo lo mejor del viaje.",
  },
  {
    name: "Familia Quiroga, Rosario",
    highlight: "Viaje familiar",
    quote:
      "Con chicos necesitábamos practicidad. Nos armaron un itinerario cómodo, sin corridas y con alojamientos excelentes.",
  },
  {
    name: "Nicolás M., Mendoza",
    highlight: "Primera vez en Patagonia",
    quote:
      "Se sintió súper confiable desde el primer mensaje. En dos días ya teníamos todo resuelto para viajar tranquilos.",
  },
];

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** Calidad optimizada para `next/image`; debe existir en `images.qualities` del `next.config`. */
export const IMAGE_QUALITY_MAX = 100 as const;

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
