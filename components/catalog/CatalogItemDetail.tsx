import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";

import { CatalogDetailGallery } from "@/components/catalog/CatalogDetailGallery";
import { buttonVariants } from "@/components/ui/button";
import type { CatalogItemEntry } from "@/lib/catalog/catalog-items";
import { getCatalogItemBadge } from "@/lib/catalog/catalog-items";
import { buildCatalogWhatsAppMessage } from "@/lib/catalog/placeholders";
import { getWhatsAppUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

type CatalogItemDetailProps = {
  entry: CatalogItemEntry;
};

export function CatalogItemDetail({ entry }: CatalogItemDetailProps) {
  const { destination, item } = entry;
  const badge = getCatalogItemBadge(entry);
  const whatsAppHref = getWhatsAppUrl(
    buildCatalogWhatsAppMessage(item.name, destination.name),
  );
  const backHref = `/destinos/${destination.slug}#${
    entry.kind === "excursion" ? "excursiones" : "alojamientos"
  }-heading`;
  const sectionLabel = entry.kind === "excursion" ? "excursiones" : "alojamientos";

  return (
    <div className="pb-16 pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 2xl:max-w-[90rem] 2xl:px-20">
        <nav className="mb-4 text-sm text-muted-foreground md:mb-5">
          <Link href="/destinos" className="inline-flex items-center gap-1.5 hover:text-foreground">
            <ArrowLeft className="size-3.5" aria-hidden />
            {destination.name}
          </Link>
        </nav>
      </div>

      <div className="px-3 sm:px-6 md:px-8 lg:px-12 xl:px-14">
        <div className="mx-auto w-full max-w-[1560px]">
          <CatalogDetailGallery
            images={item.images}
            lightboxLabel={`Vista ampliada — ${item.name}`}
          />
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-4 sm:mt-14 sm:px-8 lg:mt-16 lg:px-14 2xl:max-w-[90rem] 2xl:px-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-14 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 space-y-5">
            <div>
              <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                {badge}
              </span>
              <h1 className="font-heading mt-4 text-3xl font-medium tracking-tight sm:text-4xl lg:text-[2.6rem] lg:leading-tight">
                {item.name}
              </h1>
              <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground sm:text-base">
                <MapPin className="size-4 shrink-0" aria-hidden />
                {destination.name} · {destination.region}
              </p>
            </div>

            {item.description ? (
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {item.description}
              </p>
            ) : null}

            {item.highlights && item.highlights.length > 0 ? (
              <ul className="grid gap-2.5 border-t border-border/60 pt-6 sm:grid-cols-2">
                {item.highlights.map((line) => (
                  <li
                    key={line}
                    className="flex gap-2.5 text-sm leading-relaxed text-foreground/80"
                  >
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70"
                      aria-hidden
                    />
                    {line}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <aside className="lg:sticky lg:top-28">
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-7">
              <p className="font-heading text-lg font-medium tracking-tight">
                Consultá disponibilidad
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Te respondemos por WhatsApp con fechas, capacidad y opciones según tu viaje.
              </p>
              <a
                href={whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "marketing", size: "lg" }),
                  "mt-5 w-full",
                )}
              >
                Consultar
              </a>
              <div className="mt-6 space-y-2 border-t border-border/70 pt-5 text-sm">
                <Link href={backHref} className="block text-muted-foreground hover:text-foreground">
                  ← Volver a {sectionLabel} en {destination.name}
                </Link>
                <Link href="/destinos" className="block text-muted-foreground hover:text-foreground">
                  Ver todos los destinos
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
