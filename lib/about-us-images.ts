import { ABOUT_US_COPY } from "@/lib/about-pages";

const ROTATION_STORAGE_KEY = "alo-about-image-rotation";

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

export function getAboutUsFallbackImage() {
  const index = peekAboutImageIndex();
  return ABOUT_US_COPY.images[index] ?? ABOUT_US_COPY.images[0];
}
