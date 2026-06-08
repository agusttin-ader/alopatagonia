"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AppImage } from "@/components/media/AppImage";
import { useLayoutEffect, useState } from "react";

import { SITE } from "@/lib/constants";
import { IMAGE_SIZES } from "@/lib/image-config";
import {
  setSiteIntroExiting,
  setSiteIntroPending,
  setSiteIntroPlaceholderHidden,
  shouldPlaySiteIntro,
  SITE_INTRO_ALWAYS_SHOW,
  SITE_INTRO_FALLBACK_BG,
  SITE_INTRO_HIDE_AFTER_MS,
  SITE_INTRO_IMAGE,
  SITE_INTRO_LOGO,
  SITE_INTRO_OVERLAY_CSS,
  SITE_INTRO_STORAGE_KEY,
  SITE_INTRO_TIMELINE_MS,
} from "@/lib/site-intro-config";
import { cn } from "@/lib/utils";

const easeFlow = [0.22, 0.03, 0.26, 1] as const;
const easeWipe = [0.4, 0, 0.2, 1] as const;

const LOGO_WIDTH = 591;
const LOGO_HEIGHT = 586;

const WORDMARK_BASE =
  "font-heading font-medium leading-none tracking-[-0.02em] text-white [text-shadow:0_4px_32px_rgba(0,0,0,0.8),0_2px_8px_rgba(0,0,0,0.55)]";

const LOGO_SIZE_CLASS = "h-12 w-auto sm:h-14 md:h-16";

type IntroPhase = "letter" | "word" | "exit";

function scrollToHeroTop() {
  if (typeof window === "undefined") return;
  window.scrollTo(0, 0);
}

function markIntroReveal() {
  scrollToHeroTop();
  window.__aloIntroReveal = true;
  window.dispatchEvent(new CustomEvent("alo-site-intro-reveal"));
}

function setIntroExiting(exiting: boolean) {
  setSiteIntroExiting(exiting);
}

export function SiteIntro() {
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState<IntroPhase>("letter");

  useLayoutEffect(() => {
    const home = window.location.pathname === "/" || window.location.pathname === "";

    if (!home) {
      setSiteIntroPending(false);
      setIntroExiting(false);
      setSiteIntroPlaceholderHidden(true);
      setIsVisible(false);
      return;
    }

    if (reduceMotion) {
      setSiteIntroPending(false);
      setIntroExiting(false);
      setSiteIntroPlaceholderHidden(true);
      scrollToHeroTop();
      markIntroReveal();
      return;
    }

    if (!shouldPlaySiteIntro()) {
      setSiteIntroPending(false);
      setIntroExiting(false);
      setSiteIntroPlaceholderHidden(true);
      scrollToHeroTop();
      markIntroReveal();
      return;
    }

    scrollToHeroTop();
    setSiteIntroPending(true);
    setIntroExiting(false);
    setIsVisible(true);
    setPhase("letter");

    const wordAt = SITE_INTRO_TIMELINE_MS.letter;
    const exitAt = wordAt + SITE_INTRO_TIMELINE_MS.word;

    const wordTimeoutId = window.setTimeout(() => setPhase("word"), wordAt);
    const exitTimeoutId = window.setTimeout(() => {
      setPhase("exit");
      setIntroExiting(true);
      setSiteIntroPending(false);
      markIntroReveal();
      scrollToHeroTop();
    }, exitAt);

    const hideTimeoutId = window.setTimeout(() => {
      if (!SITE_INTRO_ALWAYS_SHOW) {
        window.sessionStorage.setItem(SITE_INTRO_STORAGE_KEY, "1");
      }
      setIsVisible(false);
      setIntroExiting(false);
      setSiteIntroPlaceholderHidden(true);
      scrollToHeroTop();
    }, SITE_INTRO_HIDE_AFTER_MS);

    return () => {
      window.clearTimeout(wordTimeoutId);
      window.clearTimeout(exitTimeoutId);
      window.clearTimeout(hideTimeoutId);
      setIntroExiting(false);
    };
  }, [reduceMotion]);

  const isLetter = phase === "letter";
  const isWord = phase === "word";

  if (!isVisible) return null;

  return (
    <motion.div
      id="site-intro-overlay"
      className="pointer-events-none fixed inset-0 z-[2200] overflow-hidden"
      style={{ backgroundColor: SITE_INTRO_FALLBACK_BG }}
      initial={{ y: 0 }}
      animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
      transition={{
        duration: SITE_INTRO_TIMELINE_MS.exit / 1000,
        ease: easeWipe,
      }}
      aria-hidden
    >
      <AppImage
        src={SITE_INTRO_IMAGE}
        alt=""
        fill
        priority
        fetchPriority="high"
        qualityPreset="intro"
        sizes={IMAGE_SIZES.viewport}
        className="object-cover"
        loadingPulse={false}
        onLoadingComplete={() => setSiteIntroPlaceholderHidden(true)}
      />
      <div
        className="absolute inset-0"
        style={{ background: SITE_INTRO_OVERLAY_CSS }}
        aria-hidden
      />

      <div className="absolute inset-0 z-[2] flex items-center justify-center px-6 py-10 sm:px-10">
        {/* Mobile: logo arriba + wordmark abajo (evita recorte horizontal) */}
        <div className="flex max-w-[min(100%,20rem)] flex-col items-center gap-4 text-center sm:hidden">
          <motion.div
            className="origin-center"
            initial={reduceMotion ? false : { opacity: 0, scale: 2.15 }}
            animate={{
              opacity: 1,
              scale: isLetter ? 2.55 : 1,
            }}
            transition={{
              opacity: { duration: 0.5, ease: easeFlow },
              scale: {
                duration: isWord ? 0.82 : 0.72,
                ease: easeFlow,
              },
            }}
          >
            <AppImage
              src={SITE_INTRO_LOGO}
              alt={SITE.name}
              width={LOGO_WIDTH}
              height={LOGO_HEIGHT}
              priority
              withBlur={false}
              loadingPulse={false}
              sizes={IMAGE_SIZES.logo}
              qualityPreset="intro"
              className={cn(LOGO_SIZE_CLASS, "drop-shadow-[0_8px_28px_rgba(0,0,0,0.55)]")}
            />
          </motion.div>

          <motion.span
            className={cn(
              WORDMARK_BASE,
              "max-w-[min(100%,18rem)] text-balance text-[clamp(1.65rem,8.5vw,2.35rem)] leading-[1.05]",
            )}
            initial={false}
            animate={{
              opacity: isWord ? 1 : 0,
              y: isWord ? 0 : 10,
            }}
            transition={{
              opacity: { duration: 0.55, ease: easeFlow },
              y: { duration: 0.55, ease: easeFlow },
            }}
            aria-hidden={!isWord}
          >
            {SITE.name}
          </motion.span>
        </div>

        {/* Desktop: logo + wordmark en fila */}
        <div
          className="hidden max-w-[min(100%,56rem)] items-center overflow-visible transition-[grid-template-columns] duration-[920ms] ease-[cubic-bezier(0.22,0.03,0.26,1)] sm:inline-grid"
          style={{
            gridTemplateColumns: isWord ? "auto 1fr" : "auto 0fr",
          }}
        >
          <motion.div
            className="origin-center justify-self-center"
            initial={reduceMotion ? false : { opacity: 0, scale: 3.15 }}
            animate={{
              opacity: 1,
              scale: isLetter ? 3.45 : 1,
            }}
            transition={{
              opacity: { duration: 0.65, ease: easeFlow },
              scale: {
                duration: isWord ? 0.96 : 0.82,
                ease: easeFlow,
              },
            }}
          >
            <AppImage
              src={SITE_INTRO_LOGO}
              alt={SITE.name}
              width={LOGO_WIDTH}
              height={LOGO_HEIGHT}
              priority
              withBlur={false}
              loadingPulse={false}
              sizes={IMAGE_SIZES.logo}
              qualityPreset="intro"
              className={cn(
                LOGO_SIZE_CLASS,
                "drop-shadow-[0_8px_28px_rgba(0,0,0,0.55)]",
              )}
            />
          </motion.div>

          <motion.span
            className={cn(
              "min-w-0 overflow-hidden whitespace-nowrap pl-3",
              WORDMARK_BASE,
              "text-[clamp(2rem,5.2vw,5rem)]",
            )}
            initial={false}
            animate={{
              opacity: isWord ? 1 : 0,
              x: isWord ? 0 : 20,
              clipPath: isWord
                ? "inset(-12% 0% -12% 0%)"
                : "inset(-12% 100% -12% 0%)",
            }}
            transition={{
              opacity: { duration: 0.72, ease: easeFlow },
              clipPath: { duration: 0.92, ease: easeFlow },
              x: { duration: 0.88, ease: easeFlow },
            }}
            style={{ pointerEvents: isWord ? "auto" : "none" }}
            aria-hidden={!isWord}
          >
            {SITE.name}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
