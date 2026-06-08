import { getDestinationAccommodationCoverImages } from "@/lib/catalog/accommodation-items";

const BARILOCHE_ROOT = "/images/destinations/bariloche";
const BARILOCHE_ALOJAMIENTOS = `${BARILOCHE_ROOT}/alojamientos`;

const covers = getDestinationAccommodationCoverImages("bariloche");

export const BARILOCHE_CURATED = {
  departamento:
    covers.departamento ??
    `${BARILOCHE_ALOJAMIENTOS}/Bariloche dptos/Dpto 1/IMG-20260205-WA0029.jpg`,
  cabana:
    covers.cabana ??
    `${BARILOCHE_ALOJAMIENTOS}/Bariloche cabañas/Casa calma/IMG-20260205-WA0029.jpg`,
  hotel3:
    covers.hotel ??
    `${BARILOCHE_ALOJAMIENTOS}/Bariloche Hoteles/Hotel 1⭐️/Screenshot_20240402_092933_Chrome.jpg`,
  hotel4:
    covers.hotel ??
    `${BARILOCHE_ALOJAMIENTOS}/Bariloche Hoteles/Hotel 4 ⭐️/Screenshot_20250528_221412_Chrome.jpg`,
} as const;

/** Orden editorial en home: depto, cabaña, hotel, hotel */
export const BARILOCHE_EDITORIAL_IMAGES = [
  BARILOCHE_CURATED.departamento,
  BARILOCHE_CURATED.cabana,
  BARILOCHE_CURATED.hotel3,
  BARILOCHE_CURATED.hotel4,
] as const;

export const BARILOCHE_HERO_IMAGE = `${BARILOCHE_ROOT}/banner-bariloche.jpg`;
