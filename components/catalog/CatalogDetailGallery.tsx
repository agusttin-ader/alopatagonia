"use client";

import { useState } from "react";
import Image from "next/image";

import { CatalogImageCarousel } from "@/components/catalog/CatalogImageCarousel";
import { CatalogItemGallery } from "@/components/catalog/CatalogItemGallery";
import { ImageLightbox } from "@/components/media/ImageLightbox";
import type { CatalogImage } from "@/lib/catalog/types";
import { IMAGE_QUALITY_GALLERY, IMAGE_SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

const FEATURED_COUNT = 6;

const MOSAIC_ASPECTS = [
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[5/4]",
  "aspect-[4/3]",
  "aspect-[3/5]",
] as const;

type CatalogDetailGalleryProps = {
  images: CatalogImage[];
  className?: string;
  lightboxLabel?: string;
};

export function CatalogDetailGallery({
  images,
  className,
  lightboxLabel = "Vista ampliada de alojamiento",
}: CatalogDetailGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const featured = images.slice(0, FEATURED_COUNT);
  const overflow = images.slice(FEATURED_COUNT);

  return (
    <>
      <div className={cn(className)}>
        <div className="md:hidden">
          <CatalogImageCarousel images={images} onImageClick={setLightboxIndex} />
        </div>

        <div className="hidden space-y-3 md:block md:space-y-3.5 lg:space-y-4">
          <CatalogItemGallery images={featured} onImageClick={setLightboxIndex} />

          {overflow.length > 0 ? (
            <div className="overflow-hidden rounded-2xl lg:rounded-3xl">
              <div className="columns-2 gap-px md:columns-3 bg-muted/40">
                {overflow.map((image, index) => {
                  const imageIndex = FEATURED_COUNT + index;
                  return (
                    <button
                      key={`${image.src}-${index}`}
                      type="button"
                      onClick={() => setLightboxIndex(imageIndex)}
                      aria-label={`Ver foto ${imageIndex + 1} ampliada`}
                      className={cn(
                        "group relative mb-px block w-full break-inside-avoid overflow-hidden bg-background text-left",
                        "cursor-zoom-in transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
                        MOSAIC_ASPECTS[index % MOSAIC_ASPECTS.length],
                      )}
                    >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      quality={IMAGE_QUALITY_GALLERY}
                      className="object-cover motion-safe:transition motion-safe:duration-300 group-hover:scale-[1.015]"
                      sizes={IMAGE_SIZES.catalogItemThumb}
                    />
                  </button>
                );
              })}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <ImageLightbox
        images={images}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
        ariaLabel={lightboxLabel}
      />
    </>
  );
}
