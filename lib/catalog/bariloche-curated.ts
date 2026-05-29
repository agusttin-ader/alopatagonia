/**
 * Imágenes curadas de Bariloche: bari1–bari4 (una por tipo de carpeta).
 * - bari1 → departamentos
 * - bari2 → cabañas
 * - bari3, bari4 → hoteles (hostel en catálogo)
 */
const BARILOCHE_ROOT = "/images/destinations/bariloche";

export const BARILOCHE_CURATED = {
  departamento: `${BARILOCHE_ROOT}/Bariloche dptos/bari1.jpg`,
  cabana: `${BARILOCHE_ROOT}/Bariloche cabañas/bari2.jpg`,
  hotel3: `${BARILOCHE_ROOT}/Bariloche Hoteles/bari3.jpg`,
  hotel4: `${BARILOCHE_ROOT}/Bariloche Hoteles/bari4.jpg`,
} as const;

/** Orden editorial en home: depto, cabaña, hotel, hotel */
export const BARILOCHE_EDITORIAL_IMAGES = [
  BARILOCHE_CURATED.departamento,
  BARILOCHE_CURATED.cabana,
  BARILOCHE_CURATED.hotel3,
  BARILOCHE_CURATED.hotel4,
] as const;

export const BARILOCHE_HERO_IMAGE = BARILOCHE_CURATED.hotel3;
