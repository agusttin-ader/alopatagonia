"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { HERO_COPY, SECTION_IDS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

type HeroClientProps = {
  whatsappUrl: string;
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HeroClient({ whatsappUrl }: HeroClientProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-6 pb-16 pt-28 sm:px-10 lg:px-16 lg:pb-20">
      <motion.div
        className="max-w-3xl [text-shadow:0_1px_4px_rgba(0,0,0,0.22)]"
        variants={container}
        initial={reduceMotion ? "show" : "hidden"}
        animate="show"
      >
        <motion.p
          variants={item}
          className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/85"
        >
          {SITE.name}
        </motion.p>
        <motion.h1
          variants={item}
          className="font-heading text-4xl font-medium leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {HERO_COPY.headline}
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-5 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl"
        >
          {HERO_COPY.subline}
        </motion.p>
        <motion.div
          variants={item}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "h-12 rounded-full px-8 text-base shadow-lg shadow-black/25",
              "bg-primary text-primary-foreground hover:bg-primary/90",
            )}
          >
            Consultar por WhatsApp
          </a>
          <a
            href={`#${SECTION_IDS.destinations}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-12 rounded-full border-white/40 bg-white/10 px-8 text-base text-white backdrop-blur-sm",
              "hover:bg-white/20 hover:text-white",
            )}
          >
            Ver destinos
          </a>
        </motion.div>
      </motion.div>

      <motion.a
        href={`#${SECTION_IDS.destinations}`}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-white/90 hover:text-white"
        aria-label="Ir a destinos"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <span className="text-xs font-medium uppercase tracking-widest">
          Descubrí destinos
        </span>
        <motion.span
          animate={reduceMotion ? false : { y: [0, 6, 0] }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <ChevronDown className="size-6" aria-hidden />
        </motion.span>
      </motion.a>
    </div>
  );
}
