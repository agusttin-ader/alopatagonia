import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";

import { BoulderIndumentariaShowcase } from "@/components/winter-store/BoulderIndumentariaShowcase";
import { buttonVariants } from "@/components/ui/button";
import { Link as LocaleLink } from "@/i18n/navigation";
import {
  BOULDER_HOME_CAROUSEL_IMAGES,
  IMAGE_SIZES,
  SECTION_IDS,
} from "@/lib/constants";
import { getWinterCarouselAlts } from "@/lib/i18n/localized-home";
import { cn } from "@/lib/utils";

/** Promo en home — lleva a `/invierno` (landing con link a la tienda externa). */
export async function WinterStorePromoSection() {
  const t = await getTranslations("winterPromo");
  const carouselAlts = getWinterCarouselAlts(t);
  const carouselImages = BOULDER_HOME_CAROUSEL_IMAGES.map((image, index) => ({
    ...image,
    alt: carouselAlts[index] ?? image.alt,
  }));
  const bodyParagraphs = t.raw("body") as string[];

  return (
    <section
      id={SECTION_IDS.winterShop}
      className="scroll-mt-24 bg-winter-promo px-4 py-14 text-winter-promo-foreground sm:px-8 sm:py-16 lg:px-14 lg:py-20 2xl:px-20"
      aria-labelledby="winter-promo-heading"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 2xl:max-w-[90rem] 2xl:gap-16">
        <div className="max-w-xl lg:max-w-none xl:max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
            {t("eyebrow")}
          </p>
          <h2
            id="winter-promo-heading"
            className="font-heading mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl 2xl:text-5xl 2xl:leading-tight"
          >
            {t("heading")}
          </h2>
          <p className="mt-4 space-y-4 text-base leading-relaxed text-white/88 sm:text-lg 2xl:text-xl">
            {bodyParagraphs.map((paragraph) => (
              <span key={paragraph} className="block">
                {paragraph}
              </span>
            ))}
          </p>
          <LocaleLink
            href="/invierno"
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-8 text-base font-semibold text-winter-promo shadow-md hover:bg-white/92 2xl:h-14 2xl:px-10",
            )}
          >
            {t("cta")}
            <ArrowUpRight className="size-4" aria-hidden />
          </LocaleLink>
        </div>

        <LocaleLink
          href="/invierno"
          className="group relative isolate block overflow-hidden rounded-3xl shadow-lg ring-1 ring-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-winter-promo"
        >
          <div className="relative aspect-[5/6] sm:aspect-[16/11] lg:aspect-[4/3] xl:aspect-[16/10]">
            <BoulderIndumentariaShowcase
              images={carouselImages}
              sizes={IMAGE_SIZES.winterSection}
              logoLinked={false}
            />
          </div>
          <div className="absolute bottom-5 right-5">
            <span
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/35 bg-white/12 text-white backdrop-blur-sm transition group-hover:bg-white/20"
              aria-hidden
            >
              <ArrowUpRight className="size-4" />
            </span>
          </div>
        </LocaleLink>
      </div>
    </section>
  );
}
