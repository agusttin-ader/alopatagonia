"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { AppImage } from "@/components/media/AppImage";
import { Link } from "@/i18n/navigation";
import type { HomeDestinationEditorial } from "@/lib/home-destinations-types";
import { cn } from "@/lib/utils";

const FEATURED_COUNT = 1;
const SECONDARY_COUNT = 3;

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

/** Home Destinos — layout editorial mobile (1 destacado + 3 filas + CTA). Desktop no usa este bloque. */
export function DestinationMobileEditorial({ destinations }: DestinationMobileEditorialProps) {
  const t = useTranslations("homeDestinations");

  if (destinations.length === 0) return null;

  const featured = destinations[0]!;
  const secondary = destinations.slice(FEATURED_COUNT, FEATURED_COUNT + SECONDARY_COUNT);
  const featuredThumb = destinationThumb(featured);
  const total = destinations.length;

  return (
    <div className={cn("md:hidden")}>
      <article className="min-w-0">
        <Link
          href={`/destinos/${featured.slug}`}
          className={cn(
            "group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-lake-foreground/50 focus-visible:ring-offset-2 focus-visible:ring-offset-footer-lake",
          )}
        >
          {featuredThumb ? (
            <div className="relative aspect-[5/4] min-h-[12rem] w-full overflow-hidden rounded-[1.35rem] bg-muted/30 ring-1 ring-white/10">
              <AppImage
                src={featuredThumb.src}
                alt={featuredThumb.alt}
                fill
                qualityPreset="gallery"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.03]"
                sizes="(max-width: 767px) 92vw, 400px"
                priority
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/75">
                  {shortLocation(featured.region)}
                </p>
                <h3 className="font-heading mt-1.5 text-[clamp(1.45rem,6vw,1.75rem)] font-semibold leading-tight tracking-tight text-white">
                  {featured.name}
                </h3>
              </div>
            </div>
          ) : null}
        </Link>

        <p className="mt-3.5 text-[0.9375rem] leading-snug text-footer-lake-foreground/82 line-clamp-2">
          {featured.description}
        </p>

        <Link
          href={`/destinos/${featured.slug}`}
          className={cn(
            "mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full",
            "bg-footer-lake-foreground px-5 text-sm font-semibold text-footer-lake",
            "transition-opacity hover:opacity-95",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-lake-foreground/55 focus-visible:ring-offset-2 focus-visible:ring-offset-footer-lake",
          )}
        >
          {t("exploreDestination")}
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </article>

      {secondary.length > 0 ? (
        <ul className="mt-8 divide-y divide-white/12 border-y border-white/12">
          {secondary.map((destination) => {
            const thumb = destinationThumb(destination);
            return (
              <li key={destination.slug}>
                <Link
                  href={`/destinos/${destination.slug}`}
                  className={cn(
                    "group flex min-h-[4.5rem] items-center gap-3.5 py-3.5",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-lake-foreground/45 focus-visible:ring-offset-2 focus-visible:ring-offset-footer-lake",
                  )}
                >
                  {thumb ? (
                    <span
                      className="relative size-[4.75rem] shrink-0 overflow-hidden rounded-xl ring-1 ring-white/12 sm:size-[5.25rem]"
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
                        sizes="88px"
                      />
                    </span>
                  ) : null}
                  <span className="min-w-0 flex-1">
                    <span className="font-heading block text-[1.05rem] font-semibold leading-snug tracking-tight text-footer-lake-foreground">
                      {destination.name}
                    </span>
                    <span className="mt-1 block text-[0.78rem] font-medium tracking-wide text-footer-lake-foreground/58">
                      {shortLocation(destination.region)}
                    </span>
                  </span>
                  <ArrowRight
                    className="size-5 shrink-0 text-footer-lake-foreground/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-footer-lake-foreground/70"
                    aria-hidden
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}

      <div className="mt-8 pb-2">
        <Link
          href="/destinos"
          className={cn(
            "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full",
            "border border-footer-lake-foreground/35 px-5 text-sm font-semibold text-footer-lake-foreground",
            "transition-colors hover:bg-white/8",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-lake-foreground/45 focus-visible:ring-offset-2 focus-visible:ring-offset-footer-lake",
          )}
        >
          {t("viewAllCount", { count: total })}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
