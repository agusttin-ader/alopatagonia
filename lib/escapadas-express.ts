import { BARILOCHE_HERO_IMAGE } from "@/lib/catalog/bariloche-curated";
import { LA_ANGOSTURA_HERO_IMAGE } from "@/lib/catalog/la-angostura-curated";
import { SAN_MARTIN_HERO_IMAGE } from "@/lib/catalog/san-martin-curated";

export type EscapadaExpressMedia =
  | {
      kind: "video";
      src: string;
      poster: string;
      alt: string;
    }
  | {
      kind: "image";
      src: string;
      alt: string;
    };

export type EscapadaExpressPromo = {
  id: string;
  /** Apagar hasta tener material final de la clienta. */
  published: boolean;
  title: string;
  subtitle: string;
  /** Ej. "Vigente hasta septiembre" */
  badge?: string;
  highlights: string[];
  whatsappMessage: string;
  media: EscapadaExpressMedia;
};

/**
 * Promos Patagonia — editar acá cuando la clienta envíe videos o fotos.
 * Para video: `{ kind: "video", src: "/videos/promo-bariloche.mp4", poster: "...", alt: "..." }`
 */
export const ESCAPADAS_EXPRESS_PROMOS: EscapadaExpressPromo[] = [
  {
    id: "bariloche-express",
    published: true,
    title: "Bariloche",
    subtitle: "4 noches · alojamiento + Circuito Chico",
    badge: "Promo vigente",
    highlights: [
      "Hotel o cabaña según disponibilidad",
      "Circuito Chico con paradas en miradores",
      "Itinerario sin cargo por WhatsApp",
    ],
    whatsappMessage:
      "Me interesa la promo Bariloche. ¿Me pasan fechas y tarifa?",
    media: {
      kind: "image",
      src: BARILOCHE_HERO_IMAGE,
      alt: "Panorámica de lagos y montaña en Bariloche",
    },
  },
  {
    id: "siete-lagos-express",
    published: true,
    title: "Siete Lagos",
    subtitle: "San Martín y Villa La Angostura · 5 noches",
    badge: "Nueva",
    highlights: [
      "Base en San Martín o La Angostura",
      "Ruta escénica de los Siete Lagos",
      "Excursiones según clima y temporada",
    ],
    whatsappMessage:
      "Quiero consultar por la promo Siete Lagos. ¿Tienen fechas?",
    media: {
      kind: "image",
      src: SAN_MARTIN_HERO_IMAGE,
      alt: "Lago Lácar y cordillera en San Martín de los Andes",
    },
  },
  {
    id: "sur-patagonico-express",
    published: true,
    title: "Sur patagónico",
    subtitle: "Calafate + Ushuaia · paquete combinado",
    badge: "Consultar cupos",
    highlights: [
      "Glaciar Perito Moreno y navegación",
      "Canal Beagle y Tierra del Fuego",
      "Traslados y hoteles coordinados",
    ],
    whatsappMessage:
      "Me interesa la promo Sur patagónico. ¿Cómo funciona?",
    media: {
      kind: "image",
      src: LA_ANGOSTURA_HERO_IMAGE,
      alt: "Bosque y lago en la Patagonia",
    },
  },
];

export function getPublishedEscapadasExpressPromos(): EscapadaExpressPromo[] {
  return ESCAPADAS_EXPRESS_PROMOS.filter((promo) => promo.published);
}
