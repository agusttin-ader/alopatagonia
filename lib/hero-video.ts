/**
 * Videos hero — carrusel hero9 → hero8 → hero2 → … (sin unificar).
 * Regenerar variantes: npm run videos:optimize-hero
 */
export type HeroVideoCandidate =
  | "hero2"
  | "hero3"
  | "hero4"
  | "hero6"
  | "hero7"
  | "hero8"
  | "hero9";

export type HeroVideoTier = "desktop" | "mobile" | "mobileLite";

export const HERO_VIDEO_CAROUSEL_ENABLED = true;

export const HERO_CAROUSEL_CANDIDATES = [
  "hero9",
  "hero8",
  "hero2",
  "hero3",
  "hero4",
  "hero6",
  "hero7",
] as const satisfies readonly HeroVideoCandidate[];

/** Índice del clip siguiente en el carrusel (con wrap). */
export function getNextCarouselIndex(index: number): number {
  return (index + 1) % HERO_CAROUSEL_CANDIDATES.length;
}

/** Crossfade solapado entre clips (ms). */
export const HERO_VIDEO_CROSSFADE_MS = 1200;

/** Velocidad de reproducción del carrusel (1 = normal). */
export const HERO_VIDEO_PLAYBACK_RATE = 1 as const;

const PATHS: Record<
  HeroVideoCandidate,
  { desktop: string; mobile: string; mobileLite: string }
> = {
  hero2: {
    desktop: "/videos/hero2-desktop.mp4",
    mobile: "/videos/hero2-mobile-1080.mp4",
    mobileLite: "/videos/hero2-mobile-720.mp4",
  },
  hero3: {
    desktop: "/videos/hero3-desktop.mp4",
    mobile: "/videos/hero3-mobile-1080.mp4",
    mobileLite: "/videos/hero3-mobile-720.mp4",
  },
  hero4: {
    desktop: "/videos/hero4-desktop.mp4",
    mobile: "/videos/hero4-mobile-1080.mp4",
    mobileLite: "/videos/hero4-mobile-720.mp4",
  },
  hero6: {
    desktop: "/videos/hero6-desktop.mp4",
    mobile: "/videos/hero6-mobile-1080.mp4",
    mobileLite: "/videos/hero6-mobile-720.mp4",
  },
  hero7: {
    desktop: "/videos/hero7-desktop.mp4",
    mobile: "/videos/hero7-mobile-1080.mp4",
    mobileLite: "/videos/hero7-mobile-720.mp4",
  },
  hero8: {
    desktop: "/videos/hero8-desktop.mp4",
    mobile: "/videos/hero8-mobile-1080.mp4",
    mobileLite: "/videos/hero8-mobile-720.mp4",
  },
  hero9: {
    desktop: "/videos/hero9-desktop.mp4",
    mobile: "/videos/hero9-mobile-1080.mp4",
    mobileLite: "/videos/hero9-mobile-720.mp4",
  },
};

export function pickHeroVideoTier(viewportWidth: number): HeroVideoTier {
  if (viewportWidth <= 390) return "mobileLite";
  if (viewportWidth <= 900) return "mobile";
  return "desktop";
}

export function getHeroVideoSrc(
  candidate: HeroVideoCandidate,
  tier: HeroVideoTier,
): string {
  const paths = PATHS[candidate];
  if (tier === "mobileLite") return paths.mobileLite;
  if (tier === "mobile") return paths.mobile;
  return paths.desktop;
}

/** Primer clip del carrusel según ancho de pantalla (para preload durante la intro). */
export function getFirstHeroCarouselSrc(viewportWidth: number): string {
  const candidate = HERO_CAROUSEL_CANDIDATES[0];
  return getHeroVideoSrc(candidate, pickHeroVideoTier(viewportWidth));
}

