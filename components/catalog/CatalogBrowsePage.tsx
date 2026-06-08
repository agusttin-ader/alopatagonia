"use client";

import Link from "next/link";
import { useMemo } from "react";

import { CatalogItemShowcase } from "@/components/catalog/CatalogItemShowcase";
import {
  getCatalogItemBadge,
  groupEntriesByDestination,
  type CatalogItemEntry,
} from "@/lib/catalog/catalog-items";
import type { ExcursionCategory } from "@/lib/catalog/types";

const ACCOMMODATION_MOBILE_VARIANT = "overlay" as const;

type CatalogBrowseMode = "accommodation" | "excursion";

type CatalogBrowsePageProps = {
  mode: CatalogBrowseMode;
  entries: CatalogItemEntry[];
};

const EXCURSION_CATEGORY_LABELS: Record<ExcursionCategory, string> = {
  trekking: "Trekking",
  navegacion: "Navegación",
  fauna: "Fauna",
  aventura: "Aventura",
};

export function CatalogBrowsePage({ mode, entries }: CatalogBrowsePageProps) {
  const destinations = useMemo(() => {
    const grouped = groupEntriesByDestination(entries);
    return Array.from(grouped.entries()).map(([slug, destinationEntries]) => ({
      slug,
      name: destinationEntries[0]!.destination.name,
    }));
  }, [entries]);

  return (
    <section className="mt-10">
      {destinations.length > 1 ? (
        <CatalogDestinationNav destinations={destinations} />
      ) : null}
      <CatalogGroupedSections entries={entries} mode={mode} />
    </section>
  );
}

function CatalogDestinationNav({
  destinations,
}: {
  destinations: { slug: string; name: string }[];
}) {
  return (
    <nav
      aria-label="Ir a destino"
      className="mb-10 flex gap-x-1 overflow-x-auto border-b border-border/70 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {destinations.map((destination, index) => (
        <span key={destination.slug} className="flex shrink-0 items-center">
          {index > 0 ? (
            <span className="mx-2 text-muted-foreground/45" aria-hidden>
              /
            </span>
          ) : null}
          <a
            href={`#${destination.slug}-heading`}
            className="inline-flex min-h-11 items-center rounded-full px-3 py-2 text-sm font-medium text-muted-foreground underline-offset-4 transition hover:bg-muted/45 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2"
          >
            {destination.name}
          </a>
        </span>
      ))}
    </nav>
  );
}

export function CatalogItemGrid({
  entries,
  mode,
  showDestination = false,
}: {
  entries: CatalogItemEntry[];
  mode: CatalogBrowseMode;
  showDestination?: boolean;
}) {
  return (
    <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
      {entries.map((entry) => (
        <CatalogItemShowcase
          key={`${entry.destination.slug}-${entry.item.id}`}
          item={entry.item}
          destinationSlug={entry.destination.slug}
          badge={getCatalogItemBadge(entry)}
          mobileCardVariant={
            mode === "accommodation" ? ACCOMMODATION_MOBILE_VARIANT : undefined
          }
          destinationLabel={
            showDestination
              ? `${entry.destination.name} · ${entry.destination.region}`
              : undefined
          }
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

export function CatalogGroupedSections({
  entries,
  mode,
}: {
  entries: CatalogItemEntry[];
  mode: CatalogBrowseMode;
}) {
  const grouped = groupEntriesByDestination(entries);

  return (
    <div className="space-y-14">
      {Array.from(grouped.entries()).map(([slug, destinationEntries]) => {
        const destination = destinationEntries[0]?.destination;
        if (!destination) return null;

        return (
          <section
            key={slug}
            aria-labelledby={`${slug}-heading`}
            className="scroll-mt-24 sm:scroll-mt-28"
          >
            <div className="mb-6 flex flex-col gap-3 border-b border-border/70 pb-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  id={`${slug}-heading`}
                  className="font-heading text-2xl font-medium tracking-tight sm:text-3xl"
                >
                  {destination.name}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">{destination.region}</p>
              </div>
              <Link
                href={`/destinos/${slug}#${mode === "accommodation" ? "alojamientos-heading" : "excursiones-heading"}`}
                className="inline-flex min-h-11 items-center rounded-full px-3 py-2 text-sm font-medium text-primary underline-offset-4 transition hover:bg-primary/8 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2"
              >
                Ver destino
              </Link>
            </div>
            <CatalogItemGrid entries={destinationEntries} mode={mode} />
          </section>
        );
      })}
    </div>
  );
}
