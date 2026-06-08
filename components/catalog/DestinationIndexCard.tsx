import { ArrowUpRight } from "lucide-react";
import { AppImage } from "@/components/media/AppImage";
import Link from "next/link";

import type { DestinationCatalog } from "@/lib/catalog/types";
import { IMAGE_SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

type DestinationIndexCardProps = {
  destination: DestinationCatalog;
};

export function DestinationIndexCard({ destination }: DestinationIndexCardProps) {
  return (
    <article>
      <Link
        href={`/destinos/${destination.slug}`}
        className="group block transition active:scale-[0.99] focus-visible:outline-none"
      >
        <div className="overflow-hidden rounded-2xl lg:rounded-3xl">
          <div className="relative aspect-[3/4] bg-muted/40 sm:aspect-[5/6]">
            <AppImage
              src={destination.heroImage}
              alt={destination.name}
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
              {destination.region}
            </p>
            <h2 className="font-heading mt-2 text-xl font-medium tracking-tight text-foreground transition group-hover:text-primary/90 sm:text-2xl">
              {destination.name}
            </h2>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {destination.intro}
            </p>
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
