"use client";

import { Check, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import {
  getWhatsAppUrl,
  getWinterStoreUrl,
  IMAGE_QUALITY,
  IMAGE_SIZES,
  WINTER_STORE_COPY,
  WINTER_STORE_IMAGE,
  WINTER_STORE_WHATSAPP_MESSAGE,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

export function WinterStoreLanding() {
  const storeUrl = getWinterStoreUrl();
  const whatsappUrl = getWhatsAppUrl(WINTER_STORE_WHATSAPP_MESSAGE);

  return (
    <>
      <section
        className="relative flex min-h-[78dvh] w-full flex-col justify-end overflow-hidden px-6 pb-16 pt-28 text-center shadow-xl ring-1 ring-black/10 sm:min-h-[80dvh] sm:px-10 sm:pb-20 sm:pt-32 2xl:px-20"
        aria-labelledby="winter-landing-heading"
      >
        <Image
          src={WINTER_STORE_IMAGE.src}
          alt={WINTER_STORE_IMAGE.alt}
          width={WINTER_STORE_IMAGE.width}
          height={WINTER_STORE_IMAGE.height}
          quality={IMAGE_QUALITY}
          priority
          className="absolute inset-0 size-full object-cover"
          sizes={IMAGE_SIZES.viewport}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/58 to-black/34" aria-hidden />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(0,0,0,0.22),rgba(0,0,0,0.52))]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-3xl 2xl:max-w-4xl">
          <Reveal>
            <p className="text-sm font-medium text-white/92 [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
              Tienda de invierno
            </p>
            <h1
              id="winter-landing-heading"
              className="font-heading mt-4 text-3xl font-medium tracking-tight text-white [text-shadow:0_3px_18px_rgba(0,0,0,0.5)] sm:text-4xl 2xl:text-5xl"
            >
              {WINTER_STORE_COPY.heroTitle}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/96 [text-shadow:0_2px_12px_rgba(0,0,0,0.45)] 2xl:text-xl">
              {WINTER_STORE_COPY.heroSubtitle}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-10">
            <ul className="mx-auto flex max-w-xl flex-col gap-3 text-left text-base text-white sm:mx-auto sm:max-w-lg">
              {WINTER_STORE_COPY.bullets.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/35">
                    <Check className="size-3.5 text-white" aria-hidden />
                  </span>
                  <span className="leading-relaxed [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">{line}</span>
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
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "inline-flex h-12 w-full items-center justify-center rounded-full border border-white/30 bg-black/12 px-8 text-base font-semibold text-white hover:bg-white/16 hover:text-white sm:w-auto 2xl:h-14 2xl:px-10 2xl:text-lg",
              )}
            >
              {WINTER_STORE_COPY.ctaWhatsApp}
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
