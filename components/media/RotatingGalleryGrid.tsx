"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useLayoutEffect, useReducer } from "react";

import { CatalogItemGallery } from "@/components/catalog/CatalogItemGallery";
import { gallerySelectionReducer } from "@/lib/gallery-rotation";
import type { CatalogImage } from "@/lib/catalog/types";
import {
  CATALOG_GALLERY_GRID_HEIGHT,
  GALLERY_MAX_FLEX,
  GALLERY_NAV_BUTTON_SIZE,
  GALLERY_NAV_ROW_GAP,
} from "@/lib/layout-shell";
import { cn } from "@/lib/utils";

const DESKTOP_DISPLAY_COUNT = 6;

const GRID_FADE = {
  duration: 0.58,
  ease: [0.22, 1, 0.36, 1] as const,
};

const NAV_BUTTON_CLASS = cn(
  "inline-flex shrink-0 items-center justify-center rounded-full border border-border/80 bg-card text-foreground shadow-sm",
  GALLERY_NAV_BUTTON_SIZE,
  "transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "disabled:pointer-events-none disabled:opacity-35",
);

type RotatingGalleryGridProps = {
  images: CatalogImage[];
  className?: string;
  onImageClick: (index: number) => void;
};

function GalleryNavButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled?: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const label =
    direction === "prev" ? "Ver fotos anteriores" : "Ver más fotos";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={NAV_BUTTON_CLASS}
    >
      <Icon className="size-5 min-[1920px]:size-6 min-[2560px]:size-7" aria-hidden />
    </button>
  );
}

export function RotatingGalleryGrid({
  images,
  className,
  onImageClick,
}: RotatingGalleryGridProps) {
  const total = images.length;
  const reduceMotion = useReducedMotion();
  const [{ sets: selectionSets, index: setIndex }, dispatch] = useReducer(
    gallerySelectionReducer,
    { sets: [], index: 0 },
  );

  useLayoutEffect(() => {
    dispatch({ type: "init", total, displayCount: DESKTOP_DISPLAY_COUNT });
  }, [total]);

  const goPrev = useCallback(() => {
    dispatch({ type: "prev" });
  }, []);

  const goNext = useCallback(() => {
    dispatch({ type: "next", total, displayCount: DESKTOP_DISPLAY_COUNT });
  }, [total]);

  const pickedIndices = selectionSets[setIndex] ?? null;
  const isReady = pickedIndices !== null;
  const canNavigate = total > DESKTOP_DISPLAY_COUNT;
  const canGoPrev = canNavigate && setIndex > 0;

  const visibleImages =
    pickedIndices?.map((imageIndex) => images[imageIndex]).filter(Boolean) ?? [];

  const openLightbox = useCallback(
    (slotIndex: number) => {
      const globalIndex = pickedIndices?.[slotIndex];
      if (globalIndex !== undefined) {
        onImageClick(globalIndex);
      }
    },
    [onImageClick, pickedIndices],
  );

  if (total === 0) return null;

  return (
    <div className={cn("flex items-center justify-center", GALLERY_NAV_ROW_GAP, className)} aria-live="polite">
      {canNavigate ? (
        <GalleryNavButton direction="prev" onClick={goPrev} disabled={!canGoPrev} />
      ) : null}

      <div className={cn("flex-1", GALLERY_MAX_FLEX)}>
        {isReady ? (
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={setIndex}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={reduceMotion ? { duration: 0 } : GRID_FADE}
            >
              <CatalogItemGallery images={visibleImages} onImageClick={openLightbox} />
            </motion.div>
          </AnimatePresence>
        ) : (
          <div
            className={cn(
              "overflow-hidden rounded-2xl lg:rounded-3xl min-[1920px]:rounded-[1.75rem]",
              CATALOG_GALLERY_GRID_HEIGHT,
            )}
            aria-hidden
          >
            <div className="app-image-pulse size-full" />
          </div>
        )}
      </div>

      {canNavigate ? <GalleryNavButton direction="next" onClick={goNext} /> : null}
    </div>
  );
}
