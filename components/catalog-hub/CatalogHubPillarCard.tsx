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

export function CatalogHubPillarCard({ pillar, priority = false }: CatalogHubPillarCardProps) {
  const isLive = pillar.status === "live";

  return (
    <Link
      href={pillar.href}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm",
        "transition-[transform,box-shadow,border-color] duration-300 ease-out motion-reduce:transition-none",
        "hover:-translate-y-0.5 hover:border-border hover:shadow-md",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2",
      )}
    >
      <div className="relative aspect-[5/4] overflow-hidden bg-muted sm:aspect-[4/3]">
        <Image
          src={pillar.image}
          alt={pillar.imageAlt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          quality={IMAGE_QUALITY_GALLERY}
          sizes={IMAGE_SIZES.catalogHubCard}
          className="object-cover transition-transform duration-500 ease-out motion-reduce:transition-none [@media(hover:hover)]:group-hover:scale-[1.03]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/5"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/75">
            {pillar.eyebrow}
          </p>
          <h3 className="font-heading mt-1.5 text-2xl font-medium tracking-tight text-white sm:text-[1.65rem]">
            {pillar.title}
          </h3>
        </div>
        {!isLive ? (
          <span className="absolute right-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wide text-foreground/80">
            Próximamente
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
          {pillar.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
          {isLive ? "Explorar" : "Ver avance"}
          <ArrowUpRight
            className="size-4 transition-transform duration-300 ease-out motion-reduce:transition-none [@media(hover:hover)]:group-hover:translate-x-0.5 [@media(hover:hover)]:group-hover:-translate-y-0.5"
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}
