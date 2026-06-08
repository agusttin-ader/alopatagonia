"use client";

import { useState } from "react";

import { CatalogImageCarousel } from "@/components/catalog/CatalogImageCarousel";
import { RotatingGalleryGrid } from "@/components/media/RotatingGalleryGrid";
import { ImageLightbox } from "@/components/media/ImageLightbox";
import type { CatalogImage } from "@/lib/catalog/types";
import { cn } from "@/lib/utils";

type CatalogDetailGalleryProps = {
  images: CatalogImage[];
  className?: string;
  lightboxLabel?: string;
  /** Tap en fotos del carrusel mobile abre lightbox. Desactivado en alojamientos. */
  enableMobileLightbox?: boolean;
};

export function CatalogDetailGallery({
  images,
  className,
  lightboxLabel = "Vista ampliada de alojamiento",
  enableMobileLightbox = true,
}: CatalogDetailGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  return (
    <>
      <div className={cn(className)}>
        <div className="lg:hidden">
          <CatalogImageCarousel
            images={images}
            onImageClick={enableMobileLightbox ? setLightboxIndex : undefined}
          />
        </div>

        <div className="hidden lg:block">
          <RotatingGalleryGrid images={images} onImageClick={setLightboxIndex} />
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
