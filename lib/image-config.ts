/**
 * Calidad por contexto: AVIF/WebP a 85–90 suele verse igual que JPEG 100 en pantalla,
 * con archivos mucho más livianos y decode más rápido.
 */
export const IMAGE_QUALITY_GALLERY = 85 as const;
export const IMAGE_QUALITY = 88 as const;
export const IMAGE_QUALITY_HERO = 90 as const;
export const IMAGE_QUALITY_LIGHTBOX = 92 as const;
export const IMAGE_QUALITY_INTRO = 88 as const;

export const IMAGE_SIZES = {
  viewport: "100vw",
  half: "(min-width: 1024px) 50vw, 100vw",
  signature: "(min-width: 1024px) 52vw, 100vw",
  winterSection: "(min-width: 1024px) 44vw, 100vw",
  galleryTile:
    "(max-width: 767px) 46vw, (min-width: 1280px) 28vw, (min-width: 1024px) 36vw, 46vw",
  catalogHubCard:
    "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  catalogCard:
    "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw",
  catalogItemGallery:
    "(max-width: 1024px) 100vw, (min-width: 1024px) 70vw, 900px",
  catalogItemThumb: "(max-width: 1024px) 30vw, 200px",
  lightbox: "(min-width: 1280px) 1200px, 92vw",
} as const;

export const IMAGE_PRELOAD_WIDTH = {
  introDesktop: 1280,
} as const;

/** URL del optimizador de Next para fondos CSS / preload (misma calidad que `<Image />`). */
export function buildNextImageUrl(
  src: string,
  options: { width: number; quality?: number } = { width: 1280 },
): string {
  const quality = options.quality ?? IMAGE_QUALITY;
  const params = new URLSearchParams({
    url: src,
    w: String(options.width),
    q: String(quality),
  });
  return `/_next/image?${params.toString()}`;
}
