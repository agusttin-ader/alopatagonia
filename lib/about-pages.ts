import { HERO_IMAGE, SECTION_IDS } from "@/lib/constants";

export const QUIENES_SOMOS_PATH = `/#${SECTION_IDS.aboutUs}` as const;
export const ESCAPADAS_EXPRESS_PATH = `/#${SECTION_IDS.escapadasExpress}` as const;

export const ABOUT_US_COPY = {
  title: "Quiénes somos",
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
  paragraphs: [
    "Alo_patagonia es una empresa dedicada íntegramente al turismo en la Región Patagonia-argentina.",
    "Porque para nosotros cada pasajero es único...diseñamos experiencias pensadas desde la mirada del viajero, cuidando cada detalle, para que disfrutes de un viaje inolvidable!",
    "Nuestro objetivo es que te lleves los mejores recuerdos, que vivas una experiencia perfecta de principio a fin, para que siempre quieras volver!!",
  ],
  closing: "Si estás list@ para tu próxima aventura...contactános!!",
} as const;

export const ESCAPADAS_EXPRESS_COPY = {
  title: "Escapadas express",
  subtitle: "Paquetes listos para vivir la Patagonia sin complicaciones.",
  body:
    "Estamos armando propuestas listas para reservar. Mientras tanto, escribinos y te ayudamos a planear tu viaje.",
} as const;
