"use client";

import { useCallback, useRef, useState } from "react";

import type { CatalogHubPillar } from "@/lib/catalog-hub/config";
import { MOBILE_MAGAZINE_G_ENABLED } from "@/lib/mobile-magazine-g";
import { cn, horizontalScrollRailClass } from "@/lib/utils";
import { useTranslations } from "next-intl";

type CatalogHubMobileChipsProps = {
  pillars: CatalogHubPillar[];
  className?: string;
};

export function CatalogHubMobileChips({ pillars, className }: CatalogHubMobileChipsProps) {
  const t = useTranslations("catalogHub");
  const [activeIndex, setActiveIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);

  const scrollToPillar = useCallback((slug: string, index: number) => {
    setActiveIndex(index);
    requestAnimationFrame(() => {
      const activeChip = railRef.current?.querySelector<HTMLElement>(`[data-hub-chip="${slug}"]`);
      activeChip?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      document.getElementById(`hub-card-${slug}`)?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  }, []);

  if (!MOBILE_MAGAZINE_G_ENABLED) return null;

  return (
    <div className={cn("max-w-full overflow-hidden md:hidden", className)}>
      <p className="mb-2.5 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {t("chooseCategory")}
      </p>
      <div className="relative -mx-1 px-1">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-6 bg-gradient-to-r from-secondary/35 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-6 bg-gradient-to-l from-secondary/35 to-transparent"
          aria-hidden
        />
        <div
          ref={railRef}
          className={cn(horizontalScrollRailClass, "relative gap-2 pb-0.5")}
          role="tablist"
          aria-label={t("categoriesAria")}
        >
          {pillars.map((pillar, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={pillar.slug}
                type="button"
                role="tab"
                data-hub-chip={pillar.slug}
                aria-selected={isActive}
                onClick={() => scrollToPillar(pillar.slug, index)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2",
                  isActive
                    ? "bg-foreground text-background shadow-[0_10px_24px_-16px_rgba(0,0,0,0.35)]"
                    : "bg-card/90 text-foreground ring-1 ring-border/70",
                )}
              >
                {pillar.title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
