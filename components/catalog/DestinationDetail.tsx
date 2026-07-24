import { getLocale, getTranslations } from "next-intl/server";

import { AppImage } from "@/components/media/AppImage";
import { DestinationAccommodationBrowse } from "@/components/catalog/DestinationAccommodationBrowse";
import { DestinationExcursionBrowse } from "@/components/catalog/DestinationExcursionBrowse";
import { ExcursionsComingSoonPanel } from "@/components/catalog/ExcursionsComingSoonPanel";
import { FaqSection } from "@/components/seo/FaqSection";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { hasExcursionsComingSoon } from "@/lib/catalog/excursion-image-folders";
import type { DestinationCatalog } from "@/lib/catalog/types";
import { PLANNER_PATH, getWhatsAppUrl } from "@/lib/constants";
import { localizeAccommodationItem } from "@/lib/i18n/localized-accommodations";
import { localizeExcursionItem } from "@/lib/i18n/localized-excursions";
import {
  catalogAccommodationCount,
  catalogExcursionCount,
  localizeCarRental,
} from "@/lib/i18n/localized-catalog";
import {
  getLocalizedDestinationPageCopy,
  getLocalizedDestinationSeoFaq,
  localizeDestinationCatalog,
} from "@/lib/i18n/localized-destinations-page";
import { IMAGE_SIZES } from "@/lib/image-config";
import {
  DETAIL_TITLE,
  SECTION_TITLE,
  SHELL_MAX,
  SHELL_PAGE_PT,
  SHELL_PX,
  siteShell,
} from "@/lib/layout-shell";
import { getDestinationSeo } from "@/lib/seo-destinations";
import { cn } from "@/lib/utils";

export async function DestinationDetail({
  destination: rawDestination,
}: {
  destination: DestinationCatalog;
}) {
  const locale = await getLocale();
  const tCatalog = await getTranslations("catalog");
  const tNav = await getTranslations("nav");
  const tHome = await getTranslations("homeDestinations");
  const tDest = await getTranslations("destinationsPage");
  const tAcc = await getTranslations("accommodations");
  const tExc = await getTranslations("excursions");

  const destination = localizeDestinationCatalog(tHome, rawDestination);
  const carRental = localizeCarRental(tDest, destination, locale);
  const carWhatsApp = getWhatsAppUrl(
    tCatalog("carRentalWhatsAppMessage", { destination: destination.name }),
  );
  const seo = getDestinationSeo(destination.slug);
  const localizedFaq = seo
    ? getLocalizedDestinationSeoFaq(tDest, locale, destination.slug, seo.faq)
    : undefined;
  const clientPageCopy = getLocalizedDestinationPageCopy(tDest, locale, destination.slug);
  const showIntroSection = Boolean(clientPageCopy || seo);

  const accommodationEntries = destination.accommodations.map((item) => ({
    destination,
    item: localizeAccommodationItem(tAcc, locale, destination.slug, destination.name, item),
    kind: "accommodation" as const,
  }));
  const excursionEntries = destination.excursions.map((item) => ({
    destination,
    item: localizeExcursionItem(tExc, locale, destination.slug, destination.name, item),
    kind: "excursion" as const,
  }));

  return (
    <>
      <section
        className={cn(
          "relative min-h-[40vh] overflow-hidden pb-10",
          SHELL_PAGE_PT,
          "max-md:min-h-[34vh] max-md:pb-8",
          "min-[1920px]:min-h-[44vh] min-[2560px]:min-h-[46vh]",
        )}
      >
        <AppImage
          src={destination.heroImage}
          alt={tCatalog("heroAlt", { destination: destination.name })}
          fill
          priority
          qualityPreset="hero"
          className="object-cover"
          sizes={IMAGE_SIZES.destinationHero}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30" />
        <div className={cn("relative", SHELL_MAX, SHELL_PX)}>
          <nav className="mb-4 text-sm text-white/85 max-md:mb-3 max-md:text-[0.8125rem] min-[1920px]:text-[0.9375rem]">
            <Link href="/" className="hover:text-white">
              {tNav("home")}
            </Link>
            <span className="mx-2">/</span>
            <Link href="/destinos" className="hover:text-white">
              {tNav("destinations")}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{destination.name}</span>
          </nav>
          <p className="text-sm font-medium text-white/90">{destination.region}</p>
          <h1 className={cn("font-heading mt-2 max-w-3xl text-white max-md:text-2xl max-md:leading-tight", DETAIL_TITLE)}>
            {destination.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/92 max-md:mt-3 max-md:text-[0.9375rem] max-md:leading-snug sm:text-lg min-[1920px]:max-w-3xl min-[1920px]:text-xl">
            {destination.intro}
          </p>
        </div>
      </section>

      <div
        className={cn(
          siteShell("space-y-16 py-12 lg:space-y-20 2xl:py-16"),
          "max-md:space-y-10 max-md:py-8",
          "min-[1920px]:space-y-24 min-[2560px]:space-y-28",
        )}
      >
        {showIntroSection ? (
          <section aria-labelledby="destination-seo-heading" className="max-w-3xl">
            <h2 id="destination-seo-heading" className={cn("font-heading", SECTION_TITLE, "max-md:text-xl")}>
              {clientPageCopy?.title ?? tCatalog("tripsTo", { destination: destination.name })}
            </h2>
            {clientPageCopy ? (
              <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {clientPageCopy.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {seo?.seoIntro}
              </p>
            )}
            <Link
              href={PLANNER_PATH}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "mt-6 inline-flex max-md:w-full max-md:justify-center max-md:whitespace-normal max-md:text-center",
              )}
            >
              {tCatalog("planTripTo", { destination: destination.name })}
            </Link>
          </section>
        ) : null}

        {accommodationEntries.length > 0 ? (
          <section aria-labelledby="alojamientos-heading" className="scroll-mt-24 sm:scroll-mt-28">
            <div className="mb-8 min-w-0 max-md:mb-6">
              <h2 id="alojamientos-heading" className={cn("font-heading", SECTION_TITLE, "max-md:text-xl")}>
                {tCatalog("sections.accommodations")}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {destination.region} ·{" "}
                {catalogAccommodationCount(tCatalog, accommodationEntries.length)}
              </p>
            </div>

            <DestinationAccommodationBrowse
              destination={destination}
              entries={accommodationEntries}
            />
          </section>
        ) : null}

        {excursionEntries.length > 0 ? (
          <section aria-labelledby="excursiones-heading" className="scroll-mt-24 sm:scroll-mt-28">
            <div className="mb-8 min-w-0 max-md:mb-6">
              <h2 id="excursiones-heading" className={cn("font-heading", SECTION_TITLE, "max-md:text-xl")}>
                {tCatalog("sections.excursions")}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {destination.region} · {catalogExcursionCount(tCatalog, excursionEntries.length)}
              </p>
            </div>

            <DestinationExcursionBrowse destination={destination} entries={excursionEntries} />
          </section>
        ) : hasExcursionsComingSoon(destination.slug) ? (
          <section aria-labelledby="excursiones-heading" className="scroll-mt-24 sm:scroll-mt-28">
            <div className="mb-8 min-w-0 max-md:mb-6">
              <h2 id="excursiones-heading" className={cn("font-heading", SECTION_TITLE, "max-md:text-xl")}>
                {tCatalog("sections.excursions")}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {destination.region}
              </p>
            </div>

            <ExcursionsComingSoonPanel destinationName={destination.name} />
          </section>
        ) : null}

        <section
          aria-labelledby="auto-heading"
          className="border-t border-border/70 pt-12 max-md:pt-8 lg:pt-14"
        >
          <div className="flex flex-col gap-6 max-md:gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 id="auto-heading" className={cn("font-heading", SECTION_TITLE)}>
                {tCatalog("sections.carRental")}
              </h2>
              <p className="mt-3 text-muted-foreground">{carRental.description}</p>
              <p className="mt-2 text-sm font-medium">
                {tCatalog("sections.operator")}{" "}
                <span className="font-normal text-muted-foreground">
                  {carRental.operatorName}
                </span>
              </p>
            </div>
            <a
              href={carWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "marketing", size: "lg" }), "shrink-0 max-md:w-full max-md:justify-center")}
            >
              {tCatalog("carRentalCta")}
            </a>
          </div>
        </section>

        {localizedFaq?.length ? (
          <FaqSection
            items={localizedFaq}
            title={tCatalog("faqAbout", { destination: destination.name })}
            className="border-t border-border/70 pt-12 lg:pt-14"
          />
        ) : null}
      </div>
    </>
  );
}
