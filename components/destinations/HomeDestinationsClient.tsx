"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { AppImage } from "@/components/media/AppImage";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { Reveal } from "@/components/motion/reveal";
import { SECTION_IDS } from "@/lib/constants";
import { IMAGE_QUALITY_GALLERY, IMAGE_QUALITY_LIGHTBOX, IMAGE_SIZES } from "@/lib/image-config";
import type { HomeDestinationEditorial } from "@/lib/home-destinations-types";
import { HOME_DESTINATION_GALLERY_MOBILE_COUNT } from "@/lib/home-destinations";
import { MOBILE_MAGAZINE_G_ENABLED } from "@/lib/mobile-magazine-g";
import { useCoarseMobile } from "@/lib/use-coarse-mobile";
import { cn } from "@/lib/utils";

const DESTINATION_NAME_MOTION = {
  active: { scale: 1.06 },
  idle: { scale: 1 },
};

const MOBILE_PANEL_MS = 520;

function DestinationName({
  name,
  isActive,
  className,
  disableScale = false,
}: {
  name: string;
  isActive: boolean;
  className?: string;
  disableScale?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  if (disableScale || reduceMotion) {
    return <span className={cn("inline-block", className)}>{name}</span>;
  }

  return (
    <motion.span
      className={cn("inline-block origin-left", className)}
      initial={false}
      animate={isActive ? DESTINATION_NAME_MOTION.active : DESTINATION_NAME_MOTION.idle}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
    >
      {name}
    </motion.span>
  );
}

function MobileDestinationPanel({
  isActive,
  itemId,
  children,
}: {
  isActive: boolean;
  itemId: string;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setExpanded(false);
      return;
    }

    if (reduceMotion) {
      setExpanded(true);
      return;
    }

    setExpanded(false);
    const frameId = window.requestAnimationFrame(() => {
      setExpanded(true);
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [isActive, itemId, reduceMotion]);

  if (!isActive) return null;

  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows,opacity] ease-[cubic-bezier(0.22,0.03,0.26,1)] motion-reduce:transition-none",
        expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
      style={{ transitionDuration: reduceMotion ? "0ms" : `${MOBILE_PANEL_MS}ms` }}
    >
      <div className="min-h-0 overflow-hidden">
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
}

function DestinationPreview({
  destination,
  onImageClick,
  instant = false,
}: {
  destination: HomeDestinationEditorial;
  onImageClick: (index: number) => void;
  instant?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const isCoarseMobile = useCoarseMobile();
  const useStaticTiles = instant || isCoarseMobile || reduceMotion;

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {destination.galleryImages.map((image, index) => {
          const tileClassName = cn(
            "relative aspect-[5/4] overflow-hidden rounded-2xl bg-muted shadow-[0_16px_30px_-20px_rgba(15,23,42,0.32)] transition-transform hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55 focus-visible:ring-offset-2 sm:aspect-[4/3]",
            index >= HOME_DESTINATION_GALLERY_MOBILE_COUNT && "hidden lg:block",
          );

          if (useStaticTiles) {
            return (
              <button
                type="button"
                key={`${destination.slug}-${index}`}
                onClick={() => onImageClick(index)}
                aria-label={`Ampliar foto de ${destination.name}`}
                className={tileClassName}
              >
                <AppImage
                  src={image.src}
                  alt={image.alt}
                  fill
                  quality={IMAGE_QUALITY_GALLERY}
                  className="object-cover"
                  sizes={IMAGE_SIZES.galleryTile}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : undefined}
                />
              </button>
            );
          }

          return (
            <motion.button
              type="button"
              key={`${destination.slug}-${index}`}
              onClick={() => onImageClick(index)}
              aria-label={`Ampliar foto de ${destination.name}`}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.32,
                delay: 0.04 * index,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={tileClassName}
            >
              <AppImage
                src={image.src}
                alt={image.alt}
                fill
                quality={IMAGE_QUALITY_GALLERY}
                className="object-cover"
                sizes={IMAGE_SIZES.galleryTile}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </motion.button>
          );
        })}
      </div>
      <div className="pe-4 sm:pe-24">
        <p className="mt-4 line-clamp-2 text-base text-muted-foreground sm:mt-5 sm:line-clamp-1 sm:text-lg">
          {destination.description}
        </p>
        <Link
          href={`/destinos/${destination.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
        >
          Ver catálogo
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </>
  );
}

type HomeDestinationsClientProps = {
  destinations: HomeDestinationEditorial[];
};

export function HomeDestinationsClient({ destinations }: HomeDestinationsClientProps) {
  const [activeSlug, setActiveSlug] = useState(destinations[0]?.slug ?? "");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const activeDestination = useMemo(
    () => destinations.find((item) => item.slug === activeSlug) ?? destinations[0],
    [activeSlug, destinations],
  );

  const activeLightboxImage =
    lightboxIndex !== null && activeDestination
      ? activeDestination.galleryImages[lightboxIndex]
      : null;

  useEffect(() => {
    setLightboxIndex(null);
  }, [activeSlug]);

  const handleMobileDestinationSelect = useCallback(
    (slug: string) => {
      if (slug === activeSlug) return;
      const listTop = listRef.current?.getBoundingClientRect().top ?? 0;
      setActiveSlug(slug);
      requestAnimationFrame(() => {
        const nextTop = listRef.current?.getBoundingClientRect().top ?? 0;
        const delta = nextTop - listTop;
        if (delta !== 0) {
          window.scrollBy({ top: delta, behavior: "auto" });
        }
      });
    },
    [activeSlug],
  );

  useEffect(() => {
    if (lightboxIndex === null || !activeDestination) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      } else if (event.key === "ArrowLeft") {
        setLightboxIndex((current) => {
          if (current === null) return current;
          return current === 0 ? activeDestination.galleryImages.length - 1 : current - 1;
        });
      } else if (event.key === "ArrowRight") {
        setLightboxIndex((current) => {
          if (current === null) return current;
          return current === activeDestination.galleryImages.length - 1 ? 0 : current + 1;
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxIndex, activeDestination]);

  if (!activeDestination || destinations.length === 0) return null;

  return (
    <section
      id={SECTION_IDS.destinations}
      className={cn(
        "scroll-mt-24 bg-background px-4 py-12 sm:px-8 sm:py-20 lg:px-14 2xl:px-20",
        MOBILE_MAGAZINE_G_ENABLED &&
          "max-md:bg-footer-lake max-md:px-4 max-md:py-14 max-md:text-footer-lake-foreground",
      )}
      aria-labelledby="destinos-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <Reveal className="max-w-3xl 2xl:max-w-4xl">
          <h2
            id="destinos-heading"
            className={cn(
              "font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl 2xl:text-5xl",
              MOBILE_MAGAZINE_G_ENABLED && "max-md:text-footer-lake-foreground",
            )}
          >
            Destinos
          </h2>
          <p
            className={cn(
              "mt-4 text-lg leading-relaxed text-muted-foreground 2xl:text-xl",
              MOBILE_MAGAZINE_G_ENABLED && "max-md:text-footer-lake-foreground/78",
            )}
          >
            Elegí zona y mirá fotos reales de cada lugar. Después entrá al catálogo o
            consultanos por WhatsApp.
          </p>
        </Reveal>

        <div className="mt-7 grid gap-6 lg:mt-12 lg:grid-cols-[minmax(260px,0.9fr)_1.1fr] lg:items-start 2xl:gap-12">
          <div className="lg:hidden">
            <ul ref={listRef} className="flex flex-col gap-2.5">
              {destinations.map((item) => {
                const isActive = item.slug === activeDestination.slug;

                return (
                  <li
                    key={item.slug}
                    className="scroll-mt-24"
                  >
                    <button
                      type="button"
                      onClick={() => handleMobileDestinationSelect(item.slug)}
                      aria-pressed={isActive}
                      aria-expanded={isActive}
                      className={cn(
                        "group w-full rounded-2xl border px-4 py-3 text-left transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55 focus-visible:ring-offset-2",
                        isActive
                          ? "border-black/18 bg-black/[0.03]"
                          : "border-border/65 bg-card/70",
                        MOBILE_MAGAZINE_G_ENABLED &&
                          "max-md:border-transparent max-md:bg-card max-md:shadow-[0_18px_40px_-28px_rgba(0,0,0,0.55)] max-md:ring-1 max-md:ring-black/6",
                        MOBILE_MAGAZINE_G_ENABLED &&
                          isActive &&
                          "max-md:ring-primary/35",
                      )}
                    >
                      <DestinationName
                        name={item.name}
                        isActive={isActive}
                        disableScale
                        className={cn(
                          "font-heading block text-[clamp(1.5rem,8vw,2.2rem)] font-semibold uppercase leading-[0.9] tracking-[-0.02em]",
                          isActive ? "text-black" : "text-black/58",
                        )}
                      />
                      <span
                        className={cn(
                          "mt-1.5 block text-xs font-medium text-muted-foreground",
                          isActive ? "text-black/70" : "text-black/48",
                        )}
                      >
                        {item.region}
                      </span>
                    </button>

                    <MobileDestinationPanel
                      isActive={isActive}
                      itemId={item.slug}
                    >
                      <DestinationPreview
                        destination={item}
                        onImageClick={setLightboxIndex}
                        instant
                      />
                    </MobileDestinationPanel>
                  </li>
                );
              })}
            </ul>
          </div>

          <Reveal>
            <motion.ul layout className="hidden space-y-2 lg:block">
              {destinations.map((item) => {
                const isActive = item.slug === activeDestination.slug;
                return (
                  <motion.li key={item.slug} layout>
                    <button
                      type="button"
                      onClick={() => setActiveSlug(item.slug)}
                      aria-pressed={isActive}
                      className={cn(
                        "group relative w-full text-left transition",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55 focus-visible:ring-offset-4",
                        "rounded-xl px-1 py-2",
                      )}
                    >
                      <DestinationName
                        name={item.name}
                        isActive={isActive}
                        className={cn(
                          "font-heading block text-[clamp(2rem,6.2vw,5.2rem)] font-semibold uppercase leading-[0.88] tracking-[-0.02em] transition-colors",
                          isActive
                            ? "text-black"
                            : "text-black/32 group-hover:text-black/60",
                        )}
                      />
                      <span
                        className={cn(
                          "mt-1 block text-xs font-medium text-muted-foreground transition-colors",
                          isActive
                            ? "text-black/70"
                            : "text-black/35 group-hover:text-black/55",
                        )}
                      >
                        {item.region}
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </Reveal>

          <Reveal className="hidden lg:sticky lg:block lg:top-28 lg:self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDestination.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                <DestinationPreview
                  destination={activeDestination}
                  onImageClick={setLightboxIndex}
                />
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-10 text-center lg:mt-12">
          <Link
            href="/destinos"
            className={cn(
              "text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
              MOBILE_MAGAZINE_G_ENABLED &&
                "max-md:text-footer-lake-foreground max-md:focus-visible:ring-white/45 max-md:focus-visible:ring-offset-footer-lake",
            )}
          >
            Ver todos los destinos
          </Link>
        </Reveal>
      </div>

      <AnimatePresence>
        {activeLightboxImage ? (
          <motion.div
            className="fixed inset-0 z-[1450] flex items-center justify-center bg-black/88 p-3"
            role="dialog"
            aria-modal="true"
            aria-label={`Vista ampliada de ${activeDestination.name}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <button
              type="button"
              className="absolute inset-0"
              onClick={() => setLightboxIndex(null)}
              aria-label="Cerrar vista ampliada"
            />

            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute right-[max(0.75rem,env(safe-area-inset-right))] top-[max(0.75rem,env(safe-area-inset-top))] z-[2] inline-flex size-11 items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Cerrar"
            >
              <X className="size-5" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setLightboxIndex((current) => {
                  if (current === null) return current;
                  return current === 0
                    ? activeDestination.galleryImages.length - 1
                    : current - 1;
                });
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
                setLightboxIndex((current) => {
                  if (current === null) return current;
                  return current === activeDestination.galleryImages.length - 1
                    ? 0
                    : current + 1;
                });
              }}
              className="absolute right-[max(0.45rem,env(safe-area-inset-right))] top-1/2 z-[2] inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:right-4"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="size-6" />
            </button>

            <motion.div
              key={`${activeDestination.slug}-${lightboxIndex}`}
              className="relative z-[1] h-[min(90vh,820px)] w-[min(92vw,1100px)]"
              initial={{ opacity: 0, scale: 0.985, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.985, y: 8 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            >
              <AppImage
                src={activeLightboxImage.src}
                alt={activeLightboxImage.alt}
                fill
                quality={IMAGE_QUALITY_LIGHTBOX}
                className="rounded-2xl object-contain"
                sizes={IMAGE_SIZES.lightbox}
                priority
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
