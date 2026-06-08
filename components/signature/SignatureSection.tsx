"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AppImage } from "@/components/media/AppImage";

import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { ScrollParallax } from "@/components/motion/scroll-parallax";
import { buttonVariants } from "@/components/ui/button";
import {
  IMAGE_QUALITY,
  IMAGE_SIZES,
  PLANNER_PATH,
  SECTION_IDS,
  EXPERIENCE_IMAGE,
} from "@/lib/constants";
import { MOBILE_MAGAZINE_G_ENABLED } from "@/lib/mobile-magazine-g";
import { useCoarseMobile } from "@/lib/use-coarse-mobile";
import { cn } from "@/lib/utils";

const SIGNATURE_POINTS = [
  "Auto listo al llegar",
  "Hotel según tu ruta",
  "Excursiones según clima",
  "WhatsApp activo todo el viaje",
] as const;

export function SignatureSection() {
  const reduceMotion = useReducedMotion();
  const isCoarseMobile = useCoarseMobile();
  const animateProgress = !reduceMotion && !isCoarseMobile;

  return (
    <section
      id={SECTION_IDS.signature}
      className={cn(
        "scroll-mt-24 bg-background px-4 py-12 sm:px-8 lg:px-14 2xl:px-20",
        MOBILE_MAGAZINE_G_ENABLED && "max-md:pt-12 max-md:pb-14",
      )}
      aria-labelledby="signature-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-6 max-md:grid-cols-1 lg:grid-cols-[1.15fr_1fr] lg:items-center 2xl:max-w-[90rem] 2xl:gap-12">
        <Reveal
          className={cn(
            "relative isolate overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/8",
            MOBILE_MAGAZINE_G_ENABLED && "max-md:order-2 max-md:mt-3 max-md:rounded-[1.75rem]",
          )}
        >
          <ScrollParallax strength={42} className="relative w-full">
            <div className="relative aspect-[16/11] w-full">
              <AppImage
                src={EXPERIENCE_IMAGE.src}
                alt="Ruta de lago y montana en Patagonia"
                fill
                quality={IMAGE_QUALITY}
                className="object-cover"
                sizes={IMAGE_SIZES.signature}
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            </div>
          </ScrollParallax>
          <motion.div
            className="pointer-events-none absolute bottom-5 left-5 z-10 h-1 w-[62%] origin-left rounded-full bg-white/90"
            initial={{ scaleX: animateProgress ? 0.32 : 1 }}
            whileInView={animateProgress ? { scaleX: 1 } : undefined}
            viewport={{ once: true }}
            transition={{
              type: "tween",
              duration: animateProgress ? 0.72 : 0,
              ease: [0.16, 1, 0.3, 1],
            }}
            aria-hidden
          />
          <div className="absolute bottom-8 left-5 right-5 text-white">
            <p className="text-sm font-medium leading-relaxed text-white/95">
              Patagonia Argentina · un equipo · tu viaje armado de punta a punta
            </p>
          </div>
        </Reveal>

        <div className={cn(MOBILE_MAGAZINE_G_ENABLED && "max-md:order-1")}>
          <Reveal>
            <h2
              id="signature-heading"
              className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl 2xl:text-5xl"
            >
              Un WhatsApp. Auto, alojamiento y salidas.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground 2xl:text-xl">
              No vendemos servicios sueltos. Coordinamos fechas, traslados y
              reservas para que viajes con todo resuelto.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-6 space-y-2.5 border-l border-primary/25 pl-4">
            {SIGNATURE_POINTS.map((point) => (
              <p key={point} className="text-[0.95rem] leading-relaxed text-foreground/88 2xl:text-base">
                {point}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.12}>
            <Link
              href={PLANNER_PATH}
              className={cn(
                buttonVariants({ variant: "marketing", size: "lg" }),
                "mt-7 inline-flex h-12 w-full px-8 text-base font-semibold sm:w-auto 2xl:h-14 2xl:px-10 2xl:text-lg",
                MOBILE_MAGAZINE_G_ENABLED &&
                  "max-md:h-11 max-md:w-auto max-md:max-w-[15.5rem] max-md:px-6 max-md:text-sm",
              )}
            >
              Armar mi consulta
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
