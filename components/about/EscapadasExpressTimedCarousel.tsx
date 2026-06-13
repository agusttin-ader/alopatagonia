"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

import { EscapadasExpressMedia } from "@/components/about/EscapadasExpressMedia";
import { EscapadasExpressThumbnailCard } from "@/components/about/EscapadasExpressThumbnailCard";
import { MagazinePillCta } from "@/components/ui/magazine-pill-cta";
import type { EscapadaExpressPromo } from "@/lib/escapadas-express";
import { getWhatsAppUrl } from "@/lib/constants";
import { IMAGE_SIZES } from "@/lib/image-config";
import { SHELL_MAX, SHELL_PX } from "@/lib/layout-shell";
import { cn } from "@/lib/utils";

const ROTATE_MS = 6000;
const EASE = [0.22, 1, 0.36, 1] as const;
const FADE_MS = 0.55;
const TEXT_MS = 0.42;
const LAYOUT_TWEEN = { duration: 0.65, ease: EASE } as const;

/** Altura fija alineada a la sección Indumentaria — no crece al cambiar de promo. */
const SECTION_SHELL =
  "min-h-[40rem] lg:h-[37rem] lg:max-h-[37rem] lg:overflow-hidden";

type EscapadasExpressTimedCarouselProps = {
  promos: EscapadaExpressPromo[];
};

function formatIndex(value: number) {
  return String(value).padStart(2, "0");
}

export function EscapadasExpressTimedCarousel({ promos }: EscapadasExpressTimedCarouselProps) {
  const t = useTranslations("promosPatagonia");
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = promos.length;
  const activePromo = promos[activeIndex] ?? promos[0];
  const autoRotate = total > 1 && !reduceMotion && !isPaused;
  const useSharedLayout = !reduceMotion;

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      setActiveIndex(((index % total) + total) % total);
    },
    [total],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (!autoRotate) return;
    const timer = window.setInterval(goNext, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [autoRotate, goNext]);

  if (!activePromo) return null;

  const whatsappUrl = getWhatsAppUrl(activePromo.whatsappMessage);

  return (
    <div
      className={cn("relative w-full overflow-hidden bg-black", SECTION_SHELL)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
    >
      <LayoutGroup id="promos-patagonia">
        <div className="relative size-full" aria-roledescription="carousel" aria-label={t("sectionAria")}>
          {useSharedLayout ? (
            <motion.div
              key={activePromo.id}
              layoutId={`promo-cover-${activePromo.id}`}
              className="absolute inset-0 z-0 overflow-hidden bg-black"
              transition={LAYOUT_TWEEN}
            >
              <div className="absolute inset-0 brightness-[0.92]">
                <EscapadasExpressMedia
                  media={activePromo.media}
                  priority
                  isActive
                  qualityPreset="hero"
                  sizes={IMAGE_SIZES.promoCover}
                />
              </div>
            </motion.div>
          ) : (
            <AnimatePresence initial={false}>
              <motion.div
                key={activePromo.id}
                className="absolute inset-0 z-0 overflow-hidden bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: FADE_MS, ease: EASE }}
              >
                <div className="absolute inset-0 brightness-[0.92]">
                  <EscapadasExpressMedia
                    media={activePromo.media}
                    priority
                    isActive
                    qualityPreset="hero"
                    sizes={IMAGE_SIZES.promoCover}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          <div className="pointer-events-none absolute inset-0 z-[1] bg-black/20" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/55 via-black/28 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/50 via-transparent to-black/15"
            aria-hidden
          />

          <div
            className={cn(
              "relative z-10 flex h-full min-h-0 flex-col",
              SHELL_MAX,
              SHELL_PX,
              "py-14 sm:py-16",
            )}
          >
            <div className="grid h-full min-h-0 flex-1 items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-10 xl:gap-12">
              <div className="flex min-h-0 flex-col lg:max-w-xl lg:justify-between">
                <div className="shrink-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
                    {t("packagesLabel")}
                  </p>
                  <h2
                    id="promos-patagonia-heading"
                    className="font-heading mt-2 text-2xl font-semibold tracking-tight text-white sm:mt-3 sm:text-3xl lg:text-4xl"
                  >
                    {t("title")}
                  </h2>
                  <p className="mt-2 line-clamp-2 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
                    {t("subtitle")}
                  </p>
                </div>

                <div className="mt-5 flex min-h-0 flex-1 flex-col sm:mt-6 lg:mt-0 lg:justify-end">
                  <div className="min-h-[14.5rem] sm:min-h-[15rem] lg:min-h-[15.5rem]">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={activePromo.id}
                        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                        transition={{ duration: reduceMotion ? 0 : TEXT_MS, ease: EASE }}
                        className="flex flex-col"
                      >
                        <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-white/72 sm:text-xs">
                          {t("promoIndex", { index: formatIndex(activeIndex + 1) })}
                        </p>
                        <h3 className="font-heading mt-2 text-[clamp(1.75rem,4vw,2.65rem)] font-semibold leading-[1.08] tracking-tight text-white">
                          {activePromo.title}
                        </h3>
                        <p className="mt-2 text-base leading-snug text-white/88 sm:text-lg">
                          {activePromo.subtitle}
                        </p>
                        {activePromo.badge ? (
                          <p className="mt-1.5 text-sm font-medium text-white/72">
                            {activePromo.badge}
                          </p>
                        ) : null}
                        <p className="mt-1.5 hidden text-sm leading-relaxed text-white/78 sm:block">
                          {activePromo.highlights.slice(0, 2).join(" · ")}
                        </p>
                        <MagazinePillCta
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          tone="surface"
                          className="mt-4 max-w-sm sm:mt-5"
                        >
                          {t("consultCta")}
                        </MagazinePillCta>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {total > 1 ? (
                    <div className="mt-4 flex shrink-0 items-center gap-4 sm:mt-5">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={goPrev}
                          aria-label={t("prevPromo")}
                          className="inline-flex size-9 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:size-10"
                        >
                          <ChevronLeft className="size-4" aria-hidden />
                        </button>
                        <button
                          type="button"
                          onClick={goNext}
                          aria-label={t("nextPromo")}
                          className="inline-flex size-9 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white backdrop-blur-sm transition hover:bg-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:size-10"
                        >
                          <ChevronRight className="size-4" aria-hidden />
                        </button>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-medium tabular-nums tracking-[0.12em] text-white/75">
                        <span>{formatIndex(activeIndex + 1)}</span>
                        <div className="relative h-px w-14 overflow-hidden bg-white/25 sm:w-24">
                          <motion.div
                            className="absolute inset-y-0 left-0 bg-white"
                            animate={{ width: `${((activeIndex + 1) / total) * 100}%` }}
                            transition={{ duration: 0.55, ease: EASE }}
                          />
                        </div>
                        <span>{formatIndex(total)}</span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              {total > 1 ? (
                <div className="flex min-h-0 items-end justify-center lg:justify-end">
                  <motion.div
                    layout
                    className="flex max-w-full items-end gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-2.5 lg:gap-3 [&::-webkit-scrollbar]:hidden"
                  >
                    <AnimatePresence mode="popLayout" initial={false}>
                      {promos.map((promo, index) => {
                        if (index === activeIndex) return null;

                        return (
                          <EscapadasExpressThumbnailCard
                            key={promo.id}
                            promo={promo}
                            index={index}
                            onSelect={() => goTo(index)}
                          />
                        );
                      })}
                    </AnimatePresence>
                  </motion.div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </LayoutGroup>
    </div>
  );
}
