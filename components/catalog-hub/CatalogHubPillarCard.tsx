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

/** Póster unificado — imagen full bleed, texto sobre gradiente (estilo Excursiones). */
function HubPillarPosterCard({ pillar, priority }: CatalogHubPillarCardProps) {
  const isLive = pillar.status === "live";

  return (
    <Link
      href={pillar.href}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/6 transition duration-500 sm:rounded-3xl",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2",
        "active:scale-[0.99] motion-safe:[@media(hover:hover)]:hover:-translate-y-0.5 motion-safe:[@media(hover:hover)]:hover:shadow-lg",
      )}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted/40">
        <AppImage
          src={pillar.image}
          alt={pillar.imageAlt}
          fill
          priority={priority}
          quality={IMAGE_QUALITY_GALLERY}
          sizes={IMAGE_SIZES.catalogHubCard}
          className="object-cover transition duration-700 motion-safe:[@media(hover:hover)]:group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/35 to-black/10" />
        {!isLive ? <ComingSoonBadge className="absolute right-3 top-3 sm:right-4 sm:top-4" /> : null}

        <span
          className="pointer-events-none absolute right-3 top-3 font-heading text-4xl font-light leading-none text-white/15 sm:right-4 sm:top-4 sm:text-6xl"
          aria-hidden
        >
          {PILLAR_INDEX[pillar.slug]}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
          <span className="mb-2 block h-px w-10 bg-white/55 sm:mb-3" aria-hidden />
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/75">
            {pillar.eyebrow}
          </p>
          <h3 className="font-heading mt-1.5 text-xl font-medium leading-[1.05] tracking-tight text-white sm:mt-2 sm:text-[2rem]">
            {pillar.title}
          </h3>
          <p className="mt-2 line-clamp-3 max-w-[95%] text-sm leading-relaxed text-white/88 sm:mt-3 sm:line-clamp-none sm:text-[0.95rem]">
            {pillar.description}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white sm:mt-5">
            {isLive ? "Explorar" : "Ver avance"}
            <ArrowUpRight
              className="size-4 transition duration-300 motion-safe:[@media(hover:hover)]:group-hover:translate-x-0.5 motion-safe:[@media(hover:hover)]:group-hover:-translate-y-0.5"
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
