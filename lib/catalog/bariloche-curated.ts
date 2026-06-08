/**
 * Imágenes curadas de Bariloche (dentro de alojamientos/).
 * - bari1 → departamentos
 * - bari2 → cabañas
 * - bari3, bari4 → hoteles (hostel en catálogo)
 */
const BARILOCHE_ROOT = "/images/destinations/bariloche";
const BARILOCHE_ALOJAMIENTOS = `${BARILOCHE_ROOT}/alojamientos`;

export const BARILOCHE_CURATED = {
  departamento: `${BARILOCHE_ALOJAMIENTOS}/Bariloche dptos/bari1.jpg`,
  cabana: `${BARILOCHE_ALOJAMIENTOS}/Bariloche cabañas/bari2.jpg`,
  hotel3: `${BARILOCHE_ALOJAMIENTOS}/Bariloche Hoteles/bari3.jpg`,
  hotel4: `${BARILOCHE_ALOJAMIENTOS}/Bariloche Hoteles/bari4.jpg`,
} as const;

/** Orden editorial en home: depto, cabaña, hotel, hotel */
export const BARILOCHE_EDITORIAL_IMAGES = [
  BARILOCHE_CURATED.departamento,
  BARILOCHE_CURATED.cabana,
  BARILOCHE_CURATED.hotel3,
  BARILOCHE_CURATED.hotel4,
] as const;

export const BARILOCHE_HERO_IMAGE = `${BARILOCHE_ROOT}/banner-bariloche.jpg`;
