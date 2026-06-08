"use client";

import { useCallback, useEffect, useState } from "react";
import { AppImage } from "@/components/media/AppImage";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { IMAGE_SIZES } from "@/lib/image-config";
import {
  LIGHTBOX_CONTROL_SIZE,
  LIGHTBOX_FRAME,
} from "@/lib/layout-shell";
import { cn } from "@/lib/utils";

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

const SWIPE_OFFSET = 48;
const SWIPE_VELOCITY = 420;

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "16%" : "-16%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-16%" : "16%",
    opacity: 0,
  }),
};

export function ImageLightbox({
  images,
  activeIndex,
  onClose,
  onIndexChange,
  ariaLabel = "Vista ampliada de imagen",
}: ImageLightboxProps) {
  const reduceMotion = useReducedMotion();
  const [direction, setDirection] = useState(0);

  const activeImage = activeIndex !== null ? images[activeIndex] : null;
  const hasMultiple = images.length > 1;

  const goTo = useCallback(
    (index: number, slideDirection: number) => {
      setDirection(slideDirection);
      onIndexChange(index);
    },
    [onIndexChange],
  );

  const goPrev = useCallback(() => {
    if (activeIndex === null || !hasMultiple) return;
    goTo(activeIndex === 0 ? images.length - 1 : activeIndex - 1, -1);
  }, [activeIndex, goTo, hasMultiple, images.length]);

  const goNext = useCallback(() => {
    if (activeIndex === null || !hasMultiple) return;
    goTo(activeIndex === images.length - 1 ? 0 : activeIndex + 1, 1);
  }, [activeIndex, goTo, hasMultiple, images.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft" && hasMultiple) {
        goPrev();
      } else if (event.key === "ArrowRight" && hasMultiple) {
        goNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, goNext, goPrev, hasMultiple, onClose]);

  return (
    <AnimatePresence>
      {activeImage && activeIndex !== null ? (
        <motion.div
          className="fixed inset-0 z-[1450] flex items-center justify-center bg-black/88 p-3 min-[1920px]:p-5 min-[2560px]:p-6"
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
            className={cn(
              "absolute right-[max(0.75rem,env(safe-area-inset-right))] top-[max(0.75rem,env(safe-area-inset-top))] z-[2] inline-flex items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
              LIGHTBOX_CONTROL_SIZE,
            )}
            aria-label="Cerrar"
          >
            <X className="size-5 min-[1920px]:size-6" />
          </button>

          {hasMultiple ? (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goPrev();
                }}
                className={cn(
                  "absolute left-[max(0.45rem,env(safe-area-inset-left))] top-1/2 z-[2] hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:inline-flex sm:left-4",
                  LIGHTBOX_CONTROL_SIZE,
                )}
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  goNext();
                }}
                className={cn(
                  "absolute right-[max(0.45rem,env(safe-area-inset-right))] top-1/2 z-[2] hidden -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black md:inline-flex sm:right-4",
                  LIGHTBOX_CONTROL_SIZE,
                )}
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          ) : null}

          <div className={cn("relative z-[1] flex flex-col items-center", LIGHTBOX_FRAME)}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={`${activeIndex}-${activeImage.src}`}
                custom={direction}
                variants={reduceMotion ? undefined : slideVariants}
                initial={reduceMotion ? false : "enter"}
                animate="center"
                exit={reduceMotion ? undefined : "exit"}
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                drag={hasMultiple && !reduceMotion ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.14}
                onDragEnd={(_, info) => {
                  if (!hasMultiple) return;
                  if (info.offset.x <= -SWIPE_OFFSET || info.velocity.x <= -SWIPE_VELOCITY) {
                    goNext();
                  } else if (info.offset.x >= SWIPE_OFFSET || info.velocity.x >= SWIPE_VELOCITY) {
                    goPrev();
                  }
                }}
                className={cn(
                  "relative h-full w-full touch-pan-y",
                  hasMultiple && !reduceMotion && "cursor-grab active:cursor-grabbing",
                )}
              >
                <AppImage
                  src={activeImage.src}
                  alt={activeImage.alt}
                  fill
                  qualityPreset="lightbox"
                  className="rounded-2xl object-contain"
                  sizes={IMAGE_SIZES.lightbox}
                  priority
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>
            {hasMultiple ? (
              <p className="mt-3 text-sm tabular-nums text-white/75">
                {activeIndex + 1} / {images.length}
              </p>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
