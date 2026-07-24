"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { AppImage } from "@/components/media/AppImage";
import { Link } from "@/i18n/navigation";
import type { HomeDestinationEditorial } from "@/lib/home-destinations-types";
import { cn } from "@/lib/utils";

const FEATURED_COUNT = 1;
const SECONDARY_COUNT = 3;
/** Radio editorial 14px — fotos tipo postal, sin pastilla exagerada. */
const PHOTO_RADIUS = "rounded-[0.875rem]";

function shortLocation(region: string) {
  const parts = region.split("·").map((part) => part.trim()).filter(Boolean);
  if (parts.length < 2) return region;
  return parts[parts.length - 1]!;
}

function destinationThumb(destination: HomeDestinationEditorial) {
  return destination.galleryImages[0] ?? null;
}

type DestinationMobileEditorialProps = {
  destinations: HomeDestinationEditorial[];
};

/** Home Destinos — composición editorial mobile. Desktop no usa este bloque. */
export function DestinationMobileEditorial({ destinations }: DestinationMobileEditorialProps) {
  const t = useTranslations("homeDestinations");

  if (destinations.length === 0) return null;

  const featured = destinations[0]!;
  const secondary = destinations.slice(FEATURED_COUNT, FEATURED_COUNT + SECONDARY_COUNT);
  const featuredThumb = destinationThumb(featured);
  const total = destinations.length;

  return (
    <div className="md:hidden">
      <article className="min-w-0">
        <Link
          href={`/destinos/${featured.slug}`}
          className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {featuredThumb ? (
            <div
              className={cn(
                "relative aspect-[5/4] min-h-[13rem] w-full overflow-hidden bg-muted/40",
                PHOTO_RADIUS,
              )}
            >
              <AppImage
                src={featuredThumb.src}
                alt={featuredThumb.alt}
                fill
                qualityPreset="gallery"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.025] motion-reduce:transition-none"
                sizes="(max-width: 767px) 92vw, 400px"
                priority
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-forest/75 via-brand-forest/15 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/78">
                  {shortLocation(featured.region)}
                </p>
                <h3 className="font-heading mt-1.5 text-[clamp(1.5rem,6.5vw,1.85rem)] font-semibold leading-[1.05] tracking-tight text-white">
                  {featured.name}
                </h3>
              </div>
            </div>
          ) : null}
        </Link>

        <p className="mt-4 max-w-[34ch] text-[0.9rem] leading-relaxed text-muted-foreground line-clamp-2">
          {featured.description}
        </p>

        <Link
          href={`/destinos/${featured.slug}`}
          className={cn(
            "mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full",
            "bg-cta px-6 text-sm font-semibold text-cta-foreground",
            "shadow-[0_10px_28px_-18px_rgba(212,132,58,0.65)]",
            "transition-opacity hover:opacity-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta/50 focus-visible:ring-offset-2",
          )}
        >
          {t("exploreDestination")}
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </article>

      {secondary.length > 0 ? (
        <ul className="mt-10 space-y-0 border-t border-brand-forest/12">
          {secondary.map((destination) => {
            const thumb = destinationThumb(destination);
            return (
              <li key={destination.slug} className="border-b border-brand-forest/12">
                <Link
                  href={`/destinos/${destination.slug}`}
                  className={cn(
                    "group flex min-h-14 items-center gap-3.5 py-3.5",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
                  )}
                >
                  {thumb ? (
                    <span
                      className={cn(
                        "relative size-[4.5rem] shrink-0 overflow-hidden bg-muted/40",
                        PHOTO_RADIUS,
                      )}
                      aria-hidden
                    >
                      <AppImage
                        src={thumb.src}
                        alt=""
                        fill
                        qualityPreset="card"
                        loading="lazy"
                        decoding="async"
                        className="object-cover"
                        sizes="72px"
                      />
                    </span>
                  ) : null}
                  <span className="min-w-0 flex-1">
                    <span className="font-heading block text-[1.05rem] font-semibold leading-snug tracking-tight text-foreground">
                      {destination.name}
                    </span>
                    <span className="mt-1 block text-[0.75rem] font-medium text-muted-foreground">
                      {shortLocation(destination.region)}
                    </span>
                  </span>
                  <ArrowRight
                    className="size-4 shrink-0 text-brand-forest/45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-brand-forest motion-reduce:transition-none"
                    aria-hidden
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}

      <div className="mt-8">
        <Link
          href="/destinos"
          className={cn(
            "inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-brand-forest",
            "underline-offset-4 hover:underline",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
          )}
        >
          {t("viewAllCount", { count: total })}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
