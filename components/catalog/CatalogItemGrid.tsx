"use client";

import { useTranslations } from "next-intl";

import { CatalogItemShowcase } from "@/components/catalog/CatalogItemShowcase";
import { MobileCatalogLoadMore } from "@/components/catalog/MobileCatalogLoadMore";
import { getLocalizedCatalogItemBadge } from "@/lib/i18n/localized-catalog";
import type { CatalogItemEntry } from "@/lib/catalog/catalog-items";
import type { ExcursionCategory } from "@/lib/catalog/types";
import { CATALOG_GRID_GAP } from "@/lib/layout-shell";
import { cn } from "@/lib/utils";

export type CatalogGridMode = "accommodation" | "excursion";

type CatalogItemGridProps = {
  entries: CatalogItemEntry[];
  mode: CatalogGridMode;
  gridClassName?: string;
  compact?: boolean;
  compactGap?: boolean;
};

function photoCountLabel(t: ReturnType<typeof useTranslations>, count: number) {
  return count === 1 ? t("photoCountOne") : t("photoCountMany", { count });
}

export function CatalogItemGrid({
  entries,
  mode,
  gridClassName,
  compact = true,
  compactGap = false,
}: CatalogItemGridProps) {
  const t = useTranslations("catalog");

  return (
    <MobileCatalogLoadMore total={entries.length}>
      {(visibleCount) => (
        <div
          className={cn(
            "grid min-w-0",
            compactGap
              ? "gap-x-4 gap-y-8 md:gap-x-5 md:gap-y-9 lg:gap-x-6 lg:gap-y-10"
              : CATALOG_GRID_GAP,
            gridClassName ?? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {entries.slice(0, visibleCount).map((entry) => (
            <CatalogItemShowcase
              key={`${entry.destination.slug}-${entry.item.id}`}
              item={entry.item}
              destinationSlug={entry.destination.slug}
              badge={getLocalizedCatalogItemBadge(t, entry)}
              exploreLabel={t("exploreItem")}
              photoCountLabel={photoCountLabel(t, entry.item.images.length)}
              compact={compact}
              categoryLabel={
                mode === "excursion" && entry.item.category
                  ? t(`excursionCategories.${entry.item.category as ExcursionCategory}`)
                  : undefined
              }
            />
          ))}
        </div>
      )}
    </MobileCatalogLoadMore>
  );
}
