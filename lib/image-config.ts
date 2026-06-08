/**
 * Calidad por contexto: AVIF/WebP a 80–88 suele verse igual que JPEG 100 en pantalla,
 * con archivos mucho más livianos y decode más rápido. Lightbox un poco más alto.
 */
export const IMAGE_QUALITY_GALLERY = 82 as const;
export const IMAGE_QUALITY = 85 as const;
export const IMAGE_QUALITY_HERO = 88 as const;
export const IMAGE_QUALITY_LIGHTBOX = 88 as const;
export const IMAGE_QUALITY_INTRO = 85 as const;

/** Placeholder ~10×10 — peso mínimo, evita flash en carga. */
export const IMAGE_BLUR_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A0AAA//Z";

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
    "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  catalogCard:
    "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw",
  catalogItemGallery:
    "(max-width: 1024px) 100vw, (min-width: 1024px) 70vw, 900px",
  catalogItemThumb: "(max-width: 1024px) 30vw, 200px",
  lightbox: "(min-width: 2560px) 1400px, (min-width: 1280px) 1200px, 92vw",
  logo: "160px",
  avatar: "36px",
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
