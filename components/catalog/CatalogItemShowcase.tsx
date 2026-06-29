import { AppImage } from "@/components/media/AppImage";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";

import { getCatalogItemPath } from "@/lib/catalog/catalog-items";
import type { CatalogItem } from "@/lib/catalog/types";
import { CARD_IMAGE_HOVER_EXPAND } from "@/lib/hover-expand-motion";
import { EDITORIAL_CARD_ARROW_HOVER, EDITORIAL_CARD_TITLE_HOVER, POSTER_LINK_CTA_HOVER } from "@/lib/interactive-hover";
import { IMAGE_SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

const CARD_LINK_MOTION = cn(
  "group transition-[color,border-color,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2",
);

type CatalogItemShowcaseProps = {
  item: CatalogItem;
  destinationSlug: string;
  badge: string;
  destinationLabel?: string;
  categoryLabel?: string;
  exploreLabel: string;
  photoCountLabel: string;
  compact?: boolean;
};

function CatalogItemMobilePoster({
  item,
  destinationSlug,
  badge,
  destinationLabel,
  categoryLabel,
  exploreLabel,
  photoCountLabel,
}: Omit<CatalogItemShowcaseProps, "compact">) {
  if (item.images.length === 0) return null;

  const detailHref = getCatalogItemPath(destinationSlug, item.itemSlug);
  const cover = item.images[0]!;

  return (
    <Link
      href={detailHref}
      className={cn(
        CARD_LINK_MOTION,
        "block w-full min-w-0 overflow-hidden rounded-[1.35rem] ring-1 ring-black/8 shadow-[0_14px_36px_-24px_rgba(16,24,40,0.35)] max-md:rounded-[1.25rem] md:hidden",
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted/40">
        <AppImage
          src={cover.src}
          alt={cover.alt}
          fill
          qualityPreset="card"
          className={CARD_IMAGE_HOVER_EXPAND}
          sizes={IMAGE_SIZES.catalogCard}
        />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/90 via-black/38 to-black/10" />

        <div className="absolute inset-x-0 bottom-0 z-[2] flex h-[56%] min-h-[12.5rem] max-h-[17rem] flex-col p-4 max-md:min-h-[11.5rem] max-md:max-h-[16rem] max-md:p-3.5">
          <span className="mb-3 block h-px w-10 shrink-0 bg-white/55" aria-hidden />
          <p className="shrink-0 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-white/75">
            {badge}
          </p>
          <h3 className="font-heading mt-2 shrink-0 text-[1.35rem] font-medium leading-[1.08] tracking-tight text-white">
            {item.name}
          </h3>
          {categoryLabel ? (
            <p className="mt-1.5 shrink-0 text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-white/70">
              {categoryLabel}
            </p>
          ) : null}
          {item.description ? (
            <p className="mt-2 min-h-0 flex-1 text-[0.875rem] leading-[1.55] text-white/88 line-clamp-3">
              {item.description}
            </p>
          ) : (
            <div className="flex-1" />
          )}
          <div className="mt-auto flex shrink-0 items-end justify-between gap-3 pt-3">
            <div className="min-w-0">
              {destinationLabel ? (
                <p className="truncate text-xs text-white/72">{destinationLabel}</p>
              ) : null}
              <p className="mt-0.5 text-xs text-white/62">{photoCountLabel}</p>
            </div>
            <span className={cn("inline-flex shrink-0 items-center gap-1 text-sm font-medium text-white", POSTER_LINK_CTA_HOVER)}>
              {exploreLabel}
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function CatalogItemShowcase({
  item,
  destinationSlug,
  badge,
  destinationLabel,
  categoryLabel,
  exploreLabel,
  photoCountLabel,
  compact = false,
}: CatalogItemShowcaseProps) {
  if (item.images.length === 0) return null;

  const detailHref = getCatalogItemPath(destinationSlug, item.itemSlug);

  return (
    <article className="min-w-0">
      <CatalogItemMobilePoster
        item={item}
        destinationSlug={destinationSlug}
        badge={badge}
        destinationLabel={destinationLabel}
        categoryLabel={categoryLabel}
        exploreLabel={exploreLabel}
        photoCountLabel={photoCountLabel}
      />

      <Link href={detailHref} className={cn(CARD_LINK_MOTION, "hidden md:block")}>
        <div className={cn("overflow-hidden rounded-2xl", !compact && "lg:rounded-3xl")}>
          <div
            className={cn(
              "relative overflow-hidden bg-muted/40",
              compact ? "aspect-[4/5]" : "aspect-[3/4] lg:aspect-[5/6]",
            )}
          >
            <AppImage
              src={item.images[0]!.src}
              alt={item.images[0]!.alt}
              fill
              qualityPreset="card"
              className={CARD_IMAGE_HOVER_EXPAND}
              sizes={IMAGE_SIZES.catalogCard}
            />
          </div>
        </div>

        <div
          className={cn(
            "flex items-start justify-between border-b border-border/60 transition-[border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-border",
            compact ? "mt-3 gap-3 pb-3" : "mt-4 gap-4 pb-4",
          )}
        >
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {badge}
            </p>
            <h3
              className={cn(
                "font-heading font-medium tracking-tight text-foreground",
                EDITORIAL_CARD_TITLE_HOVER,
                compact
                  ? "mt-1.5 text-lg leading-snug lg:text-xl"
                  : "mt-2 text-xl lg:text-2xl",
              )}
            >
              {item.name}
            </h3>
            {item.description ? (
              <p
                className={cn(
                  "line-clamp-2 leading-relaxed text-muted-foreground",
                  compact ? "mt-1.5 text-sm" : "mt-2 text-sm",
                )}
              >
                {item.description}
              </p>
            ) : null}
            {destinationLabel ? (
              <p className="mt-1 text-sm text-muted-foreground">{destinationLabel}</p>
            ) : null}
            {categoryLabel ? (
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary/85">
                {categoryLabel}
              </p>
            ) : null}
            <p className={cn("text-muted-foreground", compact ? "mt-1 text-xs lg:text-sm" : "mt-1.5 text-sm")}>
              {photoCountLabel}
            </p>
          </div>
          <span
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-full border border-border/80 text-foreground/70",
              EDITORIAL_CARD_ARROW_HOVER,
              compact ? "mt-0.5 size-10" : "mt-1 size-11",
            )}
            aria-hidden
          >
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </Link>
    </article>
  );
}
