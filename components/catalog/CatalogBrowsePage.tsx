"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

import { CatalogItemShowcase } from "@/components/catalog/CatalogItemShowcase";
import { EditorialSplitNavItem } from "@/components/catalog/EditorialSplitNavItem";
import {
  getCatalogItemBadge,
  groupEntriesByDestination,
  type CatalogItemEntry,
} from "@/lib/catalog/catalog-items";
import type { ExcursionCategory } from "@/lib/catalog/types";
import { CATALOG_GRID_GAP, DETAIL_STICKY_TOP } from "@/lib/layout-shell";
import { cn } from "@/lib/utils";

const EXCURSION_CATEGORY_LABELS: Record<ExcursionCategory, string> = {
  trekking: "Trekking",
  navegacion: "Navegación",
  fauna: "Fauna",
  aventura: "Aventura",
};

type CatalogBrowseMode = "accommodation" | "excursion";

type CatalogBrowsePageProps = {
  mode: CatalogBrowseMode;
  entries: CatalogItemEntry[];
};

function itemCountLabel(count: number, mode: CatalogBrowseMode) {
  if (mode === "excursion") {
    return count === 1 ? "1 excursión" : `${count} excursiones`;
  }
  return count === 1 ? "1 alojamiento" : `${count} alojamientos`;
}

function destinationSectionHash(mode: CatalogBrowseMode) {
  return mode === "accommodation" ? "alojamientos-heading" : "excursiones-heading";
}

export function CatalogBrowsePage({ mode, entries }: CatalogBrowsePageProps) {
  return (
    <section className="mt-10">
      <CatalogDestinationSplitPanel entries={entries} mode={mode} />
    </section>
  );
}

type DestinationGroup = [string, CatalogItemEntry[]];

function CatalogDestinationSplitPanel({
  entries,
  mode,
}: {
  entries: CatalogItemEntry[];
  mode: CatalogBrowseMode;
}) {
  const destinations = useMemo(
    () => Array.from(groupEntriesByDestination(entries).entries()) as DestinationGroup[],
    [entries],
  );
  const [activeSlug, setActiveSlug] = useState<string>(
    () => destinations[0]?.[0] ?? "",
  );
  const grouped = useMemo(() => groupEntriesByDestination(entries), [entries]);
  const activeEntries = activeSlug ? grouped.get(activeSlug) : undefined;
  const activeDestination = activeEntries?.[0]?.destination;

  if (destinations.length === 0) return null;

  return (
    <div className="min-h-[420px]">
      <div className="lg:hidden">
        <CatalogDestinationTabs
          destinations={destinations}
          activeSlug={activeSlug}
          onSelect={setActiveSlug}
        />
        {activeDestination && activeEntries ? (
          <CatalogDestinationPanel
            slug={activeSlug}
            destination={activeDestination}
            entries={activeEntries}
            mode={mode}
          />
        ) : null}
      </div>

      <div className="hidden lg:grid lg:grid-cols-[minmax(240px,280px)_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[minmax(260px,300px)_minmax(0,1fr)] xl:gap-10 min-[1920px]:gap-12">
        <nav
          aria-label="Elegir destino"
          className={cn(
            "flex flex-col gap-0 border-r border-border/45 pr-5 xl:pr-8 min-[1920px]:pr-10",
            DETAIL_STICKY_TOP,
            "lg:sticky",
          )}
        >
          {destinations.map(([slug, destinationEntries]) => {
            const destination = destinationEntries[0]!.destination;
            const isActive = activeSlug === slug;
            const count = destinationEntries.length;

            const countLabel = itemCountLabel(count, mode);

            return (
              <EditorialSplitNavItem
                key={slug}
                title={destination.name}
                subtitle={destination.region}
                meta={countLabel}
                isActive={isActive}
                onClick={() => setActiveSlug(slug)}
              />
            );
          })}
        </nav>

        <div className="min-w-0">
          {activeDestination && activeEntries ? (
            <CatalogDestinationPanel
              slug={activeSlug}
              destination={activeDestination}
              entries={activeEntries}
              mode={mode}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function CatalogDestinationTabs({
  destinations,
  activeSlug,
  onSelect,
}: {
  destinations: DestinationGroup[];
  activeSlug: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <nav
      aria-label="Elegir destino"
      className="mb-8 flex gap-5 overflow-x-auto border-b border-border/45 pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {destinations.map(([slug, destinationEntries]) => {
        const destination = destinationEntries[0]!.destination;
        const isActive = activeSlug === slug;

        return (
          <button
            key={slug}
            type="button"
            onClick={() => onSelect(slug)}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "inline-flex min-h-11 shrink-0 flex-col items-start border-b-2 px-0.5 pb-3 pt-1 text-left transition",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4",
              isActive
                ? "-mb-px border-primary text-foreground"
                : "border-transparent text-muted-foreground/70 hover:text-foreground/85",
            )}
          >
            <span className="font-heading text-sm font-medium tracking-tight sm:text-[0.9375rem]">
              {destination.name}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

function CatalogDestinationPanel({
  slug,
  destination,
  entries,
  mode,
}: {
  slug: string;
  destination: CatalogItemEntry["destination"];
  entries: CatalogItemEntry[];
  mode: CatalogBrowseMode;
}) {
  const reduceMotion = useReducedMotion();
  const count = entries.length;
  const countLabel = itemCountLabel(count, mode);

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={slug}
        aria-labelledby={`${slug}-panel-heading`}
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-6 flex flex-col gap-3 border-b border-border/70 pb-5 sm:flex-row sm:items-end sm:justify-between min-[1920px]:mb-8 min-[1920px]:pb-6">
          <div className="min-w-0">
            <h2
              id={`${slug}-panel-heading`}
              className="font-heading text-2xl font-medium tracking-tight sm:text-3xl min-[1920px]:text-4xl"
            >
              {destination.name}
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">
              {destination.region} · {countLabel}
            </p>
          </div>
          <Link
            href={`/destinos/${slug}#${destinationSectionHash(mode)}`}
            className="inline-flex min-h-11 shrink-0 items-center rounded-full px-3 py-2 text-sm font-medium text-primary underline-offset-4 transition hover:bg-primary/8 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2"
          >
            Ver destino
          </Link>
        </div>

        <CatalogItemGrid
          entries={entries}
          mode={mode}
          gridClassName="sm:grid-cols-2 xl:grid-cols-3"
        />
      </motion.section>
    </AnimatePresence>
  );
}

function CatalogItemGrid({
  entries,
  mode,
  gridClassName,
}: {
  entries: CatalogItemEntry[];
  mode: CatalogBrowseMode;
  gridClassName?: string;
}) {
  return (
    <div className={cn("grid", CATALOG_GRID_GAP, gridClassName ?? "sm:grid-cols-2 lg:grid-cols-3")}>
      {entries.map((entry) => (
        <CatalogItemShowcase
          key={`${entry.destination.slug}-${entry.item.id}`}
          item={entry.item}
          destinationSlug={entry.destination.slug}
          badge={getCatalogItemBadge(entry)}
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
