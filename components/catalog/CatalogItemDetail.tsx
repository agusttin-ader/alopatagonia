import { getLocale, getTranslations } from "next-intl/server";
import { ArrowLeft, MapPin } from "lucide-react";

import { CatalogDetailGallery } from "@/components/catalog/CatalogDetailGallery";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { CatalogItemEntry } from "@/lib/catalog/catalog-items";
import { getLocalizedCatalogItemBadge } from "@/lib/i18n/localized-catalog";
import { buildCatalogWhatsAppMessage } from "@/lib/catalog/placeholders";
import { getWhatsAppUrl } from "@/lib/constants";
import { localizeAccommodationItem } from "@/lib/i18n/localized-accommodations";
import { localizeDestinationCatalog } from "@/lib/i18n/localized-destinations-page";
import {
  DETAIL_SIDEBAR_GRID,
  DETAIL_STICKY_TOP,
  DETAIL_TITLE,
  GALLERY_BAND_PX,
  GALLERY_MAX,
  SHELL_PAGE_PT,
  siteShell,
} from "@/lib/layout-shell";
import { cn } from "@/lib/utils";

type CatalogItemDetailProps = {
  entry: CatalogItemEntry;
};

export async function CatalogItemDetail({ entry: rawEntry }: CatalogItemDetailProps) {
  const locale = await getLocale();
  const t = await getTranslations("catalog");
  const tHome = await getTranslations("homeDestinations");
  const tAcc = await getTranslations("accommodations");

  const destination = localizeDestinationCatalog(tHome, rawEntry.destination);
  const item =
    rawEntry.kind === "accommodation"
      ? localizeAccommodationItem(
          tAcc,
          locale,
          destination.slug,
          destination.name,
          rawEntry.item,
        )
      : rawEntry.item;
  const entry = { ...rawEntry, destination, item };

  const badge = getLocalizedCatalogItemBadge(t, entry);
  const whatsAppHref = getWhatsAppUrl(
    buildCatalogWhatsAppMessage(item.name, destination.name),
  );
  const backHref = `/destinos/${destination.slug}#${
    entry.kind === "excursion" ? "excursiones" : "alojamientos"
  }-heading`;
  const sectionKey =
    entry.kind === "excursion" ? "excursions" : ("accommodations" as const);

  return (
    <div className={cn("pb-24 sm:pb-28 min-[1920px]:pb-32 min-[2560px]:pb-36", SHELL_PAGE_PT)}>
      <div className={siteShell()}>
        <nav className="mb-4 text-sm text-muted-foreground md:mb-5 min-[1920px]:text-[0.9375rem]">
          <Link href="/destinos" className="inline-flex items-center gap-1.5 hover:text-foreground">
            <ArrowLeft className="size-3.5 min-[1920px]:size-4" aria-hidden />
            {destination.name}
          </Link>
        </nav>
      </div>

      <div className={GALLERY_BAND_PX}>
        <div className={GALLERY_MAX}>
          <CatalogDetailGallery
            images={item.images}
            lightboxLabel={t("lightboxAlt", { name: item.name })}
            enableMobileLightbox={entry.kind !== "accommodation"}
          />
        </div>
      </div>

      <div
        className={cn(
          siteShell("mt-12 sm:mt-14 lg:mt-16 min-[1920px]:mt-20 min-[2560px]:mt-24"),
        )}
      >
        <div className={cn("grid gap-10 lg:items-start lg:gap-14", DETAIL_SIDEBAR_GRID)}>
          <div className="min-w-0 space-y-5 min-[1920px]:space-y-6">
            <div>
              <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary min-[1920px]:px-3 min-[1920px]:py-1.5 min-[1920px]:text-[0.8125rem]">
                {badge}
              </span>
              <h1 className={cn("font-heading mt-4", DETAIL_TITLE)}>{item.name}</h1>
              <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground sm:text-base min-[1920px]:text-lg">
                <MapPin className="size-4 shrink-0 min-[1920px]:size-[1.125rem]" aria-hidden />
                {destination.name} · {destination.region}
              </p>
            </div>

            {item.description ? (
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg min-[1920px]:max-w-3xl min-[1920px]:text-xl min-[2560px]:max-w-4xl">
                {item.description}
              </p>
            ) : null}

            {item.highlights && item.highlights.length > 0 ? (
              <ul className="grid gap-2.5 border-t border-border/60 pt-6 sm:grid-cols-2 min-[1920px]:gap-3 min-[1920px]:pt-8">
                {item.highlights.map((line) => (
                  <li
                    key={line}
                    className="flex gap-2.5 text-sm leading-relaxed text-foreground/80 min-[1920px]:text-base"
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

          <aside className={cn("lg:sticky", DETAIL_STICKY_TOP)}>
            <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm sm:p-7 min-[1920px]:rounded-3xl min-[1920px]:p-8 min-[2560px]:p-9">
              <p className="font-heading text-lg font-medium tracking-tight min-[1920px]:text-xl">
                {t("itemDetail.askTitle")}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground min-[1920px]:text-base">
                {t("itemDetail.askBody")}
              </p>
              <a
                href={whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "marketing", size: "lg" }),
                  "mt-5 w-full min-[1920px]:mt-6 min-[1920px]:h-12 min-[1920px]:text-base",
                )}
              >
                {t("itemDetail.askCta")}
              </a>
              <div className="mt-6 space-y-2 border-t border-border/70 pt-5 text-sm min-[1920px]:mt-8 min-[1920px]:text-base">
                <Link href={backHref} className="block text-muted-foreground hover:text-foreground">
                  {t("itemDetail.backTo", {
                    section: t(`itemDetail.sections.${sectionKey}`),
                    destination: destination.name,
                  })}
                </Link>
                <Link href="/destinos" className="block text-muted-foreground hover:text-foreground">
                  {t("viewAllDestinations")}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
