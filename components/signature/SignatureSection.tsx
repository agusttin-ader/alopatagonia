"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import {
  IMAGE_QUALITY_MAX,
  SECTION_IDS,
  EXPERIENCE_IMAGE,
} from "@/lib/constants";
import { cn, interactiveCardHover } from "@/lib/utils";

const EXPERIENCE_CHIPS = [
  "Dia 1-3 Patagonia",
  "Auto listo al llegar",
  "Excursion segun clima",
  "WhatsApp activo todo el viaje",
] as const;

export function SignatureSection() {
  return (
    <section
      id={SECTION_IDS.signature}
      className="scroll-mt-6 bg-background px-4 py-18 sm:px-8 lg:px-14 2xl:px-20"
      aria-labelledby="signature-heading"
    >
      <div className="mx-auto grid max-w-7xl 2xl:max-w-[90rem] gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-center 2xl:gap-12">
        <Reveal
          className={cn(
            "relative isolate overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/8",
            interactiveCardHover,
          )}
        >
          <Image
            src={EXPERIENCE_IMAGE.src}
            alt="Ruta de lago y montana en Patagonia"
            width={EXPERIENCE_IMAGE.width}
            height={EXPERIENCE_IMAGE.height}
            quality={IMAGE_QUALITY_MAX}
            className="aspect-[16/11] size-full object-cover"
            sizes="(min-width: 1024px) 52vw, 100vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <motion.div
            className="pointer-events-none absolute bottom-5 left-5 h-1 rounded-full bg-white/90"
            initial={{ width: "20%" }}
            whileInView={{ width: "62%" }}
            viewport={{ once: true }}
            transition={{
              type: "tween",
              duration: 1.28,
              ease: [0.16, 1, 0.3, 1],
            }}
            aria-hidden
          />
          <div className="absolute bottom-8 left-5 right-5 text-white">
            <p className="text-sm font-semibold tracking-wide text-white/90">
              Patagonia a tu medida, en una sola conversacion
            </p>
            <p className="mt-2 max-w-md text-base leading-relaxed text-white/95">
              No vendemos servicios sueltos. Diseniamos tu viaje completo de punta
              a punta.
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Esencia Alo Patagonia
            </p>
            <h2
              id="signature-heading"
              className="font-heading mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl 2xl:text-5xl"
            >
              No es solo destino. Es como lo vivis.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground 2xl:text-xl">
              Desde el primer WhatsApp, organizamos auto, alojamiento y
              experiencias para que disfrutes con todo resuelto.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-7 flex flex-wrap gap-2.5">
            {EXPERIENCE_CHIPS.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-border/80 bg-card px-3.5 py-2 text-sm font-semibold text-foreground"
              >
                {chip}
              </span>
            ))}
          </Reveal>

          <Reveal delay={0.12}>
            <a
              href={`#${SECTION_IDS.planner}`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "mt-8 inline-flex h-12 rounded-full px-8 text-base font-semibold shadow-md 2xl:h-14 2xl:px-10 2xl:text-lg",
              )}
            >
              Quiero mi propuesta por WhatsApp
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
