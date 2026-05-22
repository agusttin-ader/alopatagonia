"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";

import { SITE } from "@/lib/constants";
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
import { cn } from "@/lib/utils";

const easeFlow = [0.22, 0.03, 0.26, 1] as const;
const easeWipe = [0.4, 0, 0.2, 1] as const;

const WORD_SUFFIX = SITE.name.slice(1);

const WORDMARK_BASE =
  "font-heading font-medium leading-[1.22] tracking-[-0.02em] text-white [text-shadow:0_4px_32px_rgba(0,0,0,0.8),0_2px_8px_rgba(0,0,0,0.55)]";

const INTRO_OVERLAY_CLASS = "absolute inset-0";

type IntroPhase = "letter" | "word" | "exit";

function markIntroReveal() {
  window.__aloIntroReveal = true;
  window.dispatchEvent(new CustomEvent("alo-site-intro-reveal"));
}

export function SiteIntro() {
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [imageReady, setImageReady] = useState(false);
  const [phase, setPhase] = useState<IntroPhase>("letter");

  useLayoutEffect(() => {
    if (reduceMotion) {
      setSiteIntroPending(false);
      markIntroReveal();
      return;
    }

    if (!shouldPlaySiteIntro()) {
      setSiteIntroPending(false);
      markIntroReveal();
      return;
    }

    setSiteIntroPending(true);
    setIsVisible(true);
    setPhase("letter");

    const wordAt = SITE_INTRO_TIMELINE_MS.letter;
    const exitAt = wordAt + SITE_INTRO_TIMELINE_MS.word;

    const wordTimeoutId = window.setTimeout(() => setPhase("word"), wordAt);
    const exitTimeoutId = window.setTimeout(() => {
      setPhase("exit");
      setSiteIntroPending(false);
      markIntroReveal();
    }, exitAt);

    const hideTimeoutId = window.setTimeout(() => {
      if (!SITE_INTRO_ALWAYS_SHOW) {
        window.sessionStorage.setItem(SITE_INTRO_STORAGE_KEY, "1");
      }
      setIsVisible(false);
      setSiteIntroPlaceholderHidden(true);
    }, SITE_INTRO_HIDE_AFTER_MS);

    return () => {
      window.clearTimeout(wordTimeoutId);
      window.clearTimeout(exitTimeoutId);
      window.clearTimeout(hideTimeoutId);
    };
  }, [reduceMotion]);

  const isLetter = phase === "letter";
  const isWord = phase === "word";

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[2200] overflow-hidden bg-[#0a0f0d]"
      initial={{ y: 0 }}
      animate={phase === "exit" ? { y: "-100%" } : { y: 0 }}
      transition={{
        duration: SITE_INTRO_TIMELINE_MS.exit / 1000,
        ease: easeWipe,
      }}
      aria-hidden
    >
      <Image
        src={SITE_INTRO_IMAGE}
        alt=""
        fill
        priority
        sizes="100vw"
        className={cn(
          "object-cover transition-opacity duration-200",
          imageReady ? "opacity-100" : "opacity-0",
        )}
        onLoadingComplete={() => {
          setImageReady(true);
          setSiteIntroPlaceholderHidden(true);
        }}
      />
      <div
        className={INTRO_OVERLAY_CLASS}
        style={{ background: SITE_INTRO_OVERLAY_CSS }}
      />

      <div className="absolute inset-0 flex items-center justify-center px-6 py-10 sm:px-10">
        <div
          className="relative z-10 inline-grid max-w-[min(100%,52rem)] items-center overflow-visible py-[0.14em] transition-[grid-template-columns] duration-[880ms] ease-[cubic-bezier(0.22,0.03,0.26,1)]"
          style={{
            gridTemplateColumns: isWord ? "auto 1fr" : "auto 0fr",
          }}
        >
          <motion.span
            className={`inline-block origin-center justify-self-center ${WORDMARK_BASE} text-[clamp(3rem,11vw,6.5rem)]`}
            initial={reduceMotion ? false : { opacity: 0, scale: 3.4 }}
            animate={{
              opacity: 1,
              scale: isLetter ? 4.1 : 1,
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
            className={`min-w-0 overflow-visible whitespace-nowrap ${WORDMARK_BASE} text-[clamp(3rem,11vw,6.5rem)]`}
            initial={false}
            animate={{
              opacity: isWord ? 1 : 0,
              x: isWord ? 0 : 14,
              clipPath: isWord
                ? "inset(-12% 0% -12% 0%)"
                : "inset(-12% 100% -12% 0%)",
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
    </motion.div>
  );
}
