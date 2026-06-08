"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useMemo, useReducer, useState } from "react";

import { AppImage } from "@/components/media/AppImage";
import { ImageLightbox } from "@/components/media/ImageLightbox";
import { Reveal } from "@/components/motion/reveal";
import { HOME_GALLERY_IMAGES, SECTION_IDS } from "@/lib/constants";
import { IMAGE_SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

const DESKTOP_DISPLAY_COUNT = 7;
const MOBILE_DISPLAY_COUNT = 3;
const DISPLAY_COUNT = DESKTOP_DISPLAY_COUNT;

/**
 * Mosaico editorial: hero 50% + 6 tiles en espejo (col central grande arriba,
 * col derecha grande abajo) — referencia catálogo La Guarida.
 */
const GALLERY_SLOTS = [
  { layout: "col-span-2 row-span-12", hero: true },
  { layout: "col-start-3 col-span-1 row-start-1 row-span-6" },
  { layout: "col-start-3 col-span-1 row-start-7 row-span-3" },
  { layout: "col-start-3 col-span-1 row-start-10 row-span-3" },
  { layout: "col-start-4 col-span-1 row-start-1 row-span-3" },
  { layout: "col-start-4 col-span-1 row-start-4 row-span-3" },
  { layout: "col-start-4 col-span-1 row-start-7 row-span-6" },
] as const;

/** Mobile (<sm): hero izquierda (altura completa) + 2 apiladas derecha — llena el cuadrado sin huecos. */
const MOBILE_SLOTS = [
  { layout: "col-span-1 row-span-2", hero: true },
  { layout: "col-start-2 col-span-1 row-start-1 row-span-1" },
  { layout: "col-start-2 col-span-1 row-start-2 row-span-1" },
] as const;

const MOBILE_GRID_FRAME = [
  "grid h-full w-full min-h-0 grid-cols-2 grid-rows-[0.88fr_1.12fr] gap-1.5",
] as const;
const MOBILE_GRID_HEIGHT = ["aspect-square w-full"] as const;

/** Layout de la grilla (sin alto — el contenedor reserva el espacio). */
const GRID_FRAME = [
  "grid w-full min-h-0 grid-cols-4 grid-rows-12",
  "gap-0.5 min-[400px]:gap-1 sm:gap-1 md:gap-1.5 lg:gap-1.5 xl:gap-2",
  "min-[1920px]:gap-2.5 min-[2560px]:gap-3 min-[3840px]:gap-3.5",
] as const;

const GRID_HEIGHT = [
  "h-[min(66vh,480px)]",
  "min-[400px]:h-[min(68vh,540px)]",
  "sm:h-[min(72vh,620px)]",
  "md:h-[min(76vh,700px)]",
  "lg:h-[min(80vh,780px)]",
  "xl:h-[min(84vh,860px)]",
  "2xl:h-[min(86vh,920px)]",
  "min-[1920px]:h-[min(88vh,1000px)]",
  "min-[2560px]:h-[min(90vh,1140px)]",
  "min-[3840px]:h-[min(88vh,1280px)]",
] as const;

const GRID_SHELL = [...GRID_FRAME, ...GRID_HEIGHT] as const;

const MOBILE_GRID_SHELL = [...MOBILE_GRID_FRAME, ...MOBILE_GRID_HEIGHT] as const;

const FADE_EASE = [0.22, 1, 0.36, 1] as const;

const GRID_FADE = {
  duration: 0.58,
  ease: FADE_EASE,
} as const;

const GALLERY_WIDTH = [
  "min-w-0 w-full max-w-[90rem]",
  "min-[1920px]:max-w-[105rem]",
  "min-[2560px]:max-w-[125rem]",
  "min-[3840px]:max-w-[155rem]",
] as const;

const NAV_BUTTON_CLASS = cn(
  "inline-flex shrink-0 items-center justify-center rounded-full border border-border/80 bg-card text-foreground shadow-sm",
  "size-8 min-[400px]:size-9 sm:size-10 md:size-11",
  "transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "disabled:pointer-events-none disabled:opacity-35",
);

function indicesEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort((left, right) => left - right);
  const sortedB = [...b].sort((left, right) => left - right);
  return sortedA.every((value, index) => value === sortedB[index]);
}

function pickRandomIndices(
  total: number,
  count: number,
  exclude?: number[],
): number[] {
  const pickCount = Math.min(count, total);
  if (total <= pickCount) {
    return Array.from({ length: total }, (_, index) => index);
  }

  for (let attempt = 0; attempt < 16; attempt += 1) {
    const pool = Array.from({ length: total }, (_, index) => index);
    for (let i = pool.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const picked = pool.slice(0, pickCount);
    if (!exclude || !indicesEqual(picked, exclude)) {
      return picked;
    }
  }

  if (!exclude?.length) {
    return Array.from({ length: pickCount }, (_, index) => index);
  }

  const offset = (exclude[0] + 1) % total;
  const rotated = Array.from({ length: total }, (_, index) => (index + offset) % total);
  return rotated.slice(0, pickCount);
}

type GallerySelectionState = {
  sets: number[][];
  index: number;
};

type GallerySelectionAction =
  | { type: "init"; total: number }
  | { type: "prev" }
  | { type: "next"; total: number };

function gallerySelectionReducer(
  state: GallerySelectionState,
  action: GallerySelectionAction,
): GallerySelectionState {
  switch (action.type) {
    case "init":
      return {
        sets: [pickRandomIndices(action.total, DISPLAY_COUNT)],
        index: 0,
      };
    case "prev":
      return {
        ...state,
        index: Math.max(0, state.index - 1),
      };
    case "next": {
      if (state.index < state.sets.length - 1) {
        return { ...state, index: state.index + 1 };
      }

      const currentSet = state.sets[state.index];
      if (!currentSet) return state;

      return {
        sets: [...state.sets, pickRandomIndices(action.total, DISPLAY_COUNT, currentSet)],
        index: state.index + 1,
      };
    }
    default:
      return state;
  }
}

function GalleryCell({
  image,
  className,
  priority,
  hero,
  onClick,
  slotLabel,
}: {
  image: (typeof HOME_GALLERY_IMAGES)[number];
  className?: string;
  priority?: boolean;
  hero?: boolean;
  onClick?: () => void;
  slotLabel?: string;
}) {
  const imageNode = (
    <AppImage
      src={image.src}
      alt={image.alt}
      fill
      qualityPreset="gallery"
      withBlur={false}
      sizes={hero ? IMAGE_SIZES.homeGalleryHero : IMAGE_SIZES.homeGalleryTile}
      priority={priority}
      className="object-cover motion-safe:transition motion-safe:duration-500 group-hover:scale-[1.012]"
    />
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={slotLabel ?? `Ver foto ampliada: ${image.alt}`}
        className={cn(
          "group relative min-h-0 min-w-0 overflow-hidden bg-muted text-left",
          "cursor-zoom-in transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className,
        )}
      >
        {imageNode}
      </button>
    );
  }

  return (
    <div className={cn("relative min-h-0 min-w-0 overflow-hidden bg-muted", className)}>
      {imageNode}
    </div>
  );
}

function GallerySkeleton({ mobile = false }: { mobile?: boolean }) {
  return (
    <div className={cn(mobile ? MOBILE_GRID_SHELL : GRID_SHELL)} aria-hidden>
      {(mobile ? MOBILE_SLOTS : GALLERY_SLOTS).map((slot, index) => (
        <div key={index} className={cn("animate-pulse bg-muted/80", slot.layout)} />
      ))}
    </div>
  );
}

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
    direction === "prev" ? "Ver selección anterior" : "Ver otra selección de fotos";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={NAV_BUTTON_CLASS}
    >
      <Icon className="size-4 min-[400px]:size-[1.125rem] sm:size-5" aria-hidden />
    </button>
  );
}

function useMobileGalleryLayout() {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isMobile;
}

export function HomeGallerySection() {
  const images = HOME_GALLERY_IMAGES;
  const total = images.length;
  const reduceMotion = useReducedMotion();
  const isMobileGallery = useMobileGalleryLayout();
  const [{ sets: selectionSets, index: setIndex }, dispatch] = useReducer(
    gallerySelectionReducer,
    { sets: [], index: 0 },
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    dispatch({ type: "init", total });
  }, [total]);

  useEffect(() => {
    setLightboxIndex(null);
  }, [setIndex]);

  const goPrev = useCallback(() => {
    dispatch({ type: "prev" });
  }, []);

  const goNext = useCallback(() => {
    dispatch({ type: "next", total });
  }, [total]);

  const visibleCount = Math.min(DISPLAY_COUNT, total);
  const pickedIndices = selectionSets[setIndex] ?? null;

  const visibleImages = useMemo(() => {
    if (!pickedIndices) return [];
    return Array.from({ length: visibleCount }, (_, slot) => images[pickedIndices[slot]]).filter(
      Boolean,
    );
  }, [images, pickedIndices, visibleCount]);

  const mobileSlotCount = Math.min(MOBILE_DISPLAY_COUNT, visibleCount);
  const mobileLightboxImages = useMemo(
    () => visibleImages.slice(0, mobileSlotCount),
    [visibleImages, mobileSlotCount],
  );
  const lightboxImages = isMobileGallery ? mobileLightboxImages : visibleImages;

  if (total === 0) return null;

  const canNavigate = total > DISPLAY_COUNT;
  const isReady = pickedIndices !== null;
  const canGoPrev = canNavigate && setIndex > 0;

  return (
    <section
      id={SECTION_IDS.gallery}
      className="scroll-mt-24 bg-background py-10 sm:py-12 lg:py-16"
      aria-labelledby="home-gallery-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 2xl:max-w-[90rem] 2xl:px-20">
        <Reveal className="max-w-xl lg:max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Galería
          </p>
          <h2
            id="home-gallery-heading"
            className="font-heading mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl 2xl:text-[2.6rem]"
          >
            Patagonia en imágenes reales
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Una selección distinta en cada visita — rutas, lagos y momentos de viajes
            que armamos.
          </p>
        </Reveal>
      </div>

      <Reveal
        className="mt-6 w-full px-2 min-[400px]:px-4 sm:mt-8 sm:px-6 lg:mt-10 lg:px-10 2xl:px-16 min-[1920px]:px-20 min-[2560px]:px-24 min-[3840px]:px-28"
        delay={0.06}
      >
        <div className="mx-auto w-full">
          <div className="sm:hidden">
            <div className={cn("relative isolate", MOBILE_GRID_HEIGHT)} aria-live="polite">
              {!isReady ? (
                <GallerySkeleton mobile />
              ) : (
                <AnimatePresence initial={false}>
                  <motion.div
                    key={setIndex}
                    className={cn(MOBILE_GRID_FRAME, "absolute inset-0 will-change-[opacity]")}
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={reduceMotion ? { duration: 0 } : GRID_FADE}
                  >
                    {Array.from({ length: mobileSlotCount }, (_, slot) => {
                      const image = images[pickedIndices[slot]];
                      const slotConfig = MOBILE_SLOTS[slot];
                      if (!image || !slotConfig) return null;

                      return (
                        <GalleryCell
                          key={`${setIndex}-mobile-${slot}-${image.src}`}
                          image={image}
                          className={slotConfig.layout}
                          hero={"hero" in slotConfig && slotConfig.hero}
                          priority={setIndex === 0 && slot === 0}
                          onClick={() => setLightboxIndex(slot)}
                          slotLabel={`Ver foto ${slot + 1} ampliada`}
                        />
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {canNavigate ? (
              <div className="mt-3 flex items-center justify-center gap-3">
                <GalleryNavButton direction="prev" onClick={goPrev} disabled={!canGoPrev} />
                <GalleryNavButton direction="next" onClick={goNext} />
              </div>
            ) : null}
          </div>

          <div className="hidden sm:flex sm:items-center sm:justify-center sm:gap-3 md:gap-4">
            {canNavigate ? (
              <GalleryNavButton direction="prev" onClick={goPrev} disabled={!canGoPrev} />
            ) : null}

            <div className={cn(GALLERY_WIDTH, GRID_HEIGHT, "relative isolate")} aria-live="polite">
              {!isReady ? (
                <GallerySkeleton />
              ) : (
                <AnimatePresence initial={false}>
                  <motion.div
                    key={setIndex}
                    className={cn(GRID_FRAME, "absolute inset-0 will-change-[opacity]")}
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0 }}
                    transition={reduceMotion ? { duration: 0 } : GRID_FADE}
                  >
                    {Array.from({ length: visibleCount }, (_, slot) => {
                      const image = images[pickedIndices[slot]];
                      const slotConfig = GALLERY_SLOTS[slot];
                      if (!image || !slotConfig) return null;

                      return (
                        <GalleryCell
                          key={`${setIndex}-${slot}-${image.src}`}
                          image={image}
                          className={slotConfig.layout}
                          hero={"hero" in slotConfig && slotConfig.hero}
                          priority={setIndex === 0 && slot === 0}
                          onClick={() => setLightboxIndex(slot)}
                          slotLabel={`Ver foto ${slot + 1} ampliada`}
                        />
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {canNavigate ? (
              <GalleryNavButton direction="next" onClick={goNext} />
            ) : null}
          </div>
        </div>
      </Reveal>

      <ImageLightbox
        images={lightboxImages}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
        ariaLabel="Vista ampliada de galería Patagonia"
      />
    </section>
  );
}
