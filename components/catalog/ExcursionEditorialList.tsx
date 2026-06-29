import { ExcursionEditorialCard } from "@/components/catalog/ExcursionEditorialCard";
import type { CatalogItemEntry } from "@/lib/catalog/catalog-items";

type ExcursionEditorialListProps = {
  entries: CatalogItemEntry[];
};

export function ExcursionEditorialList({ entries }: ExcursionEditorialListProps) {
  if (entries.length === 0) return null;

  return (
    <div className="flex flex-col gap-8 lg:gap-10">
      {entries.map((entry, index) => (
        <ExcursionEditorialCard
          key={entry.item.id}
          entry={entry}
          reverse={index % 2 === 1}
        />
      ))}
    </div>
  );
}
