"use client";

import { Check, ExternalLink } from "lucide-react";
import Link from "next/link";

import { SiteLogo } from "@/components/brand/SiteLogo";
import { BoulderHeroBackdrop } from "@/components/winter-store/BoulderHeroBackdrop";
import { BoulderLogo } from "@/components/winter-store/BoulderLogo";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import type { GalleryImage } from "@/lib/constants";
import {
  getWinterStoreUrl,
  IMAGE_SIZES,
  WINTER_STORE_COPY,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

type WinterStoreLandingProps = {
  heroImage: GalleryImage;
};

export function WinterStoreLanding({ heroImage }: WinterStoreLandingProps) {
  const storeUrl = getWinterStoreUrl();

  return (
    <>
      <section
        className="relative flex min-h-[78dvh] w-full flex-col items-center justify-center overflow-hidden px-6 py-28 text-center shadow-xl ring-1 ring-black/10 sm:min-h-[80dvh] sm:px-10 sm:py-32 2xl:px-20"
        aria-labelledby="winter-landing-heading"
      >
        <BoulderHeroBackdrop
          image={heroImage}
          priority
          sizes={IMAGE_SIZES.viewport}
          className="absolute inset-0"
          shade={0.62}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15" aria-hidden />
        <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center 2xl:max-w-4xl">
          <Reveal className="mb-6">
            <div className="flex items-center justify-center gap-5 sm:gap-6">
              <SiteLogo variant="onDark" priority className="h-[4.75rem] w-auto sm:h-[4.75rem]" />
              <BoulderLogo priority className="h-12 w-auto" />
            </div>
          </Reveal>
          <Reveal>
            <h1
              id="winter-landing-heading"
              className="font-heading text-3xl font-medium tracking-tight text-white [text-shadow:0_3px_18px_rgba(0,0,0,0.5)] sm:text-4xl 2xl:text-5xl"
            >
              {WINTER_STORE_COPY.heroTitle}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/96 [text-shadow:0_2px_12px_rgba(0,0,0,0.45)] 2xl:text-xl">
              {WINTER_STORE_COPY.heroSubtitle}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-10 w-full">
            <ul className="mx-auto flex flex-col items-center gap-3 text-base text-white">
              {WINTER_STORE_COPY.bullets.map((line) => (
                <li key={line} className="inline-flex max-w-md items-start gap-3 sm:max-w-lg">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/35">
                    <Check className="size-3.5 text-white" aria-hidden />
                  </span>
                  <span className="text-left leading-relaxed [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">{line}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12} className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
            <a
              href={storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-8 text-base font-semibold shadow-lg sm:w-auto 2xl:h-14 2xl:px-10 2xl:text-lg",
              )}
            >
              {WINTER_STORE_COPY.ctaPrimary}
              <ExternalLink className="size-4 opacity-80" aria-hidden />
            </a>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "inline-flex h-12 w-full items-center justify-center rounded-full border-white/45 bg-white/16 px-8 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/22 hover:text-white sm:w-auto 2xl:h-14 2xl:px-10 2xl:text-lg",
              )}
            >
              {WINTER_STORE_COPY.ctaSecondaryHome}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
