"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { AppImage } from "@/components/media/AppImage";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

import { DestinationMobileEditorial } from "@/components/destinations/DestinationMobileEditorial";
import { DestinationTabletAccordion } from "@/components/destinations/DestinationTabletAccordion";
import { Reveal } from "@/components/motion/reveal";
import { SECTION_IDS } from "@/lib/constants";
import { IMAGE_SIZES } from "@/lib/image-config";
import type { HomeDestinationEditorial } from "@/lib/home-destinations-types";
import { SPREAD_TILE_HOVER_EXPAND } from "@/lib/hover-expand-motion";
import { cn } from "@/lib/utils";

const DESTINATION_NAME_MOTION = {
  active: { scale: 1.06 },
  idle: { scale: 1 },
};

function CatalogLink() {
  const t = useTranslations("homeDestinations");

  return (
    <Link
      href={`#${SECTION_IDS.catalogHub}`}
      className={cn(
        "mt-4 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-primary/35 px-5 text-sm font-semibold text-primary transition-colors hover:bg-primary/8",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
      )}
    >
      {t("viewCatalog")}
      <ArrowUpRight className="size-4 shrink-0" aria-hidden />
    </Link>
  );
}

function uniqueGalleryImages(destination: HomeDestinationEditorial) {
  const seen = new Set<string>();
  return destination.galleryImages.filter((image) => {
    if (seen.has(image.src)) return false;
    seen.add(image.src);
    return true;
  });
}

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

function SpreadImageButton({
  image,
  destinationName,
  index,
  onImageClick,
  className,
  sizes,
  priority = false,
  animated = true,
}: {
  image: { src: string; alt: string };
  destinationName: string;
  index: number;
  onImageClick: (index: number) => void;
  className?: string;
  sizes: string;
  priority?: boolean;
  animated?: boolean;
}) {
  const t = useTranslations("homeDestinations");
  const reduceMotion = useReducedMotion();
  const tileClassName = cn(
    "relative overflow-hidden bg-muted shadow-[0_16px_30px_-20px_rgba(15,23,42,0.32)]",
    SPREAD_TILE_HOVER_EXPAND,
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55 focus-visible:ring-offset-2",
    className,
  );

  const content = (
    <AppImage
      src={image.src}
      alt={image.alt}
      fill
      qualityPreset="gallery"
      className="object-cover"
      sizes={sizes}
      priority={priority}
    />
  );

  if (!animated || reduceMotion) {
    return (
      <button
        type="button"
        onClick={() => onImageClick(index)}
        aria-label={t("expandPhoto", { destination: destinationName })}
        className={tileClassName}
      >
        {content}
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={() => onImageClick(index)}
      aria-label={t("expandPhoto", { destination: destinationName })}
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.34,
        delay: 0.05 * index,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={tileClassName}
    >
      {content}
    </motion.button>
  );
}

function DestinationEditorialSpread({
  destination,
  onImageClick,
  animated = true,
}: {
  destination: HomeDestinationEditorial;
  onImageClick: (index: number) => void;
  animated?: boolean;
}) {
  const images = useMemo(() => uniqueGalleryImages(destination), [destination]);
  const hero = images[0];
  const sidePrimary = images[1];
  const sideSecondary = images[2];
  const inset = images[3];

  if (!hero) return null;

  const resolveIndex = (image: { src: string; alt: string }) =>
    destination.galleryImages.findIndex((item) => item.src === image.src);

  return (
    <>
      <div className="hidden lg:block">
        {images.length === 1 ? (
          <SpreadImageButton
            image={hero}
            destinationName={destination.name}
            index={resolveIndex(hero)}
            onImageClick={onImageClick}
            className="aspect-[16/12] max-h-[min(56vh,520px)] w-full rounded-[1.35rem]"
            sizes={IMAGE_SIZES.galleryTile}
            priority
            animated={animated}
          />
        ) : (
          <div className="relative flex h-[min(52vh,460px)] gap-2.5 xl:h-[min(56vh,520px)] xl:gap-3">
            <div className="relative h-full min-w-0 flex-[1.42]">
              <SpreadImageButton
                image={hero}
                destinationName={destination.name}
                index={resolveIndex(hero)}
                onImageClick={onImageClick}
                className="h-full w-full rounded-[1.35rem]"
                sizes="(min-width: 1024px) 36vw, 50vw"
                priority
                animated={animated}
              />

              {inset ? (
                <SpreadImageButton
                  image={inset}
                  destinationName={destination.name}
                  index={resolveIndex(inset)}
                  onImageClick={onImageClick}
                  className="absolute bottom-1 -left-2 z-[2] aspect-[3/4] w-[34%] max-w-[132px] rotate-[-2.5deg] rounded-xl shadow-[0_22px_54px_-26px_rgba(15,23,42,0.5)] ring-2 ring-background"
                  sizes="132px"
                  animated={animated}
                />
              ) : null}
            </div>

            {(sidePrimary || sideSecondary) && (
              <div className="flex h-full min-w-0 flex-[0.68] flex-col gap-2.5 xl:gap-3">
                {sidePrimary ? (
                  <SpreadImageButton
                    image={sidePrimary}
                    destinationName={destination.name}
                    index={resolveIndex(sidePrimary)}
                    onImageClick={onImageClick}
                    className="min-h-0 flex-1 w-full rounded-[1.15rem]"
                    sizes="(min-width: 1024px) 18vw, 28vw"
                    animated={animated}
                  />
                ) : null}
                {sideSecondary ? (
                  <SpreadImageButton
                    image={sideSecondary}
                    destinationName={destination.name}
                    index={resolveIndex(sideSecondary)}
                    onImageClick={onImageClick}
                    className="min-h-0 flex-1 w-full rounded-[1.15rem]"
                    sizes="(min-width: 1024px) 18vw, 28vw"
                    animated={animated}
                  />
                ) : null}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="hidden pe-0 sm:pe-8 lg:block lg:pe-12 xl:pe-14">
        <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-lg lg:mt-5">
          {destination.description}
        </p>
        <CatalogLink />
      </div>
    </>
  );
}

type HomeDestinationsClientProps = {
  destinations: HomeDestinationEditorial[];
};

export function HomeDestinationsClient({ destinations }: HomeDestinationsClientProps) {
  const t = useTranslations("homeDestinations");
  const tCommon = useTranslations("common");
  const [activeSlug, setActiveSlug] = useState(destinations[0]?.slug ?? "");
  const [tabletOpenSlug, setTabletOpenSlug] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ slug: string; index: number } | null>(null);

  const activeDestination = useMemo(
    () => destinations.find((item) => item.slug === activeSlug) ?? destinations[0],
    [activeSlug, destinations],
  );
  const activeDestinationIndex = destinations.findIndex(
    (item) => item.slug === activeDestination.slug,
  );

  const lightboxDestination = useMemo(
    () =>
      lightbox ? destinations.find((item) => item.slug === lightbox.slug) ?? null : null,
    [destinations, lightbox],
  );

  const activeLightboxImage =
    lightbox !== null && lightboxDestination
      ? lightboxDestination.galleryImages[lightbox.index]
      : null;

  const openDesktopLightbox = (index: number) => {
    if (!activeDestination) return;
    setLightbox({ slug: activeDestination.slug, index });
  };

  const openTabletLightbox = (destination: HomeDestinationEditorial, index: number) => {
    setLightbox({ slug: destination.slug, index });
  };

  useEffect(() => {
    setLightbox(null);
  }, [activeSlug, tabletOpenSlug]);

  useEffect(() => {
    if (lightbox === null || !lightboxDestination) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightbox(null);
      } else if (event.key === "ArrowLeft") {
        setLightbox((current) => {
          if (current === null) return current;
          return {
            ...current,
            index:
              current.index === 0
                ? lightboxDestination.galleryImages.length - 1
                : current.index - 1,
          };
        });
      } else if (event.key === "ArrowRight") {
        setLightbox((current) => {
          if (current === null) return current;
          return {
            ...current,
            index:
              current.index === lightboxDestination.galleryImages.length - 1
                ? 0
                : current.index + 1,
          };
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightbox, lightboxDestination]);

  if (!activeDestination || destinations.length === 0) return null;

  return (
    <section
      id={SECTION_IDS.destinations}
      className={cn(
        "relative scroll-mt-24 bg-background px-4 py-12 sm:px-8 sm:py-20 lg:px-14 2xl:px-20",
        "max-md:px-4 max-md:pb-14 max-md:pt-14",
      )}
      aria-labelledby="destinos-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <Reveal className="max-w-3xl max-md:max-w-none 2xl:max-w-4xl">
          <h2
            id="destinos-heading"
            className={cn(
              "font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl 2xl:text-5xl",
              "max-md:text-[clamp(1.75rem,7vw,2.05rem)] max-md:leading-[1.12] max-md:text-brand-forest",
            )}
          >
            {t("title")}
          </h2>
          <p
            className={cn(
              "mt-4 text-lg leading-relaxed text-muted-foreground max-md:mt-3.5 max-md:max-w-[34ch] max-md:text-[0.9rem] max-md:leading-relaxed 2xl:text-xl",
            )}
          >
            {t("lead")}
          </p>
          <p className="mt-2 hidden text-lg leading-relaxed text-muted-foreground md:block 2xl:text-xl">
            {t("cta")}
          </p>
        </Reveal>

        <div className="mt-6 md:hidden">
          <DestinationMobileEditorial destinations={destinations} />
        </div>

        <div className="mt-5 hidden md:mt-8 md:block lg:hidden">
          <DestinationTabletAccordion
            destinations={destinations}
            openSlug={tabletOpenSlug}
            onToggle={(slug) =>
              setTabletOpenSlug((current) => (current === slug ? null : slug))
            }
            onImageClick={openTabletLightbox}
          />
          <div className="mt-6 text-center">
            <Link
              href="/destinos"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
            >
              {t("viewAll")}
            </Link>
          </div>
        </div>

        <div className="mt-5 hidden gap-6 lg:mt-12 lg:grid lg:grid-cols-[minmax(260px,0.9fr)_1.1fr] lg:items-start 2xl:gap-12">
          <Reveal>
            <p className="mb-3 text-xs font-semibold tabular-nums tracking-[0.12em] text-muted-foreground">
              {activeDestinationIndex + 1} / {destinations.length}
            </p>
            <motion.ul layout className="space-y-0.5">
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
                        "rounded-xl px-1 py-1.5 lg:border-l-2 lg:border-transparent lg:pl-4",
                        isActive && "lg:border-primary",
                      )}
                    >
                      <DestinationName
                        name={item.name}
                        isActive={isActive}
                        className={cn(
                          "font-heading block text-[clamp(2rem,6.2vw,4rem)] font-semibold uppercase leading-[0.88] tracking-[-0.02em] transition-colors",
                          isActive
                            ? "text-primary"
                            : "text-black/45 group-hover:text-black/70",
                        )}
                      />
                      <span
                        className={cn(
                          "mt-1 block text-xs font-medium text-muted-foreground transition-colors",
                          isActive
                            ? "text-primary/75"
                            : "text-black/45 group-hover:text-black/65",
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

          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDestination.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                <DestinationEditorialSpread
                  destination={activeDestination}
                  onImageClick={openDesktopLightbox}
                />
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12 hidden text-center lg:block">
          <Link
            href="/destinos"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
          >
            {t("viewAll")}
          </Link>
        </Reveal>
      </div>

      <AnimatePresence>
        {activeLightboxImage && lightboxDestination ? (
          <motion.div
            className="fixed inset-0 z-[1450] flex items-center justify-center bg-black/88 p-3"
            role="dialog"
            aria-modal="true"
            aria-label={t("lightboxOf", { destination: lightboxDestination.name })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <button
              type="button"
              className="absolute inset-0"
              onClick={() => setLightbox(null)}
              aria-label={tCommon("closeExpanded")}
            />

            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute right-[max(0.75rem,env(safe-area-inset-right))] top-[max(0.75rem,env(safe-area-inset-top))] z-[2] inline-flex size-11 items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label={tCommon("close")}
            >
              <X className="size-5" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setLightbox((current) => {
                  if (current === null) return current;
                  return {
                    ...current,
                    index:
                      current.index === 0
                        ? lightboxDestination.galleryImages.length - 1
                        : current.index - 1,
                  };
                });
              }}
              className="absolute left-[max(0.45rem,env(safe-area-inset-left))] top-1/2 z-[2] inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:left-4"
              aria-label={tCommon("prevImage")}
            >
              <ChevronLeft className="size-6" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setLightbox((current) => {
                  if (current === null) return current;
                  return {
                    ...current,
                    index:
                      current.index === lightboxDestination.galleryImages.length - 1
                        ? 0
                        : current.index + 1,
                  };
                });
              }}
              className="absolute right-[max(0.45rem,env(safe-area-inset-right))] top-1/2 z-[2] inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:right-4"
              aria-label={tCommon("nextImage")}
            >
              <ChevronRight className="size-6" />
            </button>

            <motion.div
              key={`${lightboxDestination.slug}-${lightbox?.index ?? 0}`}
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
                qualityPreset="lightbox"
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
