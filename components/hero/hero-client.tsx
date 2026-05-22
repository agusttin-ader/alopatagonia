"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { HERO_COPY, SECTION_IDS, SITE } from "@/lib/constants";
import {
  shouldPlaySiteIntro,
  SITE_INTRO_HIDE_AFTER_MS,
} from "@/lib/site-intro-config";
import { cn } from "@/lib/utils";

const easeLux = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "tween" as const, duration: 0.78, ease: easeLux },
  },
};

export function HeroClient() {
  const reduceMotion = useReducedMotion();
  const [heroRevealed, setHeroRevealed] = useState(() =>
    typeof window !== "undefined" ? Boolean(window.__aloIntroReveal) : false,
  );

  useEffect(() => {
    if (reduceMotion || !shouldPlaySiteIntro() || window.__aloIntroReveal) {
      setHeroRevealed(true);
      return;
    }

    if (!document.body.classList.contains("site-intro-pending")) {
      setHeroRevealed(true);
      return;
    }

    const onReveal = () => setHeroRevealed(true);
    window.addEventListener("alo-site-intro-reveal", onReveal);

    const fallbackId = window.setTimeout(
      () => setHeroRevealed(true),
      SITE_INTRO_HIDE_AFTER_MS + 80,
    );

    return () => {
      window.removeEventListener("alo-site-intro-reveal", onReveal);
      window.clearTimeout(fallbackId);
    };
  }, [reduceMotion]);

  const showHero = reduceMotion || heroRevealed;

  return (
    <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-4 pb-[max(7rem,calc(env(safe-area-inset-bottom)+6rem))] pt-24 sm:px-8 sm:pb-[max(8rem,calc(env(safe-area-inset-bottom)+6.2rem))] lg:px-14 lg:pb-[max(8.8rem,calc(env(safe-area-inset-bottom)+6.8rem))] 2xl:px-20">
      <motion.div
        className="max-w-3xl 2xl:max-w-4xl [text-shadow:0_1px_4px_rgba(0,0,0,0.22)]"
        variants={container}
        initial="hidden"
        animate={showHero ? "show" : "hidden"}
      >
        <motion.p
          variants={item}
          className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white sm:mb-3 sm:text-xs sm:tracking-[0.22em] [text-shadow:0_1px_6px_rgba(0,0,0,0.32)]"
        >
          {SITE.name}
        </motion.p>
        <motion.h1
          variants={item}
          className="font-heading max-w-[11.5rem] text-[2.2rem] font-medium leading-[1.06] tracking-tight text-white min-[390px]:max-w-none min-[390px]:text-[2.35rem] sm:max-w-none sm:text-5xl sm:leading-[1.08] lg:text-6xl 2xl:text-7xl"
        >
          <span className="sm:hidden">{HERO_COPY.headlineMobile}</span>
          <span className="hidden sm:inline">{HERO_COPY.headline}</span>
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-3 max-w-[17rem] text-[1.0625rem] leading-snug text-white/90 min-[390px]:max-w-[19rem] min-[390px]:text-lg sm:mt-5 sm:max-w-xl sm:text-xl sm:leading-relaxed 2xl:max-w-2xl 2xl:text-2xl"
        >
          <span className="sm:hidden">{HERO_COPY.sublineMobile}</span>
          <span className="hidden sm:inline">{HERO_COPY.subline}</span>
        </motion.p>
        <motion.div variants={item} className="mt-7 flex sm:mt-10">
          <motion.a
            href={`#${SECTION_IDS.planner}`}
            className={cn(
              buttonVariants({ variant: "marketing", size: "lg" }),
              "motion-cta h-12 w-full border border-primary px-8 text-base font-semibold sm:w-auto 2xl:h-14 2xl:px-10 2xl:text-lg",
              "bg-primary text-primary-foreground hover:bg-primary",
            )}
            whileHover={reduceMotion ? undefined : { y: -1.5, scale: 1.015 }}
            whileTap={reduceMotion ? undefined : { y: 0, scale: 0.99 }}
            transition={
              reduceMotion
                ? undefined
                : { type: "tween", duration: 0.22, ease: [0.22, 1, 0.36, 1] }
            }
          >
            Planear mi viaje
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.a
        href={`#${SECTION_IDS.testimonials}`}
        className="motion-cta absolute bottom-[max(2.4rem,calc(env(safe-area-inset-bottom)+1.8rem))] left-1/2 hidden min-h-11 -translate-x-1/2 flex-col items-center justify-center gap-1 text-white/90 hover:text-white min-[430px]:flex sm:bottom-[max(4rem,calc(env(safe-area-inset-bottom)+3rem))] lg:bottom-[max(4.8rem,calc(env(safe-area-inset-bottom)+3.4rem))]"
        aria-label="Ir a testimonios"
        initial={false}
        animate={showHero ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{
          delay: reduceMotion ? 0 : 0.38,
          duration: reduceMotion ? 0 : 0.72,
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
