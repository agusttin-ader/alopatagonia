export type CatalogHubPillar = {
  slug: "destinos" | "alojamientos" | "excursiones";
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  status: "live" | "coming-soon";
};

/** Esqueleto editorial — reemplazar copy e imágenes cuando el catálogo esté completo. */
export const CATALOG_HUB_PILLARS: CatalogHubPillar[] = [
  {
    slug: "destinos",
    title: "Destinos",
    eyebrow: "Por zona",
    description: "Bariloche, El Chaltén, Madryn y más. Elegí la base de tu viaje.",
    href: "/destinos",
    image: "/images/destinations/bariloche/Bariloche Hoteles/bari3.jpg",
    imageAlt: "Vista de Bariloche — Patagonia",
    status: "live",
  },
  {
    slug: "alojamientos",
    title: "Alojamientos",
    eyebrow: "Cabañas · Deptos · Hostels",
    description: "Opciones reales por destino. Consultá disponibilidad por WhatsApp.",
    href: "/alojamientos",
    image: "/images/destinations/bariloche/Bariloche cabañas/bari2.jpg",
    imageAlt: "Cabaña en Bariloche",
    status: "coming-soon",
  },
  {
    slug: "excursiones",
    title: "Excursiones",
    eyebrow: "Por temporada",
    description: "Trekking, navegación, fauna y más. Coordinamos según clima y fechas.",
    href: "/excursiones",
    image: "/images/destinations/chalten/IMG-20260525-WA0136.jpg",
    imageAlt: "Montaña en El Chaltén",
    status: "coming-soon",
  },
];

export function getCatalogHubPillar(slug: CatalogHubPillar["slug"]) {
  return CATALOG_HUB_PILLARS.find((pillar) => pillar.slug === slug);
}
