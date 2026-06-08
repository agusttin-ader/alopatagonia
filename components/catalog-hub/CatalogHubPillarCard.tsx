import { ArrowUpRight } from "lucide-react";
import { AppImage } from "@/components/media/AppImage";
import Link from "next/link";

import type { CatalogHubPillar } from "@/lib/catalog-hub/config";
import { IMAGE_QUALITY_GALLERY, IMAGE_SIZES } from "@/lib/image-config";
import { MOBILE_MAGAZINE_G_ENABLED } from "@/lib/mobile-magazine-g";
import { cn } from "@/lib/utils";

type CatalogHubPillarCardProps = {
  pillar: CatalogHubPillar;
  priority?: boolean;
};

const PILLAR_INDEX: Record<CatalogHubPillar["slug"], string> = {
  destinos: "01",
  alojamientos: "02",
  excursiones: "03",
};

function ComingSoonBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full border border-white/35 bg-black/35 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm",
        className,
      )}
    >
      Próximamente
    </span>
  );
}

/** Póster — imagen full bleed, texto sobre gradiente. Mobile: marco + cabecera legible. */
function HubPillarPosterCard({ pillar, priority }: CatalogHubPillarCardProps) {
  const isLive = pillar.status === "live";

  return (
    <Link
      href={pillar.href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/6 transition duration-500 sm:rounded-3xl",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2",
        "active:scale-[0.99] motion-safe:[@media(hover:hover)]:hover:-translate-y-0.5 motion-safe:[@media(hover:hover)]:hover:shadow-lg",
        MOBILE_MAGAZINE_G_ENABLED &&
          "max-md:rounded-[1.35rem] max-md:bg-card max-md:p-2.5 max-md:shadow-[0_18px_44px_-28px_rgba(0,0,0,0.22)] max-md:ring-black/10",
      )}
    >
      {MOBILE_MAGAZINE_G_ENABLED ? (
        <div className="mb-2.5 flex items-end justify-between gap-3 px-0.5 md:hidden">
          <div className="min-w-0">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {pillar.eyebrow}
            </p>
            <h3 className="font-heading mt-0.5 truncate text-xl font-semibold tracking-tight text-foreground">
              {pillar.title}
            </h3>
          </div>
          <span
            className="font-heading shrink-0 text-2xl font-light leading-none text-foreground/20"
            aria-hidden
          >
            {PILLAR_INDEX[pillar.slug]}
          </span>
        </div>
      ) : null}

      <div
        className={cn(
          "relative aspect-[3/4] overflow-hidden bg-muted/40",
          MOBILE_MAGAZINE_G_ENABLED && "max-md:aspect-[5/6] max-md:rounded-[1rem]",
        )}
      >
        <AppImage
          src={pillar.image}
          alt={pillar.imageAlt}
          fill
          priority={priority}
          quality={IMAGE_QUALITY_GALLERY}
          sizes={IMAGE_SIZES.catalogHubCard}
          className="object-cover transition duration-700 motion-safe:[@media(hover:hover)]:group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/5" />
        {!isLive ? <ComingSoonBadge className="absolute right-3 top-3 sm:right-4 sm:top-4" /> : null}

        <span
          className={cn(
            "pointer-events-none absolute right-3 top-3 font-heading text-4xl font-light leading-none text-white/15 sm:right-4 sm:top-4 sm:text-6xl",
            MOBILE_MAGAZINE_G_ENABLED && "max-md:hidden",
          )}
          aria-hidden
        >
          {PILLAR_INDEX[pillar.slug]}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
          <span
            className={cn(
              "mb-2 block h-px w-10 bg-white/55 sm:mb-3",
              MOBILE_MAGAZINE_G_ENABLED && "max-md:hidden",
            )}
            aria-hidden
          />
          <p
            className={cn(
              "text-xs font-semibold uppercase tracking-[0.12em] text-white/75",
              MOBILE_MAGAZINE_G_ENABLED && "max-md:hidden",
            )}
          >
            {pillar.eyebrow}
          </p>
          <h3
            className={cn(
              "font-heading mt-1.5 text-xl font-medium leading-[1.05] tracking-tight text-white sm:mt-2 sm:text-[2rem]",
              MOBILE_MAGAZINE_G_ENABLED && "max-md:hidden",
            )}
          >
            {pillar.title}
          </h3>
          <p className="mt-2 line-clamp-3 max-w-[95%] text-sm leading-relaxed text-white/88 sm:mt-3 sm:line-clamp-none sm:text-[0.95rem]">
            {pillar.description}
          </p>
          <span
            className={cn(
              "mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white sm:mt-5",
              MOBILE_MAGAZINE_G_ENABLED &&
                "max-md:mt-3 max-md:h-10 max-md:rounded-full max-md:bg-white max-md:px-4 max-md:text-sm max-md:font-semibold max-md:text-foreground max-md:shadow-sm",
            )}
          >
            {isLive ? "Explorar" : "Ver avance"}
            <ArrowUpRight
              className={cn(
                "size-4 transition duration-300 motion-safe:[@media(hover:hover)]:group-hover:translate-x-0.5 motion-safe:[@media(hover:hover)]:group-hover:-translate-y-0.5",
                MOBILE_MAGAZINE_G_ENABLED && "max-md:text-foreground",
              )}
              aria-hidden
            />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function CatalogHubPillarCard({ pillar, priority = false }: CatalogHubPillarCardProps) {
  return <HubPillarPosterCard pillar={pillar} priority={priority} />;
}
