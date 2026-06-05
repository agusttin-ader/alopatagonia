import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { CatalogHubPillar } from "@/lib/catalog-hub/config";
import { IMAGE_QUALITY_GALLERY, IMAGE_SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

type CatalogHubPillarCardProps = {
  pillar: CatalogHubPillar;
  priority?: boolean;
};

const linkBase =
  "group flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2";

function ComingSoonBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full border border-white/35 bg-black/35 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm",
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

/** 01 · Editorial atlas — imagen alta, índice tipográfico, texto debajo. */
function DestinosHubCard({ pillar, priority }: CatalogHubPillarCardProps) {
  return (
    <Link href={pillar.href} className={cn(linkBase, "motion-safe:hover:-translate-y-0.5")}>
      <div className="overflow-hidden rounded-3xl bg-muted/40 shadow-sm ring-1 ring-black/6 transition duration-500 group-hover:shadow-lg">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={pillar.image}
            alt={pillar.imageAlt}
            fill
            priority={priority}
            quality={IMAGE_QUALITY_GALLERY}
            sizes={IMAGE_SIZES.catalogHubCard}
            className="object-cover transition duration-700 [@media(hover:hover)]:group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          <span
            className="pointer-events-none absolute bottom-3 right-4 font-heading text-[4.5rem] font-light leading-none tracking-tighter text-white/20 sm:text-[5.5rem]"
            aria-hidden
          >
            01
          </span>
        </div>
      </div>

      <div className="mt-5 border-t border-border/80 pt-5">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {pillar.eyebrow}
        </p>
        <h3 className="font-heading mt-2 text-2xl font-medium tracking-tight text-foreground sm:text-[1.75rem]">
          {pillar.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
          {pillar.description}
        </p>
        <span className="mt-4 block text-primary">
          <CtaLabel isLive={pillar.status === "live"} />
        </span>
      </div>
    </Link>
  );
}

/** 02 · Split espejo — ficha izquierda, imagen derecha. */
function AlojamientosHubCard({ pillar, priority }: CatalogHubPillarCardProps) {
  const isLive = pillar.status === "live";

  return (
    <Link href={pillar.href} className={cn(linkBase, "motion-safe:hover:-translate-y-0.5")}>
      <div className="flex aspect-[3/4] overflow-hidden rounded-3xl shadow-sm ring-1 ring-black/6 transition duration-500 group-hover:shadow-lg">
        <div className="flex w-[46%] min-w-[9.25rem] flex-col justify-between border-r border-border/60 bg-muted/35 p-3.5 sm:p-4">
          <div>
            <span
              className="font-heading block text-3xl font-light leading-none text-foreground/12 sm:text-4xl"
              aria-hidden
            >
              02
            </span>
            <p className="mt-3 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {pillar.eyebrow}
            </p>
            <h3 className="font-heading mt-1.5 text-base font-medium leading-tight tracking-tight text-foreground sm:text-lg">
              {pillar.title}
            </h3>
            <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {pillar.description}
            </p>
          </div>
          <span className="pt-4 text-primary">
            <CtaLabel isLive={isLive} />
          </span>
        </div>

        <div className="relative min-w-0 flex-1">
          <Image
            src={pillar.image}
            alt={pillar.imageAlt}
            fill
            priority={priority}
            quality={IMAGE_QUALITY_GALLERY}
            sizes={IMAGE_SIZES.catalogHubCard}
            className="object-cover transition duration-700 [@media(hover:hover)]:group-hover:scale-[1.05]"
          />
          {!isLive ? <ComingSoonBadge className="absolute left-2.5 top-2.5" /> : null}
        </div>
      </div>
    </Link>
  );
}

/** 03 · Póster — tipografía sobre imagen, sensación outdoor/cine. */
function ExcursionesHubCard({ pillar, priority }: CatalogHubPillarCardProps) {
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
        <Image
          src={pillar.image}
          alt={pillar.imageAlt}
          fill
          priority={priority}
          quality={IMAGE_QUALITY_GALLERY}
          sizes={IMAGE_SIZES.catalogHubCard}
          className="object-cover transition duration-700 [@media(hover:hover)]:group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/35 to-black/10" />
        {!isLive ? <ComingSoonBadge className="absolute right-4 top-4" /> : null}

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <span className="mb-3 block h-px w-10 bg-white/55" aria-hidden />
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/75">
            {pillar.eyebrow}
          </p>
          <h3 className="font-heading mt-2 text-[1.85rem] font-medium leading-[1.05] tracking-tight text-white sm:text-[2rem]">
            {pillar.title}
          </h3>
          <p className="mt-3 max-w-[95%] text-sm leading-relaxed text-white/88 sm:text-[0.95rem]">
            {pillar.description}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white">
            {isLive ? "Explorar" : "Ver avance"}
            <ArrowUpRight
              className="size-4 transition duration-300 [@media(hover:hover)]:group-hover:translate-x-0.5 [@media(hover:hover)]:group-hover:-translate-y-0.5"
              aria-hidden
            />
          </span>
        </div>

        <span
          className="pointer-events-none absolute right-4 top-4 font-heading text-5xl font-light leading-none text-white/15 sm:text-6xl"
          aria-hidden
        >
          03
        </span>
      </div>
    </Link>
  );
}

const VARIANT_BY_SLUG = {
  destinos: DestinosHubCard,
  alojamientos: AlojamientosHubCard,
  excursiones: ExcursionesHubCard,
} as const;

export function CatalogHubPillarCard({ pillar, priority = false }: CatalogHubPillarCardProps) {
  const Variant = VARIANT_BY_SLUG[pillar.slug];
  return <Variant pillar={pillar} priority={priority} />;
}
