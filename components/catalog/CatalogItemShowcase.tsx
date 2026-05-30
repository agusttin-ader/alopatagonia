import { MapPin } from "lucide-react";

import { CatalogItemGallery } from "@/components/catalog/CatalogItemGallery";
import { buttonVariants } from "@/components/ui/button";
import { buildCatalogWhatsAppMessage } from "@/lib/catalog/placeholders";
import type { CatalogItem } from "@/lib/catalog/types";
import { getWhatsAppUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

type CatalogItemShowcaseProps = {
  item: CatalogItem;
  destinationName: string;
  badge: string;
};

export function CatalogItemShowcase({
  item,
  destinationName,
  badge,
}: CatalogItemShowcaseProps) {
  if (item.images.length === 0) return null;

  const whatsAppHref = getWhatsAppUrl(
    buildCatalogWhatsAppMessage(item.name, destinationName),
  );

  return (
    <article className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm sm:rounded-3xl">
      <div className="bg-neutral-950 p-2 sm:p-3">
        <CatalogItemGallery images={item.images} />
      </div>

      <div className="space-y-5 p-5 sm:p-6 lg:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              {badge}
            </span>
            <h3 className="font-heading mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
              {item.name}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5 shrink-0" aria-hidden />
              {destinationName}
            </p>
          </div>
        </div>

        {item.description ? (
          <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
            {item.description}
          </p>
        ) : null}

        {item.highlights && item.highlights.length > 0 ? (
          <ul className="grid gap-2 sm:grid-cols-2">
            {item.highlights.map((line) => (
              <li
                key={line}
                className="flex gap-2 text-sm leading-relaxed text-foreground/90"
              >
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-border/70 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Coordinamos disponibilidad y precio según tus fechas.
          </p>
          <a
            href={whatsAppHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "marketing", size: "lg" }),
              "w-full shrink-0 sm:w-auto sm:min-w-[200px]",
            )}
          >
            Consultar
          </a>
        </div>
      </div>
    </article>
  );
}
