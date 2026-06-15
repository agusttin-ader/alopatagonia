/**
 * Calidad por contexto — AVIF/WebP a estos valores se ve nítido en pantalla
 * con archivos mucho más livianos que JPEG al 100%.
 *
 * Regla: subir calidad en vistas grandes (hero, lightbox); acotar ancho con `sizes`
 * para que el optimizador no sirva píxeles de más en cards.
 */
export const IMAGE_QUALITY_LIGHTBOX = 92 as const;
export const IMAGE_QUALITY_DETAIL = 90 as const;
export const IMAGE_QUALITY_HERO = 90 as const;
export const IMAGE_QUALITY_CARD = 90 as const;
export const IMAGE_QUALITY_GALLERY = 88 as const;
export const IMAGE_QUALITY = 88 as const;
export const IMAGE_QUALITY_INTRO = 88 as const;

/** Placeholder sólido (--muted) — evita bandas de color al escalar blur en mobile/Safari. */
export const IMAGE_BLUR_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHJlY3QgZmlsbD0iI2U4ZGVjZSIgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIi8+PC9zdmc+";

export const IMAGE_SIZES = {
  viewport: "100vw",
  half: "(min-width: 1024px) 50vw, 100vw",
  signature: "(min-width: 1024px) 52vw, 100vw",
  winterSection: "(min-width: 1024px) 44vw, 100vw",
  galleryTile:
    "(max-width: 767px) 46vw, (min-width: 1280px) 28vw, (min-width: 1024px) 36vw, 46vw",
  homeGalleryHero:
    "(max-width: 640px) 52vw, (max-width: 1024px) 50vw, (max-width: 1919px) 45vw, (max-width: 2559px) 900px, (max-width: 3839px) 1100px, 1300px",
  homeGalleryTile:
    "(max-width: 640px) 26vw, (max-width: 1024px) 25vw, (max-width: 1919px) 22vw, (max-width: 2559px) 450px, (max-width: 3839px) 550px, 650px",
  catalogHubCard:
    "(max-width: 767px) 92vw, (max-width: 1024px) 50vw, 33vw",
  catalogCard:
    "(max-width: 767px) 92vw, (max-width: 1024px) 52vw, (max-width: 1280px) 36vw, 560px",
  catalogItemGallery:
    "(max-width: 1024px) 100vw, (min-width: 3840px) 1200px, (min-width: 2560px) 1000px, (min-width: 1920px) 900px, (min-width: 1024px) 70vw, 900px",
  catalogItemThumb:
    "(max-width: 1024px) 30vw, (min-width: 3840px) 480px, (min-width: 2560px) 400px, 200px",
  lightbox:
    "(min-width: 3840px) 1680px, (min-width: 2560px) 1480px, (min-width: 1920px) 1280px, (min-width: 1280px) 1200px, 92vw",
  aboutUsBackground: "100vw",
  destinationHero: "100vw",
  promoCover: "100vw",
  promoThumbnail: "(max-width: 640px) 108px, 128px",
  logo: "160px",
  avatar: "36px",
} as const;

export const IMAGE_PRELOAD_WIDTH = {
  introDesktop: 1280,
  heroDesktop: 1920,
  cardDesktop: 640,
  galleryDesktop: 960,
  lightboxDesktop: 1280,
} as const;

export type ImageQualityPreset =
  | "lightbox"
  | "detail"
  | "hero"
  | "card"
  | "gallery"
  | "default"
  | "intro";

export const IMAGE_QUALITY_BY_PRESET: Record<ImageQualityPreset, number> = {
  lightbox: IMAGE_QUALITY_LIGHTBOX,
  detail: IMAGE_QUALITY_DETAIL,
  hero: IMAGE_QUALITY_HERO,
  card: IMAGE_QUALITY_CARD,
  gallery: IMAGE_QUALITY_GALLERY,
  default: IMAGE_QUALITY,
  intro: IMAGE_QUALITY_INTRO,
};

/** URL del optimizador de Next — usar la misma en `<Image />` y en preload. */
export function buildNextImageUrl(
  src: string,
  options: { width: number; quality?: number } = { width: IMAGE_PRELOAD_WIDTH.heroDesktop },
): string {
  const quality = options.quality ?? IMAGE_QUALITY;
  const params = new URLSearchParams({
    url: src,
    w: String(options.width),
    q: String(quality),
  });
  return `/_next/image?${params.toString()}`;
}

/** Precarga una imagen optimizada (misma URL que Next Image). */
export function preloadOptimizedImage(
  src: string,
  options: { width: number; quality?: number; highPriority?: boolean } = {
    width: IMAGE_PRELOAD_WIDTH.heroDesktop,
  },
): void {
  if (typeof window === "undefined") return;

  const href = buildNextImageUrl(src, options);

  if (!document.querySelector(`link[rel="preload"][href="${href}"]`)) {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = href;
    if (options.highPriority) {
      link.setAttribute("fetchpriority", "high");
    }
    document.head.appendChild(link);
  }

  const img = new Image();
  if (options.highPriority && "fetchPriority" in img) {
    (img as HTMLImageElement & { fetchPriority: string }).fetchPriority = "high";
  }
  img.src = href;
}

/** Precarga el resto en idle para no competir con LCP. */
export function preloadOptimizedImagesIdle(
  sources: string[],
  options: { width: number; quality?: number },
): void {
  if (typeof window === "undefined") return;

  const run = () => {
    for (const src of sources) {
      preloadOptimizedImage(src, options);
    }
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(run, { timeout: 4000 });
  } else {
    setTimeout(run, 1200);
  }
}
