"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useLayoutEffect, useState } from "react";

import { SITE } from "@/lib/constants";
import {
  setSiteIntroPending,
  setSiteIntroPlaceholderVisible,
  shouldPlaySiteIntro,
  SITE_INTRO_ALWAYS_SHOW,
  SITE_INTRO_HIDE_AFTER_MS,
  SITE_INTRO_IMAGE,
  SITE_INTRO_STORAGE_KEY,
  SITE_INTRO_TIMELINE_MS,
} from "@/lib/site-intro-config";

const easeFlow = [0.22, 0.03, 0.26, 1] as const;
const easeWipe = [0.4, 0, 0.2, 1] as const;

const WORD_SUFFIX = SITE.name.slice(1);
const WORDMARK_CLASS =
  "font-heading text-[clamp(3.25rem,12vw,7rem)] font-medium leading-[1.12] tracking-[-0.025em] text-white [text-shadow:0_4px_28px_rgba(0,0,0,0.72),0_1px_3px_rgba(0,0,0,0.55)]";

type IntroPhase = "letter" | "word" | "hold" | "exit";

function markIntroReveal() {
  window.__aloIntroReveal = true;
  window.dispatchEvent(new CustomEvent("alo-site-intro-reveal"));
}

export function SiteIntro() {
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
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
    setSiteIntroPlaceholderVisible(false);
    setPhase("letter");

    const wordTimeoutId = window.setTimeout(() => {
      setPhase("word");
    }, SITE_INTRO_TIMELINE_MS.letter);

    const holdTimeoutId = window.setTimeout(() => {
      setPhase("hold");
    }, SITE_INTRO_TIMELINE_MS.letter + SITE_INTRO_TIMELINE_MS.word);

    const exitTimeoutId = window.setTimeout(() => {
      setPhase("exit");
      setSiteIntroPlaceholderVisible(false);
      setSiteIntroPending(false);
      markIntroReveal();
    }, SITE_INTRO_TIMELINE_MS.letter + SITE_INTRO_TIMELINE_MS.word + SITE_INTRO_TIMELINE_MS.hold);

    const hideTimeoutId = window.setTimeout(() => {
      if (!SITE_INTRO_ALWAYS_SHOW) {
        window.sessionStorage.setItem(SITE_INTRO_STORAGE_KEY, "1");
      }
      setIsVisible(false);
      setSiteIntroPlaceholderVisible(false);
      window.dispatchEvent(new CustomEvent("alo-site-intro-complete"));
    }, SITE_INTRO_HIDE_AFTER_MS);

    return () => {
      window.clearTimeout(wordTimeoutId);
      window.clearTimeout(holdTimeoutId);
      window.clearTimeout(exitTimeoutId);
      window.clearTimeout(hideTimeoutId);
    };
  }, [reduceMotion]);

  const isWord = phase !== "letter";
  const showText = phase === "letter" || phase === "word" || phase === "hold";

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="fixed inset-0 z-[2200] overflow-hidden will-change-transform"
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
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/62 via-black/48 to-black/66" />
          <div className="absolute inset-0 bg-black/18" />

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: showText ? 1 : 0 }}
            transition={{ duration: 0.45, ease: easeFlow }}
          >
            <div className="relative z-10 overflow-visible px-4 py-12 sm:px-8 sm:py-14">
              <motion.div className="flex items-end justify-center overflow-visible">
                <motion.span
                  className={`inline-block origin-center ${WORDMARK_CLASS}`}
                  initial={false}
                  animate={{
                    scale: isWord ? 1 : 3.6,
                    x: 0,
                  }}
                  transition={{ duration: 1.05, ease: easeFlow }}
                >
                  {SITE.name.charAt(0)}
                </motion.span>
                <motion.span
                  className={`inline-block overflow-visible ${WORDMARK_CLASS}`}
                  initial={false}
                  animate={{
                    opacity: isWord ? 1 : 0,
                    x: isWord ? 0 : 18,
                    filter: isWord ? "blur(0px)" : "blur(4px)",
                  }}
                  transition={{ duration: 0.98, ease: easeFlow }}
                  style={{ pointerEvents: isWord ? "auto" : "none" }}
                >
                  {WORD_SUFFIX}
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
