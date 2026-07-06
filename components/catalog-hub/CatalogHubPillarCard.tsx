import { ArrowUpRight } from "lucide-react";
import { AppImage } from "@/components/media/AppImage";
import { Link } from "@/i18n/navigation";

import type { CatalogHubPillar } from "@/lib/catalog-hub/config";
import { HUB_PILLAR_IMAGE_HOVER_EXPAND } from "@/lib/hover-expand-motion";
import { IMAGE_SIZES } from "@/lib/image-config";
import { POSTER_LINK_CTA_HOVER } from "@/lib/interactive-hover";
import { cn } from "@/lib/utils";

type CatalogHubPillarCardProps = {
  pillar: CatalogHubPillar;
  priority?: boolean;
  labels: {
    comingSoon: string;
    explore: string;
    preview: string;
  };
};

const PILLAR_INDEX: Record<CatalogHubPillar["slug"], string> = {
  destinos: "01",
  alojamientos: "02",
  excursiones: "03",
};

const linkBase =
  "group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2";

function ComingSoonBadge({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "z-[3] rounded-full border border-white/35 bg-black/35 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm",
        className,
      )}
    >
      {label}
    </span>
  );
}

function CtaLabel({ isLive, labels }: { isLive: boolean; labels: CatalogHubPillarCardProps["labels"] }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm font-medium", POSTER_LINK_CTA_HOVER)}>
      {isLive ? labels.explore : labels.preview}
      <ArrowUpRight
        className="size-4 transition duration-300 [@media(hover:hover)]:group-hover:translate-x-0.5 [@media(hover:hover)]:group-hover:-translate-y-0.5"
        aria-hidden
      />
    </span>
  );
}

type HubPillarPosterOverlayProps = {
  pillar: CatalogHubPillar;
  labels: CatalogHubPillarCardProps["labels"];
  isLive: boolean;
  density: "mobile" | "desktop";
};

/** Overlay inferior con altura fija: línea, tipografía y CTA alineados entre cards. */
function HubPillarPosterOverlay({
  pillar,
  labels,
  isLive,
  density,
}: HubPillarPosterOverlayProps) {
  const isMobile = density === "mobile";

  return (
    <div
      className={cn(
        "absolute inset-x-0 bottom-0 z-[3] flex flex-col",
        isMobile
          ? "h-[56%] min-h-[12.75rem] max-h-[17.5rem] p-4"
          : "h-[58%] min-h-[14.5rem] max-h-[20rem] p-5 sm:min-h-[15.5rem] sm:p-6",
      )}
    >
      <span className="mb-3 block h-px w-10 shrink-0 bg-white/55" aria-hidden />
      <p
        className={cn(
          "shrink-0 font-semibold uppercase tracking-[0.12em] text-white/75",
          isMobile ? "text-[0.68rem] tracking-[0.1em]" : "text-xs",
        )}
      >
        {pillar.eyebrow}
      </p>
      <h3
        className={cn(
          "font-heading mt-2 shrink-0 font-medium leading-[1.05] tracking-tight text-white",
          isMobile ? "text-[1.55rem]" : "text-[1.85rem] sm:text-[2rem]",
        )}
      >
        {pillar.title}
      </h3>
      <p
        className={cn(
          "mt-3 min-h-0 flex-1 leading-relaxed text-white/88 line-clamp-4",
          isMobile ? "text-[0.875rem] leading-[1.55]" : "text-sm sm:text-[0.95rem]",
        )}
      >
        {pillar.description}
      </p>
      <span className="mt-auto inline-flex w-fit shrink-0 items-center gap-1.5 self-start pt-4 text-sm font-medium text-white">
        <CtaLabel isLive={isLive} labels={labels} />
      </span>
    </div>
  );
}

function HubPillarPosterCard({
  pillar,
  priority,
  labels,
  density,
}: CatalogHubPillarCardProps & { density: "mobile" | "desktop" }) {
  const isLive = pillar.status === "live";
  const isMobile = density === "mobile";

  return (
    <Link
      href={pillar.href}
      className={cn(
        linkBase,
        "overflow-hidden shadow-sm ring-1 ring-black/6 transition duration-500",
        isMobile
          ? "rounded-[1.35rem]"
          : "rounded-3xl [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:shadow-lg",
        !isMobile && isLive && "ring-2 ring-primary/35",
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <AppImage
          src={pillar.image}
          alt={pillar.imageAlt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          qualityPreset="card"
          sizes={IMAGE_SIZES.catalogHubCard}
          className={cn(HUB_PILLAR_IMAGE_HOVER_EXPAND, pillar.imagePosition)}
        />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/88 via-black/35 to-black/10" />
        {!isLive ? (
          <ComingSoonBadge
            label={labels.comingSoon}
            className={isMobile ? "absolute right-3 top-3" : "absolute right-4 top-4"}
          />
        ) : null}

        <HubPillarPosterOverlay
          pillar={pillar}
          labels={labels}
          isLive={isLive}
          density={density}
        />

        <span
          className={cn(
            "pointer-events-none absolute right-4 top-4 z-[3] font-heading font-light leading-none text-white/15",
            isMobile ? "text-4xl" : "text-5xl sm:text-6xl",
          )}
          aria-hidden
        >
          {PILLAR_INDEX[pillar.slug]}
        </span>
      </div>
    </Link>
  );
}

export function CatalogHubPillarCard({ pillar, priority = false, labels }: CatalogHubPillarCardProps) {
  return (
    <>
      <div className="md:hidden">
        <HubPillarPosterCard pillar={pillar} priority={priority} labels={labels} density="mobile" />
      </div>
      <div className="hidden h-full md:block">
        <HubPillarPosterCard pillar={pillar} labels={labels} density="desktop" />
      </div>
    </>
  );
}
