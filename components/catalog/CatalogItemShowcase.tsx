import Link from "next/link";
import { AppImage } from "@/components/media/AppImage";
import { ArrowUpRight } from "lucide-react";

import { getCatalogItemPath } from "@/lib/catalog/catalog-items";
import type { CatalogItem } from "@/lib/catalog/types";
import { IMAGE_SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

/** Solo mobile (<sm). Desktop siempre usa la card estándar. */
export type MobileCatalogCardVariant =
  | "overlay"
  | "stacked"
  | "list"
  | "mosaic"
  | "frame"
  | "banner"
  | "minimal"
  | "duo";

type CatalogItemShowcaseProps = {
  item: CatalogItem;
  destinationSlug: string;
  badge: string;
  destinationLabel?: string;
  categoryLabel?: string;
  mobileCardVariant?: MobileCatalogCardVariant;
};

export function CatalogItemShowcase({
  item,
  destinationSlug,
  badge,
  destinationLabel,
  categoryLabel,
  mobileCardVariant,
}: CatalogItemShowcaseProps) {
  if (item.images.length === 0) return null;

  const detailHref = getCatalogItemPath(destinationSlug, item.itemSlug);
  const cover = item.images[0]!;
  const photoLabel = `${item.images.length} ${item.images.length === 1 ? "foto" : "fotos"}`;
  const mosaicThumbs = [
    item.images[1] ?? item.images[0]!,
    item.images[2] ?? item.images[Math.min(1, item.images.length - 1)]!,
  ];
  const duoImages = [item.images[0]!, item.images[1] ?? item.images[0]!];

  return (
    <article>
      {mobileCardVariant ? (
        <Link
          href={detailHref}
          className={cn(
            "group transition active:scale-[0.995] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2 sm:hidden",
            mobileCardVariant === "list"
              ? "flex items-center gap-3.5 border-b border-border/70 py-4 last:border-b-0"
              : mobileCardVariant === "minimal"
                ? "block active:scale-[0.99]"
                : mobileCardVariant === "frame"
                ? cn(
                    "block overflow-hidden rounded-2xl ring-1 ring-border/60",
                    "bg-muted/20 shadow-[0_10px_28px_-22px_rgba(16,24,40,0.28)]",
                    "active:scale-[0.99]",
                  )
                : cn(
                    "block overflow-hidden rounded-2xl ring-1 ring-border/70",
                    "bg-card shadow-[0_16px_40px_-28px_rgba(16,24,40,0.38)]",
                    "active:scale-[0.99]",
                  ),
          )}
        >
          {mobileCardVariant === "overlay" ? (
            <div className="relative aspect-[3/4] bg-muted/40">
              <AppImage
                src={cover.src}
                alt={cover.alt}
                fill
                qualityPreset="gallery"
                className="object-cover"
                sizes={IMAGE_SIZES.catalogCard}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent" />
              <div className="absolute left-3 top-3 rounded-full bg-black/48 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white ring-1 ring-white/25">
                {badge}
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="font-heading line-clamp-2 text-xl font-medium leading-tight tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
                  {item.name}
                </h3>
                {destinationLabel ? (
                  <p className="mt-1 line-clamp-1 text-xs text-white/88">{destinationLabel}</p>
                ) : (
                  <p className="mt-1 text-xs text-white/86">{photoLabel}</p>
                )}
              </div>
            </div>
          ) : null}

          {mobileCardVariant === "stacked" ? (
            <>
              <div className="relative aspect-[16/10] bg-muted/40">
                <AppImage
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  qualityPreset="gallery"
                  className="object-cover"
                  sizes={IMAGE_SIZES.catalogCard}
                />
              </div>
              <div className="border-t border-border/60 px-4 py-3.5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {badge}
                </p>
                <h3 className="font-heading mt-1.5 text-xl font-medium leading-snug tracking-tight text-foreground">
                  {item.name}
                </h3>
                {destinationLabel ? (
                  <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{destinationLabel}</p>
                ) : null}
                {categoryLabel ? (
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-primary/85">
                    {categoryLabel}
                  </p>
                ) : null}
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-border/50 pt-3">
                  <p className="text-sm text-muted-foreground">{photoLabel}</p>
                  <span
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border/80 text-foreground/70"
                    aria-hidden
                  >
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </div>
            </>
          ) : null}

          {mobileCardVariant === "list" ? (
            <>
              <div className="relative size-[5.25rem] shrink-0 overflow-hidden rounded-xl bg-muted/40 ring-1 ring-border/60">
                <AppImage
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  qualityPreset="gallery"
                  className="object-cover"
                  sizes="84px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {badge}
                </p>
                <h3 className="font-heading mt-1 line-clamp-2 text-lg font-medium leading-snug tracking-tight text-foreground">
                  {item.name}
                </h3>
                {destinationLabel ? (
                  <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{destinationLabel}</p>
                ) : null}
                <p className="mt-1 text-sm text-muted-foreground">{photoLabel}</p>
              </div>
              <span
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border/80 text-foreground/65 transition group-active:border-foreground/25 group-active:bg-foreground/5"
                aria-hidden
              >
                <ArrowUpRight className="size-4" />
              </span>
            </>
          ) : null}

          {mobileCardVariant === "mosaic" ? (
            <>
              <div className="relative aspect-[5/4] bg-muted/40">
                <AppImage
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  qualityPreset="gallery"
                  className="object-cover"
                  sizes={IMAGE_SIZES.catalogCard}
                />
                <div className="absolute left-3 top-3 rounded-full bg-black/48 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white ring-1 ring-white/25">
                  {badge}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-0.5 bg-border/40">
                {mosaicThumbs.map((image, index) => (
                  <div
                    key={`${image.src}-${index}`}
                    className="relative aspect-[4/3] bg-muted/40"
                  >
                    <AppImage
                      src={image.src}
                      alt={image.alt}
                      fill
                      qualityPreset="gallery"
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, 240px"
                    />
                    {index === 1 && item.images.length > 3 ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/42">
                        <span className="text-sm font-medium text-white">
                          +{item.images.length - 3}
                        </span>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="px-4 py-3.5">
                <h3 className="font-heading text-xl font-medium leading-snug tracking-tight text-foreground">
                  {item.name}
                </h3>
                {destinationLabel ? (
                  <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{destinationLabel}</p>
                ) : null}
                <div className="mt-2.5 flex items-center justify-between gap-3">
                  <p className="text-sm text-muted-foreground">{photoLabel}</p>
                  <span
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border/80 text-foreground/70"
                    aria-hidden
                  >
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </div>
            </>
          ) : null}

          {mobileCardVariant === "frame" ? (
            <div className="p-3.5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted/40 ring-1 ring-border/55">
                <AppImage
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  qualityPreset="gallery"
                  className="object-cover transition duration-500 group-active:scale-[1.02]"
                  sizes={IMAGE_SIZES.catalogCard}
                />
              </div>
              <div className="mt-3.5 px-0.5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {badge}
                </p>
                <h3 className="font-heading mt-1.5 text-xl font-medium leading-snug tracking-tight text-foreground">
                  {item.name}
                </h3>
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
              </div>
            </div>
          ) : null}

          {mobileCardVariant === "banner" ? (
            <div className="relative aspect-[2/1] min-h-[9.5rem] bg-muted/40">
              <AppImage
                src={cover.src}
                alt={cover.alt}
                fill
                qualityPreset="gallery"
                className="object-cover"
                sizes={IMAGE_SIZES.catalogCard}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-black/5" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute left-3 top-3 rounded-full bg-black/48 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white ring-1 ring-white/25">
                {badge}
              </div>
              <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-heading line-clamp-2 text-lg font-medium leading-tight tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
                    {item.name}
                  </h3>
                  <p className="mt-1 line-clamp-1 text-xs text-white/88">
                    {destinationLabel ?? photoLabel}
                  </p>
                </div>
                <span
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/12 text-white backdrop-blur-sm"
                  aria-hidden
                >
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </div>
          ) : null}

          {mobileCardVariant === "minimal" ? (
            <>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted/40">
                <AppImage
                  src={cover.src}
                  alt={cover.alt}
                  fill
                  qualityPreset="gallery"
                  className="object-cover transition duration-500 group-active:scale-[1.02]"
                  sizes={IMAGE_SIZES.catalogCard}
                />
                <div className="absolute left-3 top-3 rounded-full bg-background/88 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-foreground/85 ring-1 ring-border/60 backdrop-blur-sm">
                  {badge}
                </div>
              </div>
              <div className="mt-3.5 flex items-start justify-between gap-3 px-0.5">
                <div className="min-w-0">
                  <h3 className="font-heading text-2xl font-medium leading-snug tracking-tight text-foreground">
                    {item.name}
                  </h3>
                  {destinationLabel ? (
                    <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{destinationLabel}</p>
                  ) : null}
                  {categoryLabel ? (
                    <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-primary/85">
                      {categoryLabel}
                    </p>
                  ) : null}
                  <p className="mt-2 text-sm text-muted-foreground">{photoLabel}</p>
                </div>
                <span
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border/80 text-foreground/70 transition group-active:border-foreground/25 group-active:bg-foreground/5"
                  aria-hidden
                >
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </>
          ) : null}

          {mobileCardVariant === "duo" ? (
            <>
              <div className="grid grid-cols-2 gap-0.5 bg-border/35">
                {duoImages.map((image, index) => (
                  <div key={`${image.src}-${index}`} className="relative aspect-[3/4] bg-muted/40">
                    <AppImage
                      src={image.src}
                      alt={image.alt}
                      fill
                      qualityPreset="gallery"
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, 240px"
                    />
                    {index === 0 ? (
                      <div className="absolute left-2.5 top-2.5 rounded-full bg-black/48 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white ring-1 ring-white/25">
                        {badge}
                      </div>
                    ) : null}
                    {index === 1 && item.images.length > 2 ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/38">
                        <span className="text-sm font-medium text-white">
                          +{item.images.length - 2}
                        </span>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="px-4 py-3.5">
                <h3 className="font-heading text-xl font-medium leading-snug tracking-tight text-foreground">
                  {item.name}
                </h3>
                {destinationLabel ? (
                  <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">{destinationLabel}</p>
                ) : null}
                <div className="mt-2.5 flex items-center justify-between gap-3">
                  <p className="text-sm text-muted-foreground">{photoLabel}</p>
                  <span
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border/80 text-foreground/70"
                    aria-hidden
                  >
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </div>
            </>
          ) : null}
        </Link>
      ) : null}

      <Link
        href={detailHref}
        className={cn(
          "group block transition active:scale-[0.99] focus-visible:outline-none",
          mobileCardVariant && "hidden sm:block",
        )}
      >
        <div className="overflow-hidden rounded-2xl lg:rounded-3xl">
          <div className="relative aspect-[3/4] bg-muted/40 sm:aspect-[5/6]">
            <AppImage
              src={cover.src}
              alt={cover.alt}
              fill
              qualityPreset="gallery"
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes={IMAGE_SIZES.catalogCard}
            />
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4 border-b border-border/60 pb-4 transition group-hover:border-border">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {badge}
            </p>
            <h3 className="font-heading mt-2 text-xl font-medium tracking-tight text-foreground transition group-hover:text-primary/90 sm:text-2xl">
              {item.name}
            </h3>
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
              "text-foreground/70 transition group-hover:border-foreground/25 group-hover:bg-foreground/5 group-hover:text-foreground",
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
