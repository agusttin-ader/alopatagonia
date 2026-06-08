import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { BoulderIndumentariaShowcase } from "@/components/winter-store/BoulderIndumentariaShowcase";
import { buttonVariants } from "@/components/ui/button";
import {
  BOULDER_HOME_CAROUSEL_IMAGES,
  IMAGE_SIZES,
  SECTION_IDS,
  WINTER_STORE_COPY,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Promo en home — lleva a `/invierno` (landing con link a la tienda externa). */
export function WinterStorePromoSection() {
  return (
    <section
      id={SECTION_IDS.winterShop}
      className="scroll-mt-24 bg-winter-promo px-4 py-14 text-winter-promo-foreground sm:px-8 sm:py-16 lg:px-14 2xl:px-20"
      aria-labelledby="winter-promo-heading"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 2xl:max-w-[90rem] 2xl:gap-16">
        <div className="max-w-xl lg:max-w-none">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
            {WINTER_STORE_COPY.homeEyebrow}
          </p>
          <h2
            id="winter-promo-heading"
            className="font-heading mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl 2xl:text-[2.5rem] 2xl:leading-tight"
          >
            {WINTER_STORE_COPY.homeHeading}
          </h2>
          <p className="mt-4 space-y-4 text-base leading-relaxed text-white/88 sm:text-lg 2xl:text-xl">
            {WINTER_STORE_COPY.homeBodyParagraphs.map((paragraph) => (
              <span key={paragraph} className="block">
                {paragraph}
              </span>
            ))}
          </p>
          <Link
            href="/invierno"
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-white px-8 text-base font-semibold text-winter-promo shadow-md hover:bg-white/92 2xl:h-14 2xl:px-10",
            )}
          >
            {WINTER_STORE_COPY.homeCta}
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>

        <Link
          href="/invierno"
          className="group relative isolate block overflow-hidden rounded-3xl shadow-lg ring-1 ring-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-winter-promo"
        >
          <div className="relative aspect-[5/6] sm:aspect-[16/11] lg:aspect-[5/6] xl:aspect-[16/10]">
            <BoulderIndumentariaShowcase
              images={BOULDER_HOME_CAROUSEL_IMAGES}
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
        </Link>
      </div>
    </section>
  );
}
