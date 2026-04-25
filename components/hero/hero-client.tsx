"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { HERO_COPY, SECTION_IDS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const easeLux = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.18 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "tween" as const, duration: 0.68, ease: easeLux },
  },
};

export function HeroClient() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-4 pb-20 pt-24 sm:px-8 sm:pb-20 lg:px-14 2xl:px-20">
      <motion.div
        className="max-w-3xl 2xl:max-w-4xl [text-shadow:0_1px_4px_rgba(0,0,0,0.22)]"
        variants={container}
        initial={reduceMotion ? "show" : "hidden"}
        animate="show"
      >
        <motion.p
          variants={item}
          className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.32)]"
        >
          {SITE.name}
        </motion.p>
        <motion.h1
          variants={item}
          className="font-heading text-[2rem] font-medium leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl 2xl:text-7xl"
        >
          {HERO_COPY.headline}
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-xl 2xl:max-w-2xl 2xl:text-2xl"
        >
          {HERO_COPY.subline}
        </motion.p>
        <motion.div
          variants={item}
          className="mt-10 flex"
        >
          <a
            href={`#${SECTION_IDS.planner}`}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "h-12 w-full rounded-full border border-primary px-8 text-base font-semibold shadow-sm shadow-black/10 sm:w-auto 2xl:h-14 2xl:px-10 2xl:text-lg",
              "bg-primary text-primary-foreground hover:bg-primary",
            )}
          >
            Planear mi viaje
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href={`#${SECTION_IDS.testimonials}`}
        className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-white/90 hover:text-white sm:bottom-8"
        aria-label="Ir a testimonios"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.05,
          duration: 0.72,
          ease: easeLux,
        }}
      >
        <span className="text-xs font-medium uppercase tracking-widest">
          Mirá experiencias reales
        </span>
        <motion.span
          animate={reduceMotion ? false : { y: [0, 5, 0] }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: 2.75,
                  repeat: Infinity,
                  ease: [0.45, 0, 0.55, 1],
                }
          }
        >
          <ChevronDown className="size-6" aria-hidden />
        </motion.span>
      </motion.a>
    </div>
  );
}
