import Link from "next/link";
import { AppImage } from "@/components/media/AppImage";
import { ArrowUpRight } from "lucide-react";

import { getCatalogItemPath } from "@/lib/catalog/catalog-items";
import type { CatalogItem } from "@/lib/catalog/types";
import { IMAGE_SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

const CARD_IMAGE_MOTION = cn(
  "object-cover origin-center [image-rendering:auto]",
  "motion-safe:transition-[transform] motion-safe:duration-[1000ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
  "[@media(hover:hover)]:group-hover:scale-[1.04]",
  "motion-safe:group-active:scale-[1.025]",
);

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
};

function CatalogCardMeta({
  badge,
  item,
  destinationLabel,
  categoryLabel,
  photoLabel,
}: {
  badge: string;
  item: CatalogItem;
  destinationLabel?: string;
  categoryLabel?: string;
  photoLabel: string;
}) {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {badge}
      </p>
      <h3 className="font-heading mt-1.5 text-xl font-medium leading-snug tracking-tight text-foreground">
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
      <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/45 pt-3">
        <p className="text-sm text-muted-foreground">{photoLabel}</p>
        <span
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border/80 text-foreground/70"
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
        <div className="p-3.5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted/40 ring-1 ring-border/55">
            <AppImage
              src={cover.src}
              alt={cover.alt}
              fill
              qualityPreset="card"
              className={CARD_IMAGE_MOTION}
              sizes={IMAGE_SIZES.catalogCard}
            />
          </div>
          <div className="mt-3.5 px-0.5">
            <CatalogCardMeta
              badge={badge}
              item={item}
              destinationLabel={destinationLabel}
              categoryLabel={categoryLabel}
              photoLabel={photoLabel}
            />
          </div>
        </div>
      </Link>

      <Link href={detailHref} className={cn(CARD_LINK_MOTION, "hidden sm:block")}>
        <div className="overflow-hidden rounded-2xl lg:rounded-3xl">
          <div className="relative aspect-[3/4] overflow-hidden bg-muted/40 sm:aspect-[5/6]">
            <AppImage
              src={cover.src}
              alt={cover.alt}
              fill
              qualityPreset="card"
              className={CARD_IMAGE_MOTION}
              sizes={IMAGE_SIZES.catalogCard}
            />
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4 border-b border-border/60 pb-4 transition-[border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-border">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {badge}
            </p>
            <h3 className="font-heading mt-2 text-xl font-medium tracking-tight text-foreground transition-[color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-primary/90 sm:text-2xl">
              {item.name}
            </h3>
            {item.description ? (
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
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
            <p className="mt-1.5 text-sm text-muted-foreground">{photoLabel}</p>
          </div>
          <span
            className={cn(
              "mt-1 inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-border/80",
              "text-foreground/70 transition-[color,border-color,background-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-foreground/25 group-hover:bg-foreground/5 group-hover:text-foreground",
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
