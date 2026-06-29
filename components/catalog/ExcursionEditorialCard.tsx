"use client";

import { useTranslations } from "next-intl";

import { AppImage } from "@/components/media/AppImage";
import { buttonVariants } from "@/components/ui/button";
import type { CatalogItemEntry } from "@/lib/catalog/catalog-items";
import { EXCURSION_CATEGORY_LABELS } from "@/lib/catalog/excursion-categories";
import { getWhatsAppUrl } from "@/lib/constants";
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
  const categoryLabel = item.category ? EXCURSION_CATEGORY_LABELS[item.category] : undefined;
  const highlights = item.highlights ?? [];
  const whatsAppHref = getWhatsAppUrl(
    t("excursionWhatsAppMessage", { excursion: item.name, destination: destination.name }),
  );

  return (
    <article className="overflow-hidden rounded-2xl border border-border/70 bg-card/40 shadow-[0_18px_40px_-28px_rgba(16,24,40,0.35)]">
      <div className="grid md:grid-cols-2 md:items-stretch">
        {cover ? (
          <div
            className={cn(
              "relative aspect-[4/3] min-h-[14rem] bg-muted/40 md:aspect-auto md:min-h-[18rem]",
              reverse && "md:order-2",
            )}
          >
            <AppImage
              src={cover.src}
              alt={cover.alt}
              fill
              qualityPreset="card"
              className="object-cover"
              sizes={IMAGE_SIZES.catalogCard}
            />
          </div>
        ) : null}

        <div
          className={cn(
            "flex flex-col justify-center p-5 sm:p-6 lg:p-8",
            reverse && "md:order-1",
          )}
        >
          {categoryLabel ? (
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
              {categoryLabel}
            </p>
          ) : null}
          <h3 className="font-heading mt-2 text-2xl font-medium tracking-tight sm:text-[1.65rem]">
            {item.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {item.description}
          </p>
          {highlights.length > 0 ? (
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground/88">
              {highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2">
                  <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-cta" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "marketing", size: "lg" }), "mt-6 inline-flex w-fit")}
          >
            {t("excursionWhatsAppCta")}
          </a>
        </div>
      </div>
    </article>
  );
}
