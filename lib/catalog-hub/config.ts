import { CLIENT_ALOJAMIENTOS_HUB_COPY } from "@/lib/client-protected-copy";

export type CatalogHubPillar = {
  slug: "destinos" | "alojamientos" | "excursiones";
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  /** Encuadre en la card (`object-*`) cuando el foco no está al centro. */
  imagePosition?: string;
  status: "live" | "coming-soon";
};

/** Copy e imágenes del hub de catálogo en home y páginas /destinos, /alojamientos, /excursiones. */
export const CATALOG_HUB_PILLARS: CatalogHubPillar[] = [
  {
    slug: "destinos",
    title: "Destinos",
    eyebrow: "Por zona",
    description: "Bariloche, Calafate, Ushuaia, Madryn y más. ¿Por dónde arrancás?",
    href: "/destinos",
    image: "/images/imagenes-home/20240606_123303.jpg",
    imageAlt: "Centro Cívico de Bariloche — Patagonia Argentina",
    status: "live",
  },
  {
    slug: "alojamientos",
    title: CLIENT_ALOJAMIENTOS_HUB_COPY.title,
    eyebrow: "Cabañas · Deptos · Hostels",
    description: CLIENT_ALOJAMIENTOS_HUB_COPY.description,
    href: "/alojamientos",
    image: "/images/destinations/traful/alojamientos/cabanas/Cab. Costa/IMG-20260111-WA0009.jpg",
    imageAlt: "Interior de cabaña en Villa Traful — Patagonia",
    status: "live",
  },
  {
    slug: "excursiones",
    title: "Excursiones",
    eyebrow: "Por temporada",
    description: "Más de 25 salidas en Bariloche — lagos, montaña y nieve — y excursiones en Chaltén, Calafate y Madryn. Mirá fotos, detalles e inclusiones y consultá por WhatsApp.",
    href: "/excursiones",
    image: "/images/imagenes-home/20260212_125159.jpg",
    imageAlt: "Navegación frente al glaciar — excursión en Patagonia",
    imagePosition: "object-[56%_40%] md:object-[58%_38%]",
    status: "live",
  },
];

export function getCatalogHubPillar(slug: CatalogHubPillar["slug"]) {
  return CATALOG_HUB_PILLARS.find((pillar) => pillar.slug === slug);
}
