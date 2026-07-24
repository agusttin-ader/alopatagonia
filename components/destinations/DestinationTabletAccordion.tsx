"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { AppImage } from "@/components/media/AppImage";
import { MobileSnapCarousel } from "@/components/mobile/MobileSnapCarousel";
import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";

import { SECTION_IDS } from "@/lib/constants";
import type { HomeDestinationEditorial } from "@/lib/home-destinations-types";
import { getLocalizedHomeSectionHref } from "@/lib/i18n/internal-href";
import { scrollToHomeSection } from "@/lib/home-sections";
import { cn } from "@/lib/utils";

function uniqueGalleryImages(destination: HomeDestinationEditorial) {
  const seen = new Set<string>();
  return destination.galleryImages.filter((image) => {
    if (seen.has(image.src)) return false;
    seen.add(image.src);
    return true;
  });
}

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
  const href = isHome
    ? `#${SECTION_IDS.catalogHub}`
    : getLocalizedHomeSectionHref(SECTION_IDS.catalogHub);

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) return;

    event.preventDefault();
    scrollToHomeSection(SECTION_IDS.catalogHub, {
      behavior: reduceMotion ? "auto" : "smooth",
    });
    window.history.replaceState(null, "", href);
  };

  return (
    <Link
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
              "lg:mt-4 lg:inline-flex lg:h-11 lg:w-auto lg:justify-center lg:rounded-full lg:border lg:border-primary/35 lg:bg-transparent lg:px-5 lg:py-0 lg:text-sm lg:font-semibold lg:text-primary lg:shadow-none lg:hover:bg-primary/8 lg:hover:no-underline",
            )
          : "text-sm text-primary underline-offset-4 hover:underline",
        className,
      )}
    >
      {t("viewCatalog")}
      <ChevronDown className="size-4 shrink-0 lg:hidden" aria-hidden />
      <ArrowUpRight className="hidden size-4 shrink-0 lg:inline" aria-hidden />
    </Link>
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
  const images = useMemo(() => uniqueGalleryImages(destination), [destination]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [destination.slug]);

  if (images.length === 0) return null;

  const resolveIndex = (image: { src: string; alt: string }) =>
    destination.galleryImages.findIndex((item) => item.src === image.src);

  const hasMultiple = images.length > 1;

  return (
    <div>
      <MobileSnapCarousel
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        aria-label={t("photosOf", { destination: destination.name })}
        trackClassName="gap-3"
        slideClassName={hasMultiple ? "w-[min(20rem,82vw)]" : "w-full"}
      >
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => {
              const galleryIndex = resolveIndex(image);
              onImageClick(galleryIndex >= 0 ? galleryIndex : index);
            }}
            aria-label={t("expandPhotoN", { n: index + 1, destination: destination.name })}
            className={cn(
              "relative w-full overflow-hidden rounded-2xl",
              "aspect-[4/5] min-h-[14rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-lake-foreground/55 focus-visible:ring-offset-2 focus-visible:ring-offset-footer-lake",
            )}
          >
            <AppImage
              src={image.src}
              alt={image.alt}
              fill
              qualityPreset="gallery"
              className="object-cover"
              sizes="(max-width: 767px) 85vw, 300px"
              priority={index === 0}
            />
          </button>
        ))}
      </MobileSnapCarousel>

      {hasMultiple ? (
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {images.map((image, index) => (
            <button
              key={`dot-${image.src}`}
              type="button"
              tabIndex={-1}
              aria-hidden
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === activeIndex
                  ? "w-5 bg-footer-lake-foreground"
                  : "w-1.5 bg-footer-lake-foreground/30",
              )}
            />
          ))}
        </div>
      ) : null}
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
  const thumb = useMemo(() => uniqueGalleryImages(destination)[0], [destination]);

  const wasOpenRef = useRef(isOpen);

  useEffect(() => {
    const opening = isOpen && !wasOpenRef.current;
    wasOpenRef.current = isOpen;
    if (!opening || !itemRef.current) return;

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
          "group flex w-full items-center gap-3.5 py-3 text-left",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-lake-foreground/45 focus-visible:ring-offset-2 focus-visible:ring-offset-footer-lake",
        )}
      >
        {thumb ? (
          <span
            className={cn(
              "relative shrink-0 overflow-hidden rounded-xl transition-all duration-300",
              isOpen
                ? "size-14 ring-2 ring-footer-lake-foreground/45"
                : "size-12 ring-1 ring-white/12",
            )}
            aria-hidden
          >
            <AppImage
              src={thumb.src}
              alt=""
              fill
              qualityPreset="gallery"
              className="object-cover"
              sizes="56px"
            />
            <span
              className={cn(
                "absolute inset-0 transition-opacity duration-300",
                isOpen ? "opacity-0" : "bg-footer-lake/45 opacity-100",
              )}
              aria-hidden
            />
          </span>
        ) : null}

        <span className="min-w-0 flex-1">
          <span
            className={cn(
              "font-heading block truncate font-semibold uppercase leading-[1.05] tracking-[-0.01em] transition-colors duration-300",
              isOpen
                ? "text-[1.4rem] text-footer-lake-foreground"
                : "text-[1.15rem] text-footer-lake-foreground/72 group-hover:text-footer-lake-foreground",
            )}
          >
            {destination.name}
          </span>
          <span
            className={cn(
              "mt-0.5 block truncate text-[10px] font-medium uppercase tracking-[0.12em] transition-colors duration-300",
              isOpen
                ? "text-footer-lake-foreground/58"
                : "text-footer-lake-foreground/42 group-hover:text-footer-lake-foreground/58",
            )}
          >
            {destination.region}
          </span>
        </span>

        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.32, ease: MOBILE_MOTION_EASE }}
          className="shrink-0 text-footer-lake-foreground/45"
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


export function DestinationTabletAccordion({
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

