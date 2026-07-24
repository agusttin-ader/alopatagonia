"use client";

import { ExcursionEditorialCard } from "@/components/catalog/ExcursionEditorialCard";
import { MobileCatalogLoadMore } from "@/components/catalog/MobileCatalogLoadMore";
import type { CatalogItemEntry } from "@/lib/catalog/catalog-items";

type ExcursionEditorialListProps = {
  entries: CatalogItemEntry[];
};

export function ExcursionEditorialList({ entries }: ExcursionEditorialListProps) {
  if (entries.length === 0) return null;

  return (
    <MobileCatalogLoadMore total={entries.length}>
      {(visibleCount) => (
        <div className="flex flex-col gap-8 max-md:gap-6 lg:gap-10">
          {entries.slice(0, visibleCount).map((entry, index) => (
            <ExcursionEditorialCard
              key={entry.item.id}
              entry={entry}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      )}
    </MobileCatalogLoadMore>
  );
}
