"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";

import { DestinationIndexCard } from "@/components/catalog/DestinationIndexCard";
import { EditorialSplitNavItem } from "@/components/catalog/EditorialSplitNavItem";
import type { DestinationZoneGroup } from "@/lib/catalog/destination-zones";
import { catalogDestinationCount } from "@/lib/i18n/localized-catalog";
import { CATALOG_GRID_GAP, CATALOG_SPLIT_SIDEBAR_STICKY } from "@/lib/layout-shell";
import { cn, horizontalScrollRailClass } from "@/lib/utils";

type DestinationsIndexClientProps = {
  zones: DestinationZoneGroup[];
};

export function DestinationsIndexClient({ zones }: DestinationsIndexClientProps) {
  const t = useTranslations("destinationsPage");
  const tCatalog = useTranslations("catalog");
  const [activeZoneId, setActiveZoneId] = useState(() => zones[0]?.id ?? "");
  const activeZone = zones.find((zone) => zone.id === activeZoneId) ?? zones[0];

  if (!activeZone) return null;

  if (zones.length === 1) {
    return <DestinationZonePanel zone={activeZone} tCatalog={tCatalog} />;
  }

  return (
    <div className="mt-10 min-h-[420px]">
      <div className="lg:hidden">
        <DestinationZoneTabs
          zones={zones}
          activeZoneId={activeZoneId}
          onSelect={setActiveZoneId}
          chooseCorridorLabel={tCatalog("chooseCorridor")}
        />
        <DestinationZonePanel zone={activeZone} tCatalog={tCatalog} />
      </div>

      <div className="hidden lg:grid lg:grid-cols-[minmax(240px,280px)_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[minmax(260px,300px)_minmax(0,1fr)] xl:gap-10 min-[1920px]:gap-12">
        <aside
          className={cn(
            "border-r border-border/45 pr-5 xl:pr-8 min-[1920px]:pr-10",
            CATALOG_SPLIT_SIDEBAR_STICKY,
          )}
        >
          <nav aria-label={tCatalog("chooseCorridor")} className="flex flex-col gap-0">
            {zones.map((zone) => {
              const isActive = activeZoneId === zone.id;
              const count = zone.destinations.length;
              const subtitle = t.has(`zoneNavSubtitles.${zone.id}`)
                ? t(`zoneNavSubtitles.${zone.id}`)
                : "";

              return (
                <EditorialSplitNavItem
                  key={zone.id}
                  title={zone.title}
                  subtitle={subtitle}
                  meta={catalogDestinationCount(tCatalog, count)}
                  isActive={isActive}
                  onClick={() => setActiveZoneId(zone.id)}
                />
              );
            })}
          </nav>
        </aside>

        <div className="min-w-0">
          <DestinationZonePanel zone={activeZone} tCatalog={tCatalog} />
        </div>
      </div>
    </div>
  );
}

function DestinationZoneTabs({
  zones,
  activeZoneId,
  onSelect,
  chooseCorridorLabel,
}: {
  zones: DestinationZoneGroup[];
  activeZoneId: string;
  onSelect: (zoneId: string) => void;
  chooseCorridorLabel: string;
}) {
  return (
    <div className="max-w-full overflow-hidden">
      <nav
        aria-label={chooseCorridorLabel}
        className={cn(
          horizontalScrollRailClass,
          "mb-8 gap-5 border-b border-border/45 pb-0",
        )}
      >
      {zones.map((zone) => {
        const isActive = activeZoneId === zone.id;

        return (
          <button
            key={zone.id}
            type="button"
            onClick={() => onSelect(zone.id)}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "inline-flex min-h-11 shrink-0 flex-col items-start border-b-2 px-0.5 pb-3 pt-1 text-left transition",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-4",
              isActive
                ? "-mb-px border-primary text-foreground"
                : "border-transparent text-muted-foreground/70 hover:text-cta",
            )}
          >
            <span className="font-heading text-sm font-medium tracking-tight sm:text-[0.9375rem]">
              {zone.title}
            </span>
          </button>
        );
      })}
      </nav>
    </div>
  );
}

function DestinationZonePanel({
  zone,
  tCatalog,
}: {
  zone: DestinationZoneGroup;
  tCatalog: ReturnType<typeof useTranslations<"catalog">>;
}) {
  const reduceMotion = useReducedMotion();
  const countLabel = catalogDestinationCount(tCatalog, zone.destinations.length);
  const panelTitle = zone.title;

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={zone.id}
        aria-labelledby={`${zone.id}-panel-heading`}
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-6 border-b border-border/70 pb-5 min-[1920px]:mb-8 min-[1920px]:pb-6">
          <h2
            id={`${zone.id}-panel-heading`}
            className="font-heading text-2xl font-medium tracking-tight sm:text-3xl min-[1920px]:text-4xl"
          >
            {panelTitle}
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">{countLabel}</p>
          <div className="mt-4 max-w-2xl space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {(zone.paragraphs ?? [zone.description]).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className={cn("grid", CATALOG_GRID_GAP, "sm:grid-cols-2 xl:grid-cols-3")}>
          {zone.destinations.map((destination) => (
            <DestinationIndexCard key={destination.slug} destination={destination} compact />
          ))}
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
