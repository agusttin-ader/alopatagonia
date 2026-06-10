import { ABOUT_US_COPY } from "@/lib/about-pages";
import {
  IMAGE_PRELOAD_WIDTH,
  IMAGE_QUALITY_HERO,
  buildNextImageUrl,
  preloadOptimizedImage,
  preloadOptimizedImagesIdle,
} from "@/lib/image-config";

const ROTATION_STORAGE_KEY = "alo-about-image-rotation";

const ABOUT_US_PRELOAD = {
  width: IMAGE_PRELOAD_WIDTH.heroDesktop,
  quality: IMAGE_QUALITY_HERO,
} as const;

export function getAboutUsImageUrl(src: string): string {
  return buildNextImageUrl(src, ABOUT_US_PRELOAD);
}

export function peekAboutImageIndex(total = ABOUT_US_COPY.images.length): number {
  if (typeof window === "undefined") return 0;

  try {
    const previous = Number(window.localStorage.getItem(ROTATION_STORAGE_KEY) ?? "-1");
    return (Number.isInteger(previous) ? previous + 1 : 0) % total;
  } catch {
    return 0;
  }
}

export function commitAboutImageIndex(index: number): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(ROTATION_STORAGE_KEY, String(index));
  } catch {
    // ignore
  }
}

/** Precarga la foto activa ya; el resto en idle. */
export function preloadAboutUsImages(): void {
  if (typeof window === "undefined") return;

  const nextIndex = peekAboutImageIndex();
  const active = ABOUT_US_COPY.images[nextIndex];
  const rest = ABOUT_US_COPY.images.filter((_, index) => index !== nextIndex).map((img) => img.src);

  preloadOptimizedImage(active.src, { ...ABOUT_US_PRELOAD, highPriority: true });
  preloadOptimizedImagesIdle(rest, ABOUT_US_PRELOAD);
}
