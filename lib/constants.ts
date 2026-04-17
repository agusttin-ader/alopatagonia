import type { LucideIcon } from "lucide-react";
import { Car, Compass, Hotel, Mountain } from "lucide-react";

export const SITE = {
  name: "Alo Patagonia",
  tagline: "Asesoramiento integral para tu viaje en la Patagonia",
  instagram: "https://www.instagram.com/alo_patagonia",
  email: "hola@alopatagonia.com",
  phoneDisplay: "+54 9 11 0000-0000",
} as const;

export const HERO_COPY = {
  headline: "Tu viaje a la Patagonia, coordinado de punta a punta",
  subline:
    "Alojamientos, autos y transfers, excursiones y asesoramiento para recorrer los grandes destinos del sur: vos elegís el ritmo, nosotros el itinerario.",
} as const;

export const SECTION_IDS = {
  services: "servicios",
  destinations: "destinos",
  experience: "experiencia",
  gallery: "galeria",
  testimonials: "testimonios",
  cta: "contacto",
} as const;

const DEFAULT_WHATSAPP_MESSAGE =
  "Hola Alo Patagonia, quiero planificar mi viaje por la Patagonia (Bariloche, Calafate, Ushuaia, etc.).";

export function getWhatsAppUrl(): string {
  const preset = process.env.NEXT_PUBLIC_WHATSAPP_URL;
  if (preset?.trim()) return preset.trim();

  const raw = process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? "5491112345678";
  const digits = raw.replace(/\D/g, "");
  const text = encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE);
  return `https://wa.me/${digits}?text=${text}`;
}

export type ServiceItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const SERVICES: ServiceItem[] = [
  {
    title: "Alojamientos",
    description:
      "Hoteles, lodges y estancias en Bariloche, Calafate, Ushuaia y el resto del sur, según tu estilo y presupuesto.",
    icon: Hotel,
  },
  {
    title: "Autos y transfers",
    description:
      "Alquiler de autos con tips de ruta y traslados entre aeropuertos, ciudades y excursiones.",
    icon: Car,
  },
  {
    title: "Excursiones",
    description:
      "Glaciares, trekking, navegación y experiencias icónicas —incluidas opciones compartidas cuando aplica.",
    icon: Mountain,
  },
  {
    title: "Asesoramiento integral",
    description:
      "Armamos el viaje a toda la Patagonia: fechas, conexiones, reservas y soporte antes y durante el viaje.",
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

export type Testimonial = {
  name: string;
  quote: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "María & Lucas",
    quote:
      "Bariloche y Calafate en un solo viaje, sin estrés con los traslados. Solo tuvimos que mirar el paisaje.",
  },
  {
    name: "Andrea P.",
    quote:
      "WhatsApp impecable y excursiones que no hubiéramos encontrado solos. Se nota el conocimiento local.",
  },
  {
    name: "Familia Díaz",
    quote:
      "Con niños necesitábamos orden; el ritmo fue perfecto y los alojamientos tal cual nos prometieron.",
  },
];

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

/** Calidad máxima para `next/image`; debe existir en `images.qualities` del `next.config`. */
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
  src: "/videos/hero-video-2.mp4",
} as const;

/** Velocidad del video del hero: 1 = normal; valores menores = más lento (más pausado). */
export const HERO_VIDEO_PLAYBACK_RATE = 0.82 as const;

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
