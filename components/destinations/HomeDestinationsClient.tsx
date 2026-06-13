"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import { AppImage } from "@/components/media/AppImage";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState, type MouseEvent, type TouchEvent } from "react";

import { Reveal } from "@/components/motion/reveal";
import { SECTION_IDS } from "@/lib/constants";
import { IMAGE_SIZES } from "@/lib/image-config";
import type { HomeDestinationEditorial } from "@/lib/home-destinations-types";
import { getHomeSectionHref, scrollToHomeSection } from "@/lib/home-sections";
import { SPREAD_TILE_HOVER_EXPAND } from "@/lib/hover-expand-motion";
import { MOBILE_MAGAZINE_G_ENABLED } from "@/lib/mobile-magazine-g";
import { cn } from "@/lib/utils";

const DESTINATION_NAME_MOTION = {
  active: { scale: 1.06 },
  idle: { scale: 1 },
};

function CatalogLink({
  className,
  mobileProminent = false,
  compactMobile = false,
}: {
  className?: string;
  mobileProminent?: boolean;
  compactMobile?: boolean;
}) {
  const t = useTranslations("homeDestinations");
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const isHome = pathname === "/";
  const href = getHomeSectionHref(SECTION_IDS.catalogHub, isHome);

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) return;

    event.preventDefault();
    scrollToHomeSection(SECTION_IDS.catalogHub, {
      behavior: reduceMotion ? "auto" : "smooth",
    });
    window.history.replaceState(null, "", href);
  };

  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
        mobileProminent
          ? cn(
              compactMobile ? "mt-0 py-2.5" : "mt-4 py-3",
              "w-full rounded-full px-4 text-sm font-semibold",
              "bg-footer-lake-foreground text-footer-lake",
              "shadow-[0_12px_28px_-16px_rgba(0,0,0,0.5)]",
              "max-md:focus-visible:ring-white/45 max-md:focus-visible:ring-offset-footer-lake",
              "lg:mt-4 lg:w-auto lg:justify-start lg:rounded-none lg:bg-transparent lg:px-0 lg:py-0 lg:text-sm lg:font-medium lg:text-primary lg:shadow-none lg:underline-offset-4 lg:hover:underline",
            )
          : "text-sm text-primary underline-offset-4 hover:underline",
        className,
      )}
    >
      {t("viewCatalog")}
      <ChevronDown className="size-4 shrink-0 lg:hidden" aria-hidden />
      <ArrowUpRight className="hidden size-4 shrink-0 lg:inline" aria-hidden />
    </a>
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
  const t = useTranslations("homeDestinations");
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

const MOBILE_MOTION_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const MOBILE_ACCORDION_CONTENT_VARIANTS = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.06 },
  },
  closed: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
} as const;

const MOBILE_ACCORDION_ITEM_VARIANTS = {
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: MOBILE_MOTION_EASE },
  },
  closed: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.22, ease: MOBILE_MOTION_EASE },
  },
} as const;

function DestinationMobileImageCarousel({
  destination,
  onImageClick,
}: {
  destination: HomeDestinationEditorial;
  onImageClick: (index: number) => void;
}) {
  const t = useTranslations("homeDestinations");
  const reduceMotion = useReducedMotion();
  const images = useMemo(() => uniqueGalleryImages(destination), [destination]);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setActiveIndex(0);
  }, [destination.slug]);

  if (images.length === 0) return null;

  const resolveIndex = (image: { src: string; alt: string }) =>
    destination.galleryImages.findIndex((item) => item.src === image.src);

  const shiftSlide = (direction: 1 | -1) => {
    setActiveIndex((current) => (current + direction + images.length) % images.length);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (images.length <= 1 || !touchStart.current) return;

    const touch = event.changedTouches[0];
    if (!touch) return;

    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) return;

    if (deltaX < 0) shiftSlide(1);
    else shiftSlide(-1);
  };

  const handleSlideClick = (index: number, image: { src: string; alt: string }) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
      return;
    }
    const galleryIndex = resolveIndex(image);
    onImageClick(galleryIndex >= 0 ? galleryIndex : index);
  };

  const hasMultiple = images.length > 1;
  const transitionClass = reduceMotion
    ? ""
    : "transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

  return (
    <div
      className="overflow-hidden touch-pan-y"
      aria-label={t("photosOf", { destination: destination.name })}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className={cn("flex gap-2 will-change-transform", transitionClass)}
        style={
          hasMultiple
            ? {
                transform: `translateX(calc((100% - 78%) / 2 - ${activeIndex} * (78% + 0.5rem)))`,
              }
            : undefined
        }
      >
        {images.map((image, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={image.src}
              type="button"
              onClick={() => handleSlideClick(index, image)}
              aria-label={
                isActive
                  ? t("expandPhotoN", { n: index + 1, destination: destination.name })
                  : t("viewPhotoN", { n: index + 1, destination: destination.name })
              }
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "relative shrink-0 overflow-hidden",
                "aspect-[3/4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-lake-foreground/55 focus-visible:ring-offset-2 focus-visible:ring-offset-footer-lake",
                "transition-opacity duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                hasMultiple ? "w-[78%]" : "mx-auto w-[min(100%,20rem)]",
                isActive ? "opacity-100" : "opacity-55",
              )}
            >
              <AppImage
                src={image.src}
                alt={image.alt}
                fill
                qualityPreset="gallery"
                className="object-cover"
                sizes="(max-width: 767px) 78vw, 300px"
                priority={index === 0}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DestinationMobileAccordionItem({
  destination,
  isOpen,
  onToggle,
  onImageClick,
  reduceMotion,
}: {
  destination: HomeDestinationEditorial;
  isOpen: boolean;
  onToggle: () => void;
  onImageClick: (index: number) => void;
  reduceMotion: boolean | null;
}) {
  const itemRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen || !itemRef.current) return;
    const frameId = window.requestAnimationFrame(() => {
      itemRef.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "nearest",
      });
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [isOpen, reduceMotion]);

  return (
    <article ref={itemRef} className="transition-colors duration-300">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onToggle}
        className={cn(
          "group flex w-full items-start justify-between gap-3 py-3.5 text-left",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-lake-foreground/45 focus-visible:ring-offset-2 focus-visible:ring-offset-footer-lake",
        )}
      >
        <span className="min-w-0 flex-1">
          <DestinationName
            name={destination.name}
            isActive={isOpen}
            disableScale={Boolean(reduceMotion)}
            className={cn(
              "font-heading block font-semibold uppercase leading-[0.94] tracking-[-0.02em] transition-colors duration-300",
              isOpen
                ? "text-[clamp(1.35rem,5.8vw,1.72rem)] text-footer-lake-foreground"
                : "text-[clamp(1.15rem,4.8vw,1.45rem)] text-footer-lake-foreground/36 group-hover:text-footer-lake-foreground/56",
            )}
          />
          <span
            className={cn(
              "mt-1.5 block text-[10px] font-medium uppercase tracking-[0.12em] transition-colors duration-300",
              isOpen
                ? "text-footer-lake-foreground/58"
                : "text-footer-lake-foreground/32 group-hover:text-footer-lake-foreground/46",
            )}
          >
            {destination.region}
          </span>
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.32, ease: MOBILE_MOTION_EASE }}
          className="mt-1 shrink-0 text-footer-lake-foreground/45"
          aria-hidden
        >
          <ChevronDown className={cn("size-5", isOpen && "text-footer-lake-foreground/72")} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key={`panel-${destination.slug}`}
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: MOBILE_MOTION_EASE }}
            className="overflow-hidden"
          >
            <motion.div
              variants={MOBILE_ACCORDION_CONTENT_VARIANTS}
              initial="closed"
              animate="open"
              exit="closed"
              className="space-y-4 px-0.5 pb-6 pt-0.5"
            >
              <motion.div variants={MOBILE_ACCORDION_ITEM_VARIANTS}>
                <DestinationMobileImageCarousel
                  destination={destination}
                  onImageClick={onImageClick}
                />
              </motion.div>

              <motion.p
                variants={MOBILE_ACCORDION_ITEM_VARIANTS}
                className="text-[0.9375rem] leading-[1.55] text-footer-lake-foreground/86"
              >
                {destination.description}
              </motion.p>

              <motion.div
                variants={MOBILE_ACCORDION_ITEM_VARIANTS}
                className="max-w-[calc(100%-3.25rem)]"
              >
                <CatalogLink mobileProminent compactMobile />
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}


function DestinationMobileAccordion({
  destinations,
  openSlug,
  onToggle,
  onImageClick,
}: {
  destinations: HomeDestinationEditorial[];
  openSlug: string | null;
  onToggle: (slug: string) => void;
  onImageClick: (destination: HomeDestinationEditorial, index: number) => void;
}) {
  const t = useTranslations("homeDestinations");
  const reduceMotion = useReducedMotion();

  return (
    <div className="divide-y divide-white/10">
      {destinations.map((destination) => (
        <DestinationMobileAccordionItem
          key={destination.slug}
          destination={destination}
          isOpen={destination.slug === openSlug}
          onToggle={() => onToggle(destination.slug)}
          onImageClick={(index) => onImageClick(destination, index)}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
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
            className="aspect-[16/12] max-h-[min(52vh,420px)] w-full rounded-[1.35rem]"
            sizes={IMAGE_SIZES.galleryTile}
            priority
            animated={animated}
          />
        ) : (
          <div className="relative flex h-[min(46vh,380px)] gap-2.5 xl:gap-3">
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
        <p className="mt-3 line-clamp-2 text-[0.9375rem] leading-snug text-muted-foreground sm:text-lg lg:mt-4">
          {destination.description}
        </p>
        <CatalogLink mobileProminent />
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
  const [mobileOpenSlug, setMobileOpenSlug] = useState<string | null>(
    destinations[0]?.slug ?? null,
  );
  const [lightbox, setLightbox] = useState<{ slug: string; index: number } | null>(null);

  const activeDestination = useMemo(
    () => destinations.find((item) => item.slug === activeSlug) ?? destinations[0],
    [activeSlug, destinations],
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

  const openMobileAccordion = (slug: string) => {
    setMobileOpenSlug((current) => (current === slug ? null : slug));
  };

  const openLightbox = (destination: HomeDestinationEditorial, index: number) => {
    setLightbox({ slug: destination.slug, index });
  };

  const openDesktopLightbox = (index: number) => {
    if (!activeDestination) return;
    setLightbox({ slug: activeDestination.slug, index });
  };

  useEffect(() => {
    setLightbox(null);
  }, [activeSlug, mobileOpenSlug]);

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
        MOBILE_MAGAZINE_G_ENABLED &&
          "max-md:bg-footer-lake max-md:px-4 max-md:pb-24 max-md:pt-10 max-md:text-footer-lake-foreground",
      )}
      aria-labelledby="destinos-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <Reveal className="max-w-3xl max-md:max-w-none 2xl:max-w-4xl">
          <h2
            id="destinos-heading"
            className={cn(
              "font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl 2xl:text-5xl",
              MOBILE_MAGAZINE_G_ENABLED &&
                "max-md:text-footer-lake-foreground max-md:text-[1.75rem] max-md:leading-tight",
            )}
          >
            {t("title")}
          </h2>
          <div
            className={cn(
              "mt-4 space-y-2 text-lg leading-relaxed text-muted-foreground max-md:mt-3 max-md:space-y-1.5 max-md:text-[0.9375rem] max-md:leading-snug 2xl:text-xl",
              MOBILE_MAGAZINE_G_ENABLED && "max-md:text-footer-lake-foreground/78",
            )}
          >
            <p>{t("lead")}</p>
            <p>{t("cta")}</p>
          </div>
        </Reveal>

        <div className="mt-5 grid gap-6 max-md:mt-4 lg:mt-12 lg:grid-cols-[minmax(260px,0.9fr)_1.1fr] lg:items-start 2xl:gap-12">
          <div className="min-w-0 lg:hidden">
            <DestinationMobileAccordion
              destinations={destinations}
              openSlug={mobileOpenSlug}
              onToggle={openMobileAccordion}
              onImageClick={openLightbox}
            />
          </div>

          <Reveal>
            <motion.ul layout className="hidden space-y-0.5 lg:block">
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
                        "rounded-xl px-1 py-1.5",
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
                <DestinationEditorialSpread
                  destination={activeDestination}
                  onImageClick={openDesktopLightbox}
                />
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-6 text-center max-md:mt-5 max-md:pb-2 lg:mt-12">
          <Link
            href="/destinos"
            className={cn(
              "text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
              MOBILE_MAGAZINE_G_ENABLED &&
                "max-md:text-footer-lake-foreground/72 max-md:text-xs max-md:font-normal max-md:no-underline max-md:hover:text-footer-lake-foreground",
            )}
          >
            {t("viewAll")}
          </Link>
        </Reveal>
      </div>

      {MOBILE_MAGAZINE_G_ENABLED ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-b from-transparent to-secondary/35 md:hidden"
          aria-hidden
        />
      ) : null}

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
