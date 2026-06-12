import { CatalogItemShowcase } from "@/components/catalog/CatalogItemShowcase";
import { getCatalogItemBadge, type CatalogItemEntry } from "@/lib/catalog/catalog-items";
import { EXCURSION_CATEGORY_LABELS } from "@/lib/catalog/excursion-categories";
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

export function CatalogItemGrid({
  entries,
  mode,
  gridClassName,
  compact = true,
  compactGap = false,
}: CatalogItemGridProps) {
  return (
    <div
      className={cn(
        "grid",
        compactGap
          ? "gap-x-4 gap-y-8 sm:gap-x-5 sm:gap-y-9 lg:gap-x-6 lg:gap-y-10"
          : CATALOG_GRID_GAP,
        gridClassName ?? "grid-cols-2 lg:grid-cols-3",
      )}
    >
      {entries.map((entry) => (
        <CatalogItemShowcase
          key={`${entry.destination.slug}-${entry.item.id}`}
          item={entry.item}
          destinationSlug={entry.destination.slug}
          badge={getCatalogItemBadge(entry)}
          compact={compact}
          categoryLabel={
            mode === "excursion" && entry.item.category
              ? EXCURSION_CATEGORY_LABELS[entry.item.category]
              : undefined
          }
        />
      ))}
    </div>
  );
}
