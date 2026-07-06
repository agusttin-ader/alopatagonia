"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { PLANNER_PATH, SITE } from "@/lib/constants";
import { MOBILE_MAGAZINE_G_ENABLED } from "@/lib/mobile-magazine-g";
import {
  isSiteIntroPending,
  shouldPlaySiteIntro,
  SITE_INTRO_REVEAL_FALLBACK_MS,
} from "@/lib/site-intro-config";
import { useCoarseMobile } from "@/lib/use-coarse-mobile";
import { cn } from "@/lib/utils";

const easeLux = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
  },
};

const mobileContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
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

const mobileItem = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "tween" as const, duration: 0.44, ease: easeLux },
  },
};

export function HeroClient() {
  const t = useTranslations("hero");
  const reduceMotion = useReducedMotion();
  const isCoarseMobile = useCoarseMobile();
  const [heroRevealed, setHeroRevealed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.__aloIntroReveal) {
      setHeroRevealed(true);
      return;
    }

    if (reduceMotion || !shouldPlaySiteIntro()) {
      setHeroRevealed(true);
      return;
    }

    if (!isSiteIntroPending()) {
      setHeroRevealed(true);
      return;
    }

    const onReveal = () => {
      window.scrollTo(0, 0);
      setHeroRevealed(true);
    };
    window.addEventListener("alo-site-intro-reveal", onReveal);

    const fallbackId = window.setTimeout(
      () => setHeroRevealed(true),
      SITE_INTRO_REVEAL_FALLBACK_MS,
    );

    return () => {
      window.removeEventListener("alo-site-intro-reveal", onReveal);
      window.clearTimeout(fallbackId);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!heroRevealed || typeof window === "undefined") return;
    window.scrollTo(0, 0);
  }, [heroRevealed]);

  const showHero = reduceMotion || heroRevealed;
  const heroContainer = isCoarseMobile ? mobileContainer : container;
  const heroItem = isCoarseMobile ? mobileItem : item;

  return (
    <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-4 pb-[max(7rem,calc(env(safe-area-inset-bottom)+6rem))] pt-24 max-md:min-h-[88dvh] max-md:pb-[5.25rem] sm:px-8 sm:pb-[max(8rem,calc(env(safe-area-inset-bottom)+6.2rem))] lg:px-14 lg:pb-[max(8.8rem,calc(env(safe-area-inset-bottom)+6.8rem))] 2xl:px-20">
      <motion.div
        className="max-w-3xl 2xl:max-w-4xl [text-shadow:0_1px_4px_rgba(0,0,0,0.22)]"
        variants={heroContainer}
        initial="hidden"
        animate={showHero ? "show" : "hidden"}
      >
        <motion.p
          variants={heroItem}
          className="mb-2 text-sm font-medium text-white/90 sm:mb-3 [text-shadow:0_1px_6px_rgba(0,0,0,0.32)]"
        >
          {SITE.name}
        </motion.p>
        <motion.h1
          variants={heroItem}
          className="font-heading max-w-[min(100%,20rem)] text-balance text-[2.2rem] font-medium leading-[1.06] tracking-tight text-white min-[390px]:text-[2.35rem] sm:max-w-none sm:text-5xl sm:leading-[1.08] lg:text-6xl lg:font-semibold lg:leading-[1.04] 2xl:max-w-[40rem] 2xl:text-7xl"
        >
          <span className="sm:hidden">{t("headlineMobile")}</span>
          <span className="hidden sm:inline">{t("headline")}</span>
        </motion.h1>
        <motion.p
          variants={heroItem}
          className="mt-3 max-w-[min(100%,20rem)] text-balance text-[1.0625rem] leading-snug text-white/90 min-[390px]:max-w-[19rem] min-[390px]:text-lg sm:mt-5 sm:max-w-xl sm:text-xl sm:leading-relaxed 2xl:max-w-2xl 2xl:text-2xl"
        >
          <span className="sm:hidden">{t("sublineMobile")}</span>
          <span className="hidden sm:inline">{t("subline")}</span>
        </motion.p>
        <motion.div
          variants={heroItem}
          className={cn("mt-7 flex sm:mt-10", MOBILE_MAGAZINE_G_ENABLED && "max-md:mt-6")}
        >
          <Link
            href={PLANNER_PATH}
            className={cn(
              buttonVariants({ variant: "marketing", size: "lg" }),
              "motion-cta h-12 px-8 text-base font-semibold sm:w-auto 2xl:h-14 2xl:px-10 2xl:text-lg",
              MOBILE_MAGAZINE_G_ENABLED
                ? "max-md:h-11 max-md:w-auto max-md:max-w-[15.5rem] max-md:px-6 max-md:text-sm"
                : "w-full",
            )}
          >
            {t("cta")}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
