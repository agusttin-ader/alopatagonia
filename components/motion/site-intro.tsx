"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { SITE } from "@/lib/constants";

const INTRO_STORAGE_KEY = "alo-site-intro-seen-v1";
const INTRO_HIDE_AFTER_MS = 1150;

export function SiteIntro() {
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return;

    const hasSeenIntro = window.sessionStorage.getItem(INTRO_STORAGE_KEY) === "1";
    if (hasSeenIntro) return;

    const showTimeoutId = window.setTimeout(() => {
      setIsVisible(true);
    }, 24);
    const hideTimeoutId = window.setTimeout(() => {
      window.sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
      setIsVisible(false);
    }, INTRO_HIDE_AFTER_MS + 24);

    return () => {
      window.clearTimeout(showTimeoutId);
      window.clearTimeout(hideTimeoutId);
    };
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-[radial-gradient(circle_at_25%_20%,rgba(111,142,136,0.2),transparent_48%),linear-gradient(165deg,#1c2205_0%,#222601_45%,#2d5a47_100%)] px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <motion.div
            className="flex max-w-xl flex-col items-center text-center text-white"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.54, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-white/75">
              Patagonia Travel Studio
            </span>
            <h1 className="font-heading mt-4 text-4xl font-semibold tracking-[0.02em] text-white sm:text-5xl">
              {SITE.name}
            </h1>
            <motion.span
              className="mt-5 block h-px w-44 origin-left bg-white/70"
              initial={{ scaleX: 0, opacity: 0.5 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            />
            <p className="mt-5 max-w-md text-sm font-medium text-white/85 sm:text-base">
              Experiencias curadas para viajar Patagonia con todo resuelto.
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
