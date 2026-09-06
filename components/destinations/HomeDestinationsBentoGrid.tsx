"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { AppImage } from "@/components/media/AppImage";
import { Reveal } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";
import { CARD_IMAGE_HOVER_EXPAND } from "@/lib/hover-expand-motion";
import { IMAGE_SIZES } from "@/lib/image-config";
import type { HomeDestinationEditorial } from "@/lib/home-destinations-types";
import {
  EDITORIAL_CARD_ARROW_HOVER,
  EDITORIAL_CARD_TITLE_HOVER,
  POSTER_LINK_CTA_HOVER,
} from "@/lib/interactive-hover";
import { cn } from "@/lib/utils";

/** Mosaico 4×6: Bariloche destacado + 8 tiles asimétricos. */
const BENTO_LAYOUTS = [
  "col-span-2 row-span-4 col-start-1 row-start-1",
  "col-span-1 row-span-2 col-start-3 row-start-1",
  "col-span-1 row-span-2 col-start-4 row-start-1",
  "col-span-1 row-span-2 col-start-3 row-start-3",
  "col-span-1 row-span-2 col-start-4 row-start-3",
  "col-span-1 row-span-2 col-start-1 row-start-5",
  "col-span-1 row-span-2 col-start-2 row-start-5",
  "col-span-1 row-span-2 col-start-3 row-start-5",
  "col-span-1 row-span-2 col-start-4 row-start-5",
] as const;

type HomeDestinationsBentoGridProps = {
  destinations: HomeDestinationEditorial[];
};

function HomeDestinationBentoTile({
  destination,
  featured = false,
  priority = false,
}: {
  destination: HomeDestinationEditorial;
  featured?: boolean;
  priority?: boolean;
}) {
  const t = useTranslations("homeDestinations");
  const heroImage = destination.galleryImages[0];

  if (!heroImage) return null;

  return (
    <Link
      href={`/destinos/${destination.slug}`}
      className={cn(
        "group relative block h-full min-h-[8.5rem] overflow-hidden rounded-[1.25rem]",
        "bg-muted shadow-[0_18px_40px_-28px_rgba(15,23,42,0.45)] ring-1 ring-black/8",
        "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-gpu",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "[@media(hover:hover)]:hover:shadow-[0_24px_48px_-26px_rgba(15,23,42,0.5)]",
      )}
    >
      <AppImage
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        qualityPreset={featured ? "detail" : "gallery"}
        className={CARD_IMAGE_HOVER_EXPAND}
        sizes={featured ? "(min-width: 1280px) 42vw, 50vw" : IMAGE_SIZES.galleryTile}
        priority={priority}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/92 via-black/42 to-black/10 transition-[opacity] duration-500 [@media(hover:hover)]:group-hover:from-black/94 [@media(hover:hover)]:group-hover:via-black/52"
        aria-hidden
      />

      <div
        className={cn(
          "absolute inset-0 z-[2] flex flex-col justify-end",
          featured ? "p-5 sm:p-6 xl:p-7" : "p-3.5 sm:p-4 xl:p-5",
        )}
      >
        <p
          className={cn(
            "font-semibold uppercase tracking-[0.12em] text-white/72",
            featured ? "text-[0.6875rem] sm:text-xs" : "text-[0.625rem] sm:text-[0.6875rem]",
          )}
        >
          {destination.region}
        </p>

        <h3
          className={cn(
            "font-heading font-medium tracking-tight text-white",
            EDITORIAL_CARD_TITLE_HOVER,
            featured
              ? "mt-1.5 text-[clamp(1.35rem,2.4vw,2.35rem)] leading-[1.05]"
              : "mt-1 text-[clamp(0.95rem,1.35vw,1.35rem)] leading-[1.08]",
          )}
        >
          {destination.name}
        </h3>

        {featured ? (
          <div
            className={cn(
              "mt-3 flex items-center justify-between gap-3 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "[@media(hover:hover)]:opacity-0 [@media(hover:hover)]:translate-y-1",
              "[@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0",
              "[@media(hover:hover)]:group-focus-visible:opacity-100 [@media(hover:hover)]:group-focus-visible:translate-y-0",
            )}
          >
            <span className={cn("text-sm font-semibold text-white/92", POSTER_LINK_CTA_HOVER)}>
              {t("exploreDestination")}
            </span>
            <span
              className={cn(
                "inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white/90 backdrop-blur-[2px]",
                EDITORIAL_CARD_ARROW_HOVER,
              )}
              aria-hidden
            >
              <ArrowUpRight className="size-4" />
            </span>
          </div>
        ) : (
          <span
            className={cn(
              "absolute bottom-3.5 right-3.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-white/25 bg-black/25 text-white/90 backdrop-blur-[2px]",
              EDITORIAL_CARD_ARROW_HOVER,
            )}
            aria-hidden
          >
            <ArrowUpRight className="size-3.5" />
          </span>
        )}
      </div>
    </Link>
  );
}

export function HomeDestinationsBentoGrid({ destinations }: HomeDestinationsBentoGridProps) {
  return (
    <Reveal>
      <div
        className={cn(
          "grid w-full grid-cols-4 grid-rows-6 gap-2.5 sm:gap-3 xl:gap-3.5",
          "min-h-[min(72vh,640px)] xl:min-h-[min(68vh,720px)] 2xl:min-h-[min(66vh,760px)]",
        )}
      >
        {destinations.map((destination, index) => {
          const layout = BENTO_LAYOUTS[index];
          if (!layout) return null;

          return (
            <div key={destination.slug} className={cn("h-full min-h-0", layout)}>
              <HomeDestinationBentoTile
                destination={destination}
                featured={index === 0}
                priority={index === 0}
              />
            </div>
          );
        })}
      </div>
    </Reveal>
  );
}
