"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { AppImage } from "@/components/media/AppImage";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { CatalogItemEntry } from "@/lib/catalog/catalog-items";
import type { ExcursionCategory } from "@/lib/catalog/types";
import { getWhatsAppUrl } from "@/lib/constants";
import { CARD_IMAGE_HOVER_EXPAND } from "@/lib/hover-expand-motion";
import { IMAGE_SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

type ExcursionEditorialCardProps = {
  entry: CatalogItemEntry;
  reverse?: boolean;
};

export function ExcursionEditorialCard({ entry, reverse = false }: ExcursionEditorialCardProps) {
  const t = useTranslations("catalog");
  const { destination, item } = entry;
  const cover = item.images[0];
  const categoryLabel = item.category
    ? t(`excursionCategories.${item.category as ExcursionCategory}`)
    : undefined;
  const highlights = item.highlights ?? [];
  const detailHref = `/destinos/${destination.slug}/${item.itemSlug}`;
  const whatsAppHref = getWhatsAppUrl(
    t("excursionWhatsAppMessage", { excursion: item.name, destination: destination.name }),
  );

  return (
    <article className="overflow-hidden rounded-2xl border border-border/70 bg-card/40 shadow-[0_18px_40px_-28px_rgba(16,24,40,0.35)] max-md:rounded-xl">
      <div className="grid md:grid-cols-2 md:items-stretch">
        {cover ? (
          <Link
            href={detailHref}
            className={cn(
              "group relative block overflow-hidden aspect-[4/3] min-h-[14rem] bg-muted/40 max-md:aspect-[5/4] max-md:min-h-[12rem] md:aspect-auto md:min-h-[18rem]",
              reverse && "md:order-2",
            )}
          >
            <AppImage
              src={cover.src}
              alt={cover.alt}
              fill
              qualityPreset="card"
              loading="lazy"
              decoding="async"
              className={CARD_IMAGE_HOVER_EXPAND}
              sizes={IMAGE_SIZES.catalogCard}
            />
          </Link>
        ) : null}

        <div
          className={cn(
            "flex flex-col justify-center p-5 sm:p-6 max-md:p-4 lg:p-8",
            reverse && "md:order-1",
          )}
        >
          {categoryLabel ? (
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {categoryLabel}
            </p>
          ) : null}
          <h3 className="font-heading mt-2 text-2xl font-medium tracking-tight max-md:text-[clamp(1.15rem,4.5vw,1.35rem)] max-md:leading-snug md:text-[1.65rem]">
            {item.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-md:mt-2.5 max-md:line-clamp-3 max-md:text-[0.9375rem] sm:text-base">
            {item.description}
          </p>
          {highlights.length > 0 ? (
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground/88 max-md:mt-3 max-md:space-y-1.5 max-md:[&>li:nth-child(n+3)]:hidden">
              {highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-cta" />
                  <span className="max-md:line-clamp-2">{highlight}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-6 flex flex-wrap items-center gap-3 max-md:mt-5 max-md:flex-col max-md:items-stretch">
            <Link
              href={detailHref}
              className={cn(
                buttonVariants({ variant: "marketing", size: "lg" }),
                "inline-flex max-md:min-h-11 max-md:w-full max-md:justify-center md:hidden",
              )}
            >
              {t("excursionViewDetailCta")}
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "inline-flex max-md:min-h-11 max-md:w-full max-md:justify-center md:hidden",
              )}
            >
              {t("excursionWhatsAppCta")}
            </a>
            <Link
              href={detailHref}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "hidden md:inline-flex",
              )}
            >
              {t("excursionViewDetailCta")}
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "marketing", size: "lg" }),
                "hidden md:inline-flex",
              )}
            >
              {t("excursionWhatsAppCta")}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
