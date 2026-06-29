import { ArrowUpRight } from "lucide-react";
import { AppImage } from "@/components/media/AppImage";
import { Link } from "@/i18n/navigation";
import type { DestinationCatalog } from "@/lib/catalog/types";
import { CARD_IMAGE_HOVER_EXPAND } from "@/lib/hover-expand-motion";
import { EDITORIAL_CARD_ARROW_HOVER, EDITORIAL_CARD_TITLE_HOVER } from "@/lib/interactive-hover";
import { IMAGE_SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

type DestinationIndexCardProps = {
  destination: DestinationCatalog;
  /** Más compacta dentro del panel split (como cards de alojamiento). */
  compact?: boolean;
};

export function DestinationIndexCard({ destination, compact = false }: DestinationIndexCardProps) {
  return (
    <article>
      <Link
        href={`/destinos/${destination.slug}`}
        className={cn(
          "group block transition-[color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2",
          !compact && "active:scale-[0.99]",
        )}
      >
        <div className={cn("overflow-hidden rounded-2xl", !compact && "lg:rounded-3xl")}>
          <div
            className={cn(
              "relative overflow-hidden bg-muted/40",
              compact ? "aspect-[4/5] sm:aspect-[5/6]" : "aspect-[3/4] sm:aspect-[5/6]",
            )}
          >
            <AppImage
              src={destination.heroImage}
              alt={destination.name}
              fill
              qualityPreset="card"
              className={CARD_IMAGE_HOVER_EXPAND}
              sizes={IMAGE_SIZES.catalogCard}
            />
          </div>
        </div>

        <div
          className={cn(
            "flex items-start justify-between gap-3 border-b border-border/60 transition-[border-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:border-border",
            compact ? "mt-3 pb-3" : "mt-4 gap-4 pb-4",
          )}
        >
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {destination.region}
            </p>
            <h2
              className={cn(
                "font-heading mt-1.5 font-medium tracking-tight text-foreground",
                EDITORIAL_CARD_TITLE_HOVER,
                compact ? "text-lg leading-snug sm:text-xl" : "mt-2 text-xl sm:text-2xl",
              )}
            >
              {destination.name}
            </h2>
            <p
              className={cn(
                "line-clamp-2 leading-relaxed text-muted-foreground",
                compact ? "mt-1.5 text-sm" : "mt-2 text-sm",
              )}
            >
              {destination.intro}
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
