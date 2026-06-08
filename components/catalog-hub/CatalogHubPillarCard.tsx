import { ArrowUpRight } from "lucide-react";
import { AppImage } from "@/components/media/AppImage";
import Link from "next/link";

import type { CatalogHubPillar } from "@/lib/catalog-hub/config";
import { IMAGE_QUALITY_GALLERY, IMAGE_SIZES } from "@/lib/image-config";
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

const linkBase =
  "group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2";

function ComingSoonBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "z-[3] rounded-full border border-white/35 bg-black/35 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm",
        className,
      )}
    >
      Próximamente
    </span>
  );
}

function CtaLabel({ isLive }: { isLive: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-medium transition duration-300">
      {isLive ? "Explorar" : "Ver avance"}
      <ArrowUpRight
        className="size-4 transition duration-300 [@media(hover:hover)]:group-hover:translate-x-0.5 [@media(hover:hover)]:group-hover:-translate-y-0.5"
        aria-hidden
      />
    </span>
  );
}

/** Mobile: marco + cabecera + póster con CTA pill. */
function HubPillarMagazineMobileCard({ pillar, priority }: CatalogHubPillarCardProps) {
  const isLive = pillar.status === "live";

  return (
    <Link
      href={pillar.href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[1.35rem] bg-card p-2.5 shadow-[0_18px_44px_-28px_rgba(0,0,0,0.22)] ring-1 ring-black/10",
        "transition duration-500 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2",
      )}
    >
      <div className="mb-2.5 flex items-end justify-between gap-3 px-0.5">
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

      <div className="relative aspect-[5/6] overflow-hidden rounded-[1rem] bg-muted/40">
        <AppImage
          src={pillar.image}
          alt={pillar.imageAlt}
          fill
          priority={priority}
          quality={IMAGE_QUALITY_GALLERY}
          sizes={IMAGE_SIZES.catalogHubCard}
          className="object-cover transition duration-700 motion-safe:[@media(hover:hover)]:group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/90 via-black/40 to-black/5" />
        {!isLive ? <ComingSoonBadge className="absolute right-3 top-3" /> : null}

        <div className="absolute inset-x-0 bottom-0 z-[3] p-4">
          <p className="line-clamp-3 max-w-[95%] text-sm leading-relaxed text-white/88">
            {pillar.description}
          </p>
          <span className="mt-3 inline-flex h-10 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-semibold text-foreground shadow-sm">
            {isLive ? "Explorar" : "Ver avance"}
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}

/** Desktop: póster unificado — tipografía sobre imagen (estilo excursiones). */
function HubPillarDesktopPosterCard({ pillar, priority }: CatalogHubPillarCardProps) {
  const isLive = pillar.status === "live";

  return (
    <Link
      href={pillar.href}
      className={cn(
        linkBase,
        "overflow-hidden rounded-3xl shadow-sm ring-1 ring-black/6 transition duration-500",
        "[@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:shadow-lg",
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <AppImage
          src={pillar.image}
          alt={pillar.imageAlt}
          fill
          priority={priority}
          quality={IMAGE_QUALITY_GALLERY}
          sizes={IMAGE_SIZES.catalogHubCard}
          className="object-cover transition duration-700 [@media(hover:hover)]:group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/88 via-black/35 to-black/10" />
        {!isLive ? <ComingSoonBadge className="absolute right-4 top-4" /> : null}

        <div className="absolute inset-x-0 bottom-0 z-[3] p-5 sm:p-6">
          <span className="mb-3 block h-px w-10 bg-white/55" aria-hidden />
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/75">
            {pillar.eyebrow}
          </p>
          <h3 className="font-heading mt-2 text-[1.85rem] font-medium leading-[1.05] tracking-tight text-white sm:text-[2rem]">
            {pillar.title}
          </h3>
          <p className="mt-3 max-w-[95%] text-sm leading-relaxed text-white/88 sm:text-[0.95rem]">
            {pillar.description}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white">
            <CtaLabel isLive={isLive} />
          </span>
        </div>

        <span
          className="pointer-events-none absolute right-4 top-4 z-[3] font-heading text-5xl font-light leading-none text-white/15 sm:text-6xl"
          aria-hidden
        >
          {PILLAR_INDEX[pillar.slug]}
        </span>
      </div>
    </Link>
  );
}

export function CatalogHubPillarCard({ pillar, priority = false }: CatalogHubPillarCardProps) {
  return (
    <>
      <div className="md:hidden">
        <HubPillarMagazineMobileCard pillar={pillar} priority={priority} />
      </div>
      <div className="hidden h-full md:block">
        <HubPillarDesktopPosterCard pillar={pillar} priority={priority} />
      </div>
    </>
  );
}
