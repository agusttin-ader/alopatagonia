"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { EscapadasExpressMedia } from "@/components/about/EscapadasExpressMedia";
import { MagazinePillCta } from "@/components/ui/magazine-pill-cta";
import { getWhatsAppUrl } from "@/lib/constants";
import type { EscapadaExpressPromo } from "@/lib/escapadas-express";
import { cn } from "@/lib/utils";

type EscapadasExpressMobileDeckProps = {
  promos: EscapadaExpressPromo[];
};

function formatIndex(value: number) {
  return String(value).padStart(2, "0");
}

const SECTION_BG =
  "bg-[linear-gradient(180deg,color-mix(in_srgb,var(--secondary)_88%,var(--background))_0%,color-mix(in_srgb,var(--secondary)_52%,var(--background))_100%)]";

export function EscapadasExpressMobileDeck({ promos }: EscapadasExpressMobileDeckProps) {
  const t = useTranslations("promosPatagonia");
  const scrollerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  const [active, setActive] = useState(0);

  const count = promos.length;

  useEffect(() => () => window.cancelAnimationFrame(rafRef.current), []);

  const centerOffsetFor = (index: number) => {
    const scroller = scrollerRef.current;
    const child = scroller?.children[index] as HTMLElement | undefined;
    if (!scroller || !child) return 0;
    return child.offsetLeft - (scroller.clientWidth - child.clientWidth) / 2;
  };

  const handleScroll = () => {
    if (rafRef.current) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = 0;
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const viewportCenter = scroller.scrollLeft + scroller.clientWidth / 2;
      let closest = 0;
      let minDelta = Infinity;
      Array.from(scroller.children).forEach((node, index) => {
        const child = node as HTMLElement;
        const childCenter = child.offsetLeft + child.clientWidth / 2;
        const delta = Math.abs(childCenter - viewportCenter);
        if (delta < minDelta) {
          minDelta = delta;
          closest = index;
        }
      });
      setActive(closest);
    });
  };

  const scrollToIndex = (index: number) => {
    scrollerRef.current?.scrollTo({ left: centerOffsetFor(index), behavior: "smooth" });
  };

  if (count === 0) return null;

  const hasMultiple = count > 1;

  return (
    <div className={cn("px-5 pb-14 pt-14", SECTION_BG)}>
      <header className="mb-6 max-w-md">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {t("packagesLabel")}
        </p>
        <h2 className="font-heading mt-2 text-[1.75rem] font-semibold leading-tight tracking-tight text-foreground">
          {t("title")}
        </h2>
        <p className="mt-2 text-[0.9375rem] leading-snug text-muted-foreground">
          {t("subtitle")}
        </p>
      </header>

      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        aria-roledescription="carousel"
        aria-label={t("sectionAria")}
        className={cn(
          "-mx-5 flex gap-3 overflow-x-auto scroll-smooth px-[7vw] pb-1",
          "snap-x snap-mandatory touch-pan-x overscroll-x-contain",
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {promos.map((promo, index) => (
          <article
            key={promo.id}
            className={cn(
              "flex shrink-0 snap-center flex-col overflow-hidden rounded-[1.5rem] bg-card",
              "shadow-[0_18px_44px_-28px_rgba(0,0,0,0.5)] ring-1 ring-black/5",
              "w-[86vw]",
            )}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
              <EscapadasExpressMedia
                media={promo.media}
                isActive={index === active}
                priority={index === 0}
                qualityPreset="card"
                sizes="86vw"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                aria-hidden
              />
              {promo.badge ? (
                <span className="absolute left-3 top-3 rounded-full bg-black/55 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
                  {promo.badge}
                </span>
              ) : null}
            </div>

            <div className="flex flex-1 flex-col p-4">
              <p className="text-[0.66rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {t("promoIndex", { index: formatIndex(index + 1) })}
              </p>
              <h3 className="font-heading mt-1 text-xl font-semibold tracking-tight text-foreground">
                {promo.title}
              </h3>
              <p className="mt-1 text-sm leading-snug text-muted-foreground">
                {promo.subtitle}
              </p>

              {promo.highlights.length > 0 ? (
                <ul className="mt-3 space-y-1.5">
                  {promo.highlights.slice(0, 3).map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-[0.8125rem] leading-snug text-foreground/80"
                    >
                      <span
                        className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/70"
                        aria-hidden
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <MagazinePillCta
                href={getWhatsAppUrl(promo.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                tone="cta"
                className="mt-4"
              >
                {t("consultCta")}
              </MagazinePillCta>
            </div>
          </article>
        ))}
      </div>

      {hasMultiple ? (
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {promos.map((promo, index) => (
            <button
              key={`dot-${promo.id}`}
              type="button"
              aria-label={t("viewPromo", { title: promo.title })}
              onClick={() => scrollToIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === active ? "w-5 bg-foreground/70" : "w-1.5 bg-foreground/25",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
