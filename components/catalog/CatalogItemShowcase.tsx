import Link from "next/link";
import { AppImage } from "@/components/media/AppImage";
import { ArrowUpRight } from "lucide-react";

import { getCatalogItemPath } from "@/lib/catalog/catalog-items";
import type { CatalogItem } from "@/lib/catalog/types";
import { CARD_IMAGE_HOVER_EXPAND } from "@/lib/hover-expand-motion";
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
  compact?: boolean;
};

function CatalogCardMeta({
  badge,
  item,
  destinationLabel,
  categoryLabel,
  photoLabel,
  compact = false,
}: {
  badge: string;
  item: CatalogItem;
  destinationLabel?: string;
  categoryLabel?: string;
  photoLabel: string;
  compact?: boolean;
}) {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {badge}
      </p>
      <h3
        className={cn(
          "font-heading mt-1.5 font-medium leading-snug tracking-tight text-foreground",
          compact ? "text-lg sm:text-xl" : "text-xl",
        )}
      >
        {item.name}
      </h3>
      {item.description ? (
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
      ) : null}
      {destinationLabel ? (
        <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{destinationLabel}</p>
      ) : null}
      {categoryLabel ? (
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-primary/85">
          {categoryLabel}
        </p>
      ) : null}
      <div
        className={cn(
          "flex items-center justify-between gap-3 border-t border-border/45 pt-3",
          compact ? "mt-2.5" : "mt-3",
        )}
      >
        <p className={cn("text-muted-foreground", compact ? "text-xs sm:text-sm" : "text-sm")}>
          {photoLabel}
        </p>
        <span
          className={cn(
            "inline-flex shrink-0 items-center justify-center rounded-full border border-border/80 text-foreground/70",
            compact ? "size-9" : "size-10",
          )}
          aria-hidden
        >
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </>
  );
}

export function CatalogItemShowcase({
  item,
  destinationSlug,
  badge,
  destinationLabel,
  categoryLabel,
  compact = false,
}: CatalogItemShowcaseProps) {
  if (item.images.length === 0) return null;

  const detailHref = getCatalogItemPath(destinationSlug, item.itemSlug);
  const cover = item.images[0]!;
  const photoLabel = `${item.images.length} ${item.images.length === 1 ? "foto" : "fotos"}`;

  return (
    <article>
      <Link
        href={detailHref}
        className={cn(
          CARD_LINK_MOTION,
          "block overflow-hidden rounded-2xl ring-1 ring-border/60 sm:overflow-visible sm:rounded-none sm:ring-0",
          "bg-muted/20 shadow-[0_10px_28px_-22px_rgba(16,24,40,0.28)] sm:bg-transparent sm:shadow-none",
          "sm:hidden",
        )}
      >
        <div className={cn(compact ? "p-2.5" : "p-3.5")}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted/40 ring-1 ring-border/55">
            <AppImage
              src={cover.src}
              alt={cover.alt}
              fill
              qualityPreset="card"
              className={CARD_IMAGE_HOVER_EXPAND}
              sizes={IMAGE_SIZES.catalogCard}
            />
          </div>
          <div className={cn(compact ? "mt-2.5 px-0.5" : "mt-3.5 px-0.5")}>
            <CatalogCardMeta
              badge={badge}
              item={item}
              destinationLabel={destinationLabel}
              categoryLabel={categoryLabel}
              photoLabel={photoLabel}
              compact={compact}
            />
          </div>
        </div>
      </Link>

      <Link href={detailHref} className={cn(CARD_LINK_MOTION, "hidden sm:block")}>
        <div className={cn("overflow-hidden rounded-2xl", !compact && "lg:rounded-3xl")}>
          <div
            className={cn(
              "relative overflow-hidden bg-muted/40",
              compact ? "aspect-[4/5] sm:aspect-[4/5]" : "aspect-[3/4] sm:aspect-[5/6]",
            )}
          >
            <AppImage
              src={cover.src}
              alt={cover.alt}
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
                "font-heading font-medium tracking-tight text-foreground transition-[color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-primary/90",
                compact
                  ? "mt-1.5 text-lg leading-snug sm:text-xl"
                  : "mt-2 text-xl sm:text-2xl",
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
            <p className={cn("text-muted-foreground", compact ? "mt-1 text-xs sm:text-sm" : "mt-1.5 text-sm")}>
              {photoLabel}
            </p>
          </div>
          <span
            className={cn(
              "inline-flex shrink-0 items-center justify-center rounded-full border border-border/80",
              "text-foreground/70 transition-[color,border-color,background-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-foreground/25 group-hover:bg-foreground/5 group-hover:text-foreground",
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
