"use client";

import { useEffect } from "react";
import { AppImage } from "@/components/media/AppImage";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { IMAGE_SIZES } from "@/lib/image-config";

export type LightboxImage = {
  src: string;
  alt: string;
};

type ImageLightboxProps = {
  images: LightboxImage[];
  activeIndex: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
  ariaLabel?: string;
};

export function ImageLightbox({
  images,
  activeIndex,
  onClose,
  onIndexChange,
  ariaLabel = "Vista ampliada de imagen",
}: ImageLightboxProps) {
  const activeImage = activeIndex !== null ? images[activeIndex] : null;
  const hasMultiple = images.length > 1;

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft" && hasMultiple) {
        onIndexChange(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
      } else if (event.key === "ArrowRight" && hasMultiple) {
        onIndexChange(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, hasMultiple, images.length, onClose, onIndexChange]);

  return (
    <AnimatePresence>
      {activeImage && activeIndex !== null ? (
        <motion.div
          className="fixed inset-0 z-[1450] flex items-center justify-center bg-black/88 p-3"
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <button
            type="button"
            className="absolute inset-0"
            onClick={onClose}
            aria-label="Cerrar vista ampliada"
          />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-[max(0.75rem,env(safe-area-inset-right))] top-[max(0.75rem,env(safe-area-inset-top))] z-[2] inline-flex size-11 items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            aria-label="Cerrar"
          >
            <X className="size-5" />
          </button>

          {hasMultiple ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onIndexChange(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
                }}
                className="absolute left-[max(0.45rem,env(safe-area-inset-left))] top-1/2 z-[2] inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:left-4"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onIndexChange(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
                }}
                className="absolute right-[max(0.45rem,env(safe-area-inset-right))] top-1/2 z-[2] inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:right-4"
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          ) : null}

          <motion.div
            key={activeImage.src}
            className="relative z-[1] flex h-[min(90vh,820px)] w-[min(92vw,1100px)] flex-col items-center"
            initial={{ opacity: 0, scale: 0.985, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.985, y: 8 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative h-full w-full">
              <AppImage
                src={activeImage.src}
                alt={activeImage.alt}
                fill
                qualityPreset="lightbox"
                className="rounded-2xl object-contain"
                sizes={IMAGE_SIZES.lightbox}
                priority
              />
            </div>
            {hasMultiple ? (
              <p className="mt-3 text-sm tabular-nums text-white/75">
                {activeIndex + 1} / {images.length}
              </p>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
