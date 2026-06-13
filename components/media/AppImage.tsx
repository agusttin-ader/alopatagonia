"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useEffect, useState } from "react";

import {
  IMAGE_BLUR_PLACEHOLDER,
  IMAGE_QUALITY_BY_PRESET,
  type ImageQualityPreset,
} from "@/lib/image-config";
import { cn } from "@/lib/utils";

export type { ImageQualityPreset };

export type AppImageProps = ImageProps & {
  /** Resuelve `quality` si no se pasa explícito. */
  qualityPreset?: ImageQualityPreset;
  /** Placeholder blur (default true en fotos; false en logos/SVG). */
  withBlur?: boolean;
  /** Pulso tipo latido mientras carga (default true; false solo en SVG). */
  loadingPulse?: boolean;
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

function shouldUseLoadingPulse(
  src: ImageProps["src"],
  loadingPulse?: boolean,
): boolean {
  if (loadingPulse === false) return false;
  if (loadingPulse === true) return true;

  const path = resolveSrcPath(src);
  if (!path) return true;
  return !path.endsWith(".svg");
}

export function AppImage({
  quality,
  qualityPreset = "default",
  withBlur,
  loadingPulse,
  placeholder,
  blurDataURL,
  loading,
  priority,
  decoding = "async",
  src,
  alt,
  className,
  onLoad,
  fill,
  width,
  height,
  ...props
}: AppImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const useBlur = shouldUseBlur(src, withBlur);
  const usePulse = shouldUseLoadingPulse(src, loadingPulse);
  const resolvedPlaceholder =
    placeholder ?? (useBlur && !usePulse ? "blur" : "empty");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setLoaded(false);
  }, [src]);

  const handleLoad = useCallback(
    (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setLoaded(true);
      onLoad?.(event);
    },
    [onLoad],
  );

  const handleRef = useCallback(
    (node: HTMLImageElement | null) => {
      if (!mounted) return;
      if (node?.complete && node.naturalWidth > 0) {
        setLoaded(true);
      }
    },
    [mounted],
  );

  const imageNode = (
    <Image
      ref={handleRef}
      src={src}
      alt={alt ?? ""}
      fill={fill}
      width={width}
      height={height}
      {...props}
      quality={quality ?? IMAGE_QUALITY_BY_PRESET[qualityPreset]}
      priority={priority}
      fetchPriority={priority ? "high" : undefined}
      loading={priority ? undefined : (loading ?? "lazy")}
      placeholder={resolvedPlaceholder}
      blurDataURL={
        resolvedPlaceholder === "blur"
          ? (blurDataURL ?? IMAGE_BLUR_PLACEHOLDER)
          : undefined
      }
      decoding={decoding}
      onLoad={handleLoad}
      className={cn(
        className,
        usePulse &&
          "transition-opacity duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
        usePulse && (loaded ? "opacity-100" : "opacity-0"),
        usePulse && (fill ? "z-[1]" : "relative z-[1]"),
      )}
    />
  );

  if (!usePulse) {
    return imageNode;
  }

  const showPulse = mounted && !loaded;

  if (fill) {
    return (
      <>
        {showPulse ? (
          <span className="app-image-pulse pointer-events-none absolute inset-0 z-0" aria-hidden />
        ) : null}
        {imageNode}
      </>
    );
  }

  return (
    <span className="relative inline-block max-w-full align-top">
      {showPulse ? (
        <span
          className="app-image-pulse pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
          aria-hidden
        />
      ) : null}
      {imageNode}
    </span>
  );
}
