"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import {
  IMAGE_QUALITY,
  IMAGE_SIZES,
  SECTION_IDS,
  WINTER_STORE_COPY,
  WINTER_STORE_IMAGE,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

export function WinterStoreSection() {
  return (
    <section
      id={SECTION_IDS.winterShop}
      className="scroll-mt-24 border-y border-border/70 bg-secondary/30 px-4 py-12 sm:px-8 lg:px-14 2xl:px-20"
      aria-labelledby="winter-shop-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center lg:gap-14 2xl:max-w-[90rem]">
        <div className="order-2 lg:order-1">
          <Reveal>
            <h2
              id="winter-shop-heading"
              className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl 2xl:text-5xl"
            >
              {WINTER_STORE_COPY.homeHeading}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground 2xl:text-xl">
              {WINTER_STORE_COPY.homeBody}
            </p>
            <Link
              href="/invierno"
              className={cn(
                buttonVariants({ variant: "marketing", size: "lg" }),
                "mt-8 inline-flex h-12 items-center gap-2 px-8 text-base font-semibold 2xl:h-14 2xl:px-10 2xl:text-lg",
              )}
            >
              {WINTER_STORE_COPY.homeCta}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <Reveal className="relative isolate order-1 overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/8 lg:order-2">
          <Image
            src={WINTER_STORE_IMAGE.src}
            alt={WINTER_STORE_IMAGE.alt}
            width={WINTER_STORE_IMAGE.width}
            height={WINTER_STORE_IMAGE.height}
            quality={IMAGE_QUALITY}
            className="aspect-[16/11] size-full object-cover"
            sizes={IMAGE_SIZES.winterSection}
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <p className="absolute bottom-6 left-6 right-6 text-sm font-medium leading-relaxed text-white/95 drop-shadow-sm sm:text-base">
            Abrigos y capas para el viento sur.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
