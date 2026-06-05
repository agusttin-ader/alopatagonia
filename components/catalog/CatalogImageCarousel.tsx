"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { CatalogImage } from "@/lib/catalog/types";
import { IMAGE_QUALITY_GALLERY, IMAGE_SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

type CatalogImageCarouselProps = {
  images: CatalogImage[];
  className?: string;
  onImageClick?: (index: number) => void;
};

export function CatalogImageCarousel({
  images,
  className,
  onImageClick,
}: CatalogImageCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = useCallback((index: number) => {
    slideRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  }, []);

  const goPrev = useCallback(() => {
    scrollTo(Math.max(0, activeIndex - 1));
  }, [activeIndex, scrollTo]);

  const goNext = useCallback(() => {
    scrollTo(Math.min(images.length - 1, activeIndex + 1));
  }, [activeIndex, images.length, scrollTo]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || images.length <= 1) return;

    const sync = () => {
      const width = el.clientWidth;
      if (width <= 0) return;
      setActiveIndex(Math.min(images.length - 1, Math.round(el.scrollLeft / width)));
    };

    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [images.length]);

  if (images.length === 0) return null;

  const hasMultiple = images.length > 1;
  const isInteractive = Boolean(onImageClick);

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden rounded-2xl">
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-roledescription="carousel"
          aria-label="Galería de fotos"
        >
          {images.map((image, index) => {
            const slideClassName = cn(
              "relative aspect-[4/5] w-full shrink-0 snap-start snap-always overflow-hidden bg-muted/40",
              isInteractive &&
                "cursor-zoom-in transition active:scale-[0.995] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
            );

          const imageNode = (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              quality={IMAGE_QUALITY_GALLERY}
              className="object-cover"
              sizes={IMAGE_SIZES.catalogItemGallery}
            />
          );

          if (isInteractive) {
            return (
              <button
                key={`${image.src}-${index}`}
                ref={(node) => {
                  slideRefs.current[index] = node;
                }}
                type="button"
                onClick={() => onImageClick?.(index)}
                aria-label={`Ver foto ${index + 1} ampliada`}
                aria-hidden={hasMultiple && index !== activeIndex}
                className={slideClassName}
              >
                {imageNode}
              </button>
            );
          }

          return (
            <div
              key={`${image.src}-${index}`}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
              className={slideClassName}
              aria-hidden={hasMultiple && index !== activeIndex}
            >
              {imageNode}
            </div>
          );
        })}
        </div>
      </div>

      {hasMultiple ? (
        <>
          <button
            type="button"
            onClick={goPrev}
            disabled={activeIndex === 0}
            aria-label="Foto anterior"
            className={cn(
              "absolute left-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full",
              "border border-white/30 bg-black/45 text-white shadow-sm backdrop-blur-sm",
              "transition enabled:hover:bg-black/60 disabled:pointer-events-none disabled:opacity-35",
            )}
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={activeIndex === images.length - 1}
            aria-label="Foto siguiente"
            className={cn(
              "absolute right-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full",
              "border border-white/30 bg-black/45 text-white shadow-sm backdrop-blur-sm",
              "transition enabled:hover:bg-black/60 disabled:pointer-events-none disabled:opacity-35",
            )}
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>

          <div className="mt-3 flex items-center justify-center gap-2">
            {images.map((image, index) => (
              <button
                key={`dot-${image.src}-${index}`}
                type="button"
                aria-label={`Ir a foto ${index + 1}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => scrollTo(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  index === activeIndex
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-muted-foreground/35 hover:bg-muted-foreground/55",
                )}
              />
            ))}
          </div>
          <p className="mt-1 text-center text-xs tabular-nums text-muted-foreground">
            {activeIndex + 1} / {images.length}
          </p>
        </>
      ) : null}
    </div>
  );
}
