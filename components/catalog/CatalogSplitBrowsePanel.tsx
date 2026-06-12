"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

import { CatalogItemGrid } from "@/components/catalog/CatalogItemGrid";
import type { CatalogGridMode } from "@/components/catalog/CatalogItemGrid";
import { EditorialSplitNavItem } from "@/components/catalog/EditorialSplitNavItem";
import type { CatalogSplitGroup } from "@/lib/catalog/accommodation-types";
import { CATALOG_SPLIT_SIDEBAR_STICKY } from "@/lib/layout-shell";
import { cn, horizontalScrollRailClass } from "@/lib/utils";

type CatalogSplitBrowsePanelProps = {
  groups: CatalogSplitGroup[];
  mode: CatalogGridMode;
  navAriaLabel: string;
  panelAction?: (group: CatalogSplitGroup) => { label: string; href: string } | undefined;
};

export function CatalogSplitBrowsePanel({
  groups,
  mode,
  navAriaLabel,
  panelAction,
}: CatalogSplitBrowsePanelProps) {
  const [activeId, setActiveId] = useState(() => groups[0]?.id ?? "");
  const activeGroup = groups.find((group) => group.id === activeId) ?? groups[0];

  const stableGroups = useMemo(() => groups, [groups]);

  if (stableGroups.length === 0) return null;

  const showMobileTabs = stableGroups.length > 1;

  return (
    <div className="min-h-[420px]">
      <div className="lg:hidden">
        {showMobileTabs ? (
          <CatalogSplitTabs
            groups={stableGroups}
            activeId={activeGroup?.id ?? ""}
            onSelect={setActiveId}
            navAriaLabel={navAriaLabel}
          />
        ) : null}
        {activeGroup ? (
          <CatalogSplitPanel
            group={activeGroup}
            mode={mode}
            action={panelAction?.(activeGroup)}
          />
        ) : null}
      </div>

      <div className="hidden lg:grid lg:grid-cols-[minmax(240px,280px)_minmax(0,1fr)] lg:items-start lg:gap-8 xl:grid-cols-[minmax(260px,300px)_minmax(0,1fr)] xl:gap-10 min-[1920px]:gap-12">
        <aside
          className={cn(
            "border-r border-border/45 pr-5 xl:pr-8 min-[1920px]:pr-10",
            CATALOG_SPLIT_SIDEBAR_STICKY,
          )}
        >
          <nav aria-label={navAriaLabel} className="flex flex-col gap-0">
            {stableGroups.map((group) => (
              <EditorialSplitNavItem
                key={group.id}
                title={group.title}
                subtitle={group.navSubtitle}
                meta={group.meta}
                isActive={activeGroup?.id === group.id}
                onClick={() => setActiveId(group.id)}
              />
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          {activeGroup ? (
            <CatalogSplitPanel
              group={activeGroup}
              mode={mode}
              action={panelAction?.(activeGroup)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

function CatalogSplitTabs({
  groups,
  activeId,
  onSelect,
  navAriaLabel,
}: {
  groups: CatalogSplitGroup[];
  activeId: string;
  onSelect: (id: string) => void;
  navAriaLabel: string;
}) {
  return (
    <div className="max-w-full overflow-hidden">
      <nav
        aria-label={navAriaLabel}
        className={cn(
          horizontalScrollRailClass,
          "mb-8 gap-5 border-b border-border/45 pb-0",
        )}
      >
        {groups.map((group) => {
          const isActive = activeId === group.id;

          return (
            <button
              key={group.id}
              type="button"
              onClick={() => onSelect(group.id)}
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
                {group.title}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function CatalogSplitPanel({
  group,
  mode,
  action,
}: {
  group: CatalogSplitGroup;
  mode: CatalogGridMode;
  action?: { label: string; href: string };
}) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={group.id}
        aria-labelledby={`${group.id}-panel-heading`}
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-6 flex flex-col gap-3 border-b border-border/70 pb-5 sm:flex-row sm:items-end sm:justify-between min-[1920px]:mb-8 min-[1920px]:pb-6">
          <div className="min-w-0">
            <h2
              id={`${group.id}-panel-heading`}
              className="font-heading text-2xl font-medium tracking-tight sm:text-3xl min-[1920px]:text-4xl"
            >
              {group.title}
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">
              {group.panelSubtitle}
            </p>
          </div>
          {action ? (
            <Link
              href={action.href}
              className="inline-flex min-h-11 shrink-0 items-center rounded-full px-3 py-2 text-sm font-medium text-primary underline-offset-4 transition hover:bg-primary/8 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2"
            >
              {action.label}
            </Link>
          ) : null}
        </div>

        <CatalogItemGrid
          entries={group.entries}
          mode={mode}
          gridClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          compactGap
        />
      </motion.section>
    </AnimatePresence>
  );
}
