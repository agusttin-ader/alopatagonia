import { CLIENT_ABOUT_US_COPY } from "@/lib/client-protected-copy";
import { HERO_IMAGE, SECTION_IDS } from "@/lib/constants";

export const QUIENES_SOMOS_PATH = `/#${SECTION_IDS.aboutUs}` as const;
export const ESCAPADAS_EXPRESS_PATH = `/#${SECTION_IDS.escapadasExpress}` as const;

export const ABOUT_US_COPY = {
  title: CLIENT_ABOUT_US_COPY.title,
  heroImage: HERO_IMAGE,
  /** Una por visita, rotan en cada carga de la página. */
  images: [
    {
      src: "/images/quienes-somos/quienes-somos-1.jpg",
      alt: "Playa de lago patagónico rodeada de bosque y montañas",
    },
    {
      src: "/images/quienes-somos/quienes-somos-2.jpg",
      alt: "Río de aguas cristalinas con muelles de madera en la Patagonia",
    },
    {
      src: "/images/quienes-somos/quienes-somos-3.jpg",
      alt: "Glaciar Perito Moreno y montañas en El Calafate",
    },
    {
      src: "/images/quienes-somos/quienes-somos-4.jpg",
      alt: "Muelle de madera en lago patagónico con montañas al fondo",
    },
  ],
  paragraphs: [...CLIENT_ABOUT_US_COPY.paragraphs],
  closing: CLIENT_ABOUT_US_COPY.closing,
} as const;

export const ESCAPADAS_EXPRESS_COPY = {
  title: "Escapadas express",
  subtitle: "Paquetes listos para vivir la Patagonia sin complicaciones.",
  body:
    "Estamos armando propuestas listas para reservar. Mientras tanto, escribinos y te ayudamos a planear tu viaje.",
} as const;
