"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AppImage } from "@/components/media/AppImage";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

import { DestinationMobileEditorial } from "@/components/destinations/DestinationMobileEditorial";
import { DestinationTabletAccordion } from "@/components/destinations/DestinationTabletAccordion";
import { HomeDestinationsBentoGrid } from "@/components/destinations/HomeDestinationsBentoGrid";
import { Reveal } from "@/components/motion/reveal";
import { SECTION_IDS } from "@/lib/constants";
import { IMAGE_SIZES } from "@/lib/image-config";
import type { HomeDestinationEditorial } from "@/lib/home-destinations-types";
import { cn } from "@/lib/utils";

type HomeDestinationsClientProps = {
  destinations: HomeDestinationEditorial[];
};

export function HomeDestinationsClient({ destinations }: HomeDestinationsClientProps) {
  const t = useTranslations("homeDestinations");
  const tCommon = useTranslations("common");
  const [tabletOpenSlug, setTabletOpenSlug] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ slug: string; index: number } | null>(null);

  const lightboxDestination = useMemo(
    () =>
      lightbox ? destinations.find((item) => item.slug === lightbox.slug) ?? null : null,
    [destinations, lightbox],
  );

  const activeLightboxImage =
    lightbox !== null && lightboxDestination
      ? lightboxDestination.galleryImages[lightbox.index]
      : null;

  const openTabletLightbox = (destination: HomeDestinationEditorial, index: number) => {
    setLightbox({ slug: destination.slug, index });
  };

  useEffect(() => {
    setLightbox(null);
  }, [tabletOpenSlug]);

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

  if (destinations.length === 0) return null;

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

        <div className="mt-5 hidden lg:mt-12 lg:block">
          <HomeDestinationsBentoGrid destinations={destinations} />
        </div>

        <Reveal delay={0.1} className="mt-10 hidden text-center lg:block">
          <Link
            href="/destinos"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
          >
            {t("viewAllCount", { count: destinations.length })}
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
