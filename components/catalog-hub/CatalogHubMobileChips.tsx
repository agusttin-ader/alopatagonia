"use client";

import { useCallback, useState } from "react";

import { CATALOG_HUB_PILLARS } from "@/lib/catalog-hub/config";
import { MOBILE_MAGAZINE_G_ENABLED } from "@/lib/mobile-magazine-g";
import { cn } from "@/lib/utils";

export function CatalogHubMobileChips({ className }: { className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToPillar = useCallback((slug: string, index: number) => {
    setActiveIndex(index);
    document.getElementById(`hub-card-${slug}`)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, []);

  if (!MOBILE_MAGAZINE_G_ENABLED) return null;

  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden",
        className,
      )}
      role="tablist"
      aria-label="Categorías del catálogo"
    >
      {CATALOG_HUB_PILLARS.map((pillar, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={pillar.slug}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => scrollToPillar(pillar.slug, index)}
            className={cn(
              "shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition duration-300",
              isActive
                ? "bg-foreground text-background shadow-sm"
                : "bg-card text-foreground ring-1 ring-border/75",
            )}
          >
            {pillar.title}
          </button>
        );
      })}
    </div>
  );
}
