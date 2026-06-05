import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { getCatalogItemPath } from "@/lib/catalog/catalog-items";
import type { CatalogItem } from "@/lib/catalog/types";
import { IMAGE_QUALITY_GALLERY, IMAGE_SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

type CatalogItemShowcaseProps = {
  item: CatalogItem;
  destinationSlug: string;
  badge: string;
};

export function CatalogItemShowcase({
  item,
  destinationSlug,
  badge,
}: CatalogItemShowcaseProps) {
  if (item.images.length === 0) return null;

  const detailHref = getCatalogItemPath(destinationSlug, item.itemSlug);
  const cover = item.images[0]!;

  return (
    <article>
      <Link href={detailHref} className="group block focus-visible:outline-none">
        <div className="overflow-hidden rounded-2xl lg:rounded-3xl">
          <div className="relative aspect-[4/5] bg-muted/40 sm:aspect-[5/6]">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              quality={IMAGE_QUALITY_GALLERY}
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes={IMAGE_SIZES.catalogCard}
            />
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4 border-b border-border/60 pb-4 transition group-hover:border-border">
          <div className="min-w-0">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {badge}
            </p>
            <h3 className="font-heading mt-2 text-xl font-medium tracking-tight text-foreground transition group-hover:text-primary/90 sm:text-2xl">
              {item.name}
            </h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {item.images.length} {item.images.length === 1 ? "foto" : "fotos"}
            </p>
          </div>
          <span
            className={cn(
              "mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border/80",
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
