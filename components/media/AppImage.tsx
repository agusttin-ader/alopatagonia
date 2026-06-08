import Image, { type ImageProps } from "next/image";

import {
  IMAGE_BLUR_PLACEHOLDER,
  IMAGE_QUALITY,
  IMAGE_QUALITY_GALLERY,
  IMAGE_QUALITY_HERO,
  IMAGE_QUALITY_INTRO,
  IMAGE_QUALITY_LIGHTBOX,
} from "@/lib/image-config";

const QUALITY_BY_PRESET = {
  gallery: IMAGE_QUALITY_GALLERY,
  default: IMAGE_QUALITY,
  hero: IMAGE_QUALITY_HERO,
  intro: IMAGE_QUALITY_INTRO,
  lightbox: IMAGE_QUALITY_LIGHTBOX,
} as const;

export type ImageQualityPreset = keyof typeof QUALITY_BY_PRESET;

export type AppImageProps = ImageProps & {
  /** Resuelve `quality` si no se pasa explícito. */
  qualityPreset?: ImageQualityPreset;
  /** Placeholder blur (default true en fotos; false en logos/SVG). */
  withBlur?: boolean;
};

function resolveSrcPath(src: ImageProps["src"]): string | null {
  if (typeof src === "string") return src;
  if (typeof src === "object" && src !== null && "src" in src) {
    return String(src.src);
  }
  return null;
}

function shouldUseBlur(src: ImageProps["src"], withBlur?: boolean): boolean {
  if (withBlur === false) return false;
  if (withBlur === true) return true;

  const path = resolveSrcPath(src);
  if (!path) return true;
  return !path.endsWith(".svg");
}

export function AppImage({
  quality,
  qualityPreset = "default",
  withBlur,
  placeholder,
  blurDataURL,
  loading,
  priority,
  decoding = "async",
  src,
  ...props
}: AppImageProps) {
  const useBlur = shouldUseBlur(src, withBlur);
  const resolvedPlaceholder = placeholder ?? (useBlur ? "blur" : "empty");

  return (
    <Image
      src={src}
      {...props}
      quality={quality ?? QUALITY_BY_PRESET[qualityPreset]}
      priority={priority}
      loading={priority ? undefined : (loading ?? "lazy")}
      placeholder={resolvedPlaceholder}
      blurDataURL={
        resolvedPlaceholder === "blur"
          ? (blurDataURL ?? IMAGE_BLUR_PLACEHOLDER)
          : undefined
      }
      decoding={decoding}
    />
  );
}
