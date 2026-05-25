"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";

import { SITE } from "@/lib/constants";
import { IMAGE_QUALITY_INTRO, IMAGE_SIZES } from "@/lib/image-config";
import {
  setSiteIntroPending,
  setSiteIntroPlaceholderHidden,
  shouldPlaySiteIntro,
  SITE_INTRO_ALWAYS_SHOW,
  SITE_INTRO_HIDE_AFTER_MS,
  SITE_INTRO_IMAGE,
  SITE_INTRO_OVERLAY_CSS,
  SITE_INTRO_STORAGE_KEY,
  SITE_INTRO_TIMELINE_MS,
} from "@/lib/site-intro-config";
import { useCoarseMobile } from "@/lib/use-coarse-mobile";
import { cn } from "@/lib/utils";

const easeFlow = [0.22, 0.03, 0.26, 1] as const;
const easeWipe = [0.4, 0, 0.2, 1] as const;

const WORD_SUFFIX = SITE.name.slice(1);

const WORDMARK_BASE =
  "font-heading font-medium tracking-[-0.02em] text-white [text-shadow:0_4px_32px_rgba(0,0,0,0.8),0_2px_8px_rgba(0,0,0,0.55)]";

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
  if (typeof document === "undefined") return;
  document.body.classList.toggle("site-intro-exiting", exiting);
}

export function SiteIntro() {
  const reduceMotion = useReducedMotion();
  const isCoarseMobile = useCoarseMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [phase, setPhase] = useState<IntroPhase>("letter");

  useLayoutEffect(() => {
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
  const letterScale = 4.1;
  const wordRevealUsesClip = true;

  if (!isVisible) return null;

  const wipeDuration = SITE_INTRO_TIMELINE_MS.exit / 1000;

  return (
    <motion.div
      id="site-intro-overlay"
      className="pointer-events-none fixed inset-0 z-[2200] overflow-x-hidden overflow-y-hidden bg-[#0a0f0d]"
      style={{
        paddingTop: "env(safe-area-inset-top, 0px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      initial={{ y: 0 }}
      animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
      transition={{
        duration: wipeDuration,
        ease: easeWipe,
      }}
      aria-hidden
    >
      <Image
        src={SITE_INTRO_IMAGE}
        alt=""
        fill
        priority
        fetchPriority="high"
        quality={IMAGE_QUALITY_INTRO}
        sizes={IMAGE_SIZES.viewport}
        className="object-cover"
        onLoadingComplete={() => setSiteIntroPlaceholderHidden(true)}
      />
      <div
        className="absolute inset-0"
        style={{ background: SITE_INTRO_OVERLAY_CSS }}
      />

      {/* Mobile / coarse: centro, sin mega-scale ni texto recortado */}
      {isCoarseMobile ? (
        <div className="absolute inset-0 z-[1] flex items-center justify-center px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
          <div className="flex w-full max-w-[min(100%,22rem)] flex-col items-center justify-center text-center">
            <AnimatePresence initial={false} mode="wait">
              {isLetter ? (
                <motion.span
                  key="intro-m-letter"
                  className={`${WORDMARK_BASE} block text-[clamp(3.75rem,19vw,5.25rem)] leading-none`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                    transition: { duration: 0.38, ease: easeFlow },
                  }}
                  transition={{ duration: 0.58, ease: easeFlow }}
                >
                  {SITE.name.charAt(0)}
                </motion.span>
              ) : isWord ? (
                <motion.span
                  key="intro-m-word"
                  className={cn(
                    WORDMARK_BASE,
                    "block max-w-[min(100%,90vw)] text-balance text-[clamp(1.875rem,7.25vw,2.5rem)] leading-[1.12]",
                  )}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.32, ease: easeFlow } }}
                  transition={{
                    opacity: { duration: 0.52, ease: easeFlow },
                    y: { duration: 0.52, ease: easeFlow },
                  }}
                >
                  {SITE.name}
                </motion.span>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 z-[1] flex items-center justify-center px-6 py-10 sm:px-10">
          <div
            className={cn(
              "relative z-10 inline-grid max-w-[min(100%,52rem)] items-center overflow-visible py-[0.14em]",
              "transition-[grid-template-columns] duration-[880ms] ease-[cubic-bezier(0.22,0.03,0.26,1)]",
            )}
            style={{
              gridTemplateColumns: isWord ? "auto 1fr" : "auto 0fr",
            }}
          >
            <motion.span
              className={`inline-block origin-center justify-self-center ${WORDMARK_BASE} text-[clamp(3rem,11vw,6.5rem)] leading-[1.15]`}
              initial={reduceMotion ? false : { opacity: 0, scale: 3.4 }}
              animate={{
                opacity: 1,
                scale: isLetter ? letterScale : 1,
              }}
              transition={{
                opacity: { duration: 0.65, ease: easeFlow },
                scale: {
                  duration: isWord ? 0.95 : 0.8,
                  ease: easeFlow,
                },
              }}
            >
              {SITE.name.charAt(0)}
            </motion.span>
            <motion.span
              className={`min-w-0 overflow-visible whitespace-nowrap ${WORDMARK_BASE} text-[clamp(3rem,11vw,6.5rem)] leading-[1.15]`}
              initial={false}
              animate={{
                opacity: isWord ? 1 : 0,
                x: isWord ? 0 : wordRevealUsesClip ? 14 : 8,
                clipPath: wordRevealUsesClip
                  ? isWord
                    ? "inset(-12% 0% -12% 0%)"
                    : "inset(-12% 100% -12% 0%)"
                  : undefined,
              }}
              transition={{
                opacity: { duration: 0.75, ease: easeFlow },
                clipPath: { duration: 0.88, ease: easeFlow },
                x: { duration: 0.82, ease: easeFlow },
              }}
              style={{ pointerEvents: isWord ? "auto" : "none" }}
              aria-hidden={!isWord}
            >
              {WORD_SUFFIX}
            </motion.span>
          </div>
        </div>
      )}
    </motion.div>
  );
}
