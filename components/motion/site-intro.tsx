"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AppImage } from "@/components/media/AppImage";
import { useLayoutEffect, useRef, useState } from "react";

import { SITE } from "@/lib/constants";
import { IMAGE_SIZES } from "@/lib/image-config";
import {
  isSiteHomePath,
  isSiteIntroMobileViewport,
  setSiteIntroExiting,
  setSiteIntroPending,
  setSiteIntroPlaceholderHidden,
  shouldPlaySiteIntro,
  SITE_INTRO_ALWAYS_SHOW,
  SITE_INTRO_FALLBACK_BG,
  SITE_INTRO_HIDE_AFTER_MS,
  SITE_INTRO_IMAGE,
  SITE_INTRO_LOGO,
  SITE_INTRO_MOBILE_MS,
  SITE_INTRO_OVERLAY_CSS,
  SITE_INTRO_STORAGE_KEY,
  SITE_INTRO_TIMELINE_MS,
} from "@/lib/site-intro-config";
import { cn } from "@/lib/utils";

const easeFlow = [0.22, 0.03, 0.26, 1] as const;
const easeWipe = [0.4, 0, 0.2, 1] as const;
const easeFade = [0.22, 1, 0.36, 1] as const;

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

function finishIntro(persistSeen: boolean) {
  if (persistSeen && !SITE_INTRO_ALWAYS_SHOW) {
    window.sessionStorage.setItem(SITE_INTRO_STORAGE_KEY, "1");
  }
  setIntroExiting(false);
  setSiteIntroPlaceholderHidden(true);
  scrollToHeroTop();
}

function waitForDocumentReady(): Promise<void> {
  if (document.readyState === "complete" || document.readyState === "interactive") {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    document.addEventListener("DOMContentLoaded", () => resolve(), { once: true });
  });
}

export function SiteIntro() {
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("site-intro-pending");
  });
  const [phase, setPhase] = useState<IntroPhase>("letter");
  const [isMobileIntro, setIsMobileIntro] = useState(false);
  const imageReadyRef = useRef(false);
  const imageReadyResolvers = useRef<Array<() => void>>([]);
  const exitStartedRef = useRef(false);

  const signalImageReady = () => {
    if (imageReadyRef.current) return;
    imageReadyRef.current = true;
    imageReadyResolvers.current.splice(0).forEach((resolve) => resolve());
  };

  const waitForImageReady = () =>
    new Promise<void>((resolve) => {
      if (imageReadyRef.current) {
        resolve();
        return;
      }
      imageReadyResolvers.current.push(resolve);
    });

  useLayoutEffect(() => {
    const home = isSiteHomePath(window.location.pathname);

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

    const mobile = isSiteIntroMobileViewport();
    setIsMobileIntro(mobile);
    exitStartedRef.current = false;
    imageReadyRef.current = false;
    imageReadyResolvers.current = [];

    scrollToHeroTop();
    setSiteIntroPending(true);
    setIntroExiting(false);
    setIsVisible(true);
    setPhase("letter");

    const placeholderImg = document.querySelector(
      ".site-intro-placeholder-bg",
    ) as HTMLImageElement | null;
    if (placeholderImg?.complete && placeholderImg.naturalWidth > 0) {
      signalImageReady();
    }

    const timeouts: number[] = [];
    let cancelled = false;

    const beginExit = () => {
      if (exitStartedRef.current || cancelled) return;
      exitStartedRef.current = true;
      setPhase("exit");
      setIntroExiting(true);
      setSiteIntroPending(false);
      markIntroReveal();
      scrollToHeroTop();
    };

    const hideCompletely = () => {
      if (cancelled) return;
      finishIntro(true);
      setIsVisible(false);
    };

    if (mobile) {
      const { maxTotal, exit } = SITE_INTRO_MOBILE_MS;
      const hardCapMs = Math.max(0, maxTotal - exit);

      const runMobileExit = () => {
        beginExit();
        timeouts.push(window.setTimeout(hideCompletely, exit));
      };

      // Sale apenas página + fuentes + imagen están listos; sin espera artificial.
      // Tope duro: nunca supera maxTotal (hold + fade).
      void Promise.race([
        Promise.all([
          waitForDocumentReady(),
          document.fonts?.ready ?? Promise.resolve(),
          waitForImageReady(),
        ]),
        new Promise<void>((resolve) => {
          timeouts.push(window.setTimeout(resolve, hardCapMs));
        }),
      ]).then(() => {
        if (!cancelled) runMobileExit();
      });
    } else {
      const wordAt = SITE_INTRO_TIMELINE_MS.letter;
      const exitAt = wordAt + SITE_INTRO_TIMELINE_MS.word;

      timeouts.push(window.setTimeout(() => setPhase("word"), wordAt));
      timeouts.push(
        window.setTimeout(() => {
          beginExit();
        }, exitAt),
      );
      timeouts.push(
        window.setTimeout(() => {
          hideCompletely();
        }, SITE_INTRO_HIDE_AFTER_MS),
      );
    }

    return () => {
      cancelled = true;
      timeouts.forEach((id) => window.clearTimeout(id));
      setIntroExiting(false);
    };
  }, [reduceMotion]);

  const isLetter = phase === "letter";
  const isWord = phase === "word";
  const exitDurationSec = isMobileIntro
    ? SITE_INTRO_MOBILE_MS.exit / 1000
    : SITE_INTRO_TIMELINE_MS.exit / 1000;

  if (!isVisible) return null;

  return (
    <motion.div
      id="site-intro-overlay"
      className="pointer-events-none fixed inset-0 z-[2200] overflow-hidden"
      style={{ backgroundColor: SITE_INTRO_FALLBACK_BG }}
      initial={isMobileIntro ? { opacity: 1 } : { y: 0 }}
      animate={
        phase === "exit"
          ? isMobileIntro
            ? { opacity: 0 }
            : { y: "-100%" }
          : isMobileIntro
            ? { opacity: 1 }
            : { y: 0 }
      }
      transition={{
        duration: exitDurationSec,
        ease: isMobileIntro ? easeFade : easeWipe,
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
        withBlur={false}
        unoptimized
        onLoad={signalImageReady}
      />
      <div
        className="absolute inset-0"
        style={{ background: SITE_INTRO_OVERLAY_CSS }}
        aria-hidden
      />

      <div className="absolute inset-0 z-[2] flex items-center justify-center px-6 py-10 sm:px-10">
        {/* Mobile: logo centrado (wordmark solo en timeline desktop) */}
        <div className="flex max-w-[min(100%,20rem)] flex-col items-center gap-4 text-center sm:hidden">
          <motion.div
            className="origin-center"
            initial={false}
            animate={{
              opacity: 1,
              scale: isMobileIntro ? 1 : isLetter ? 2.45 : 1,
            }}
            transition={{
              opacity: { duration: isMobileIntro ? 0.22 : 0.45, ease: easeFlow },
              scale: {
                duration: isMobileIntro ? 0.35 : isWord ? 0.78 : 0.68,
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

          {!isMobileIntro ? (
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
          ) : null}
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
            initial={false}
            animate={{
              opacity: 1,
              scale: isLetter ? 3.35 : 1,
            }}
            transition={{
              opacity: { duration: 0.55, ease: easeFlow },
              scale: {
                duration: isWord ? 0.88 : 0.75,
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
