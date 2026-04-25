import type { LucideIcon } from "lucide-react";
import { Car, Compass, Hotel, Mountain } from "lucide-react";

export const SITE = {
  name: "Alo Patagonia",
  tagline: "Asesoramiento integral para tu viaje en la Patagonia",
  instagram: "https://www.instagram.com/alo_patagonia",
  /** Sin @; para textos y enlaces al perfil. */
  instagramHandle: "alo_patagonia",
  email: "hola@alopatagonia.com",
  phoneDisplay: "+54 9 11 0000-0000",
} as const;

export const HERO_COPY = {
  headline: "Organizá tu viaje a Patagonia sin complicaciones",
  subline: "Auto + alojamiento + excursiones. Todo en un solo lugar.",
} as const;

export const SECTION_IDS = {
  planner: "planear-viaje",
  community: "comunidad",
  signature: "esencia-alo",
  gallery: "postales-reales",
  testimonials: "testimonios",
  howItWorks: "como-funciona",
  services: "beneficios",
  destinations: "destinos",
  experience: "experiencia",
  urgency: "urgencia",
  cta: "contacto",
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

const SECONDARY_WHATSAPP_MESSAGE =
  "Hola! Quiero consultar disponibilidad y precios";

export const WHATSAPP_MESSAGES = {
  primary: DEFAULT_WHATSAPP_MESSAGE,
  secondary: SECONDARY_WHATSAPP_MESSAGE,
} as const;

export function getWhatsAppUrl(message = DEFAULT_WHATSAPP_MESSAGE): string {
  const preset = process.env.NEXT_PUBLIC_WHATSAPP_URL;
  if (preset?.trim()) {
    const separator = preset.includes("?") ? "&" : "?";
    return `${preset.trim()}${separator}text=${encodeURIComponent(message)}`;
  }

  const raw = process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? "5491168696491";
  const digits = raw.replace(/\D/g, "");
  const text = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${text}`;
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

export type DestinationItem = {
  name: string;
  region: string;
  description: string;
};

export const DESTINATIONS: DestinationItem[] = [
  {
    name: "San Carlos de Bariloche",
    region: "Patagonia norte · Lagos",
    description:
      "Nahuel Huapi, Llao Llao, cerros y pistas: el clásico portal patagónico entre bosques y aguas turquesas.",
  },
  {
    name: "El Calafate",
    region: "Santa Cruz · Glaciares",
    description:
      "Hielo milenario, estancias y la escala del sur profundo; base ideal para el Perito Moreno y el entorno.",
  },
  {
    name: "Ushuaia",
    region: "Tierra del Fuego",
    description:
      "El fin del mundo: canales, senderos y cielos dramáticos en la ciudad más austral del continente.",
  },
  {
    name: "El Chaltén y más",
    region: "Ruta de los trekking",
    description:
      "Fitz Roy, senderos y cordillera; sumamos conexiones y extensiones según tu tiempo y energía.",
  },
];

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
    target: DESTINATIONS.length,
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
export const IMAGE_QUALITY_MAX = 80 as const;

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

/** Velocidad del video del hero: 1 = normal; valores menores = más lento (más pausado). */
export const HERO_VIDEO_PLAYBACK_RATE = 1 as const;

export const EXPERIENCE_IMAGE: GalleryImage = {
  src: img("IMG_1459.jpeg"),
  alt: "Cumbres y lagos de la Patagonia",
  width: 3840,
  height: 2880,
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
