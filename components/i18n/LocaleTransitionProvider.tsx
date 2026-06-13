"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type PropsWithChildren } from "react";

import { shouldFadeInAfterLocaleSwitch } from "@/lib/i18n/locale-switch";

const FADE_MS = 280;
const MOTION_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Fade-in al cargar tras un cambio de idioma con navegación completa. */
export function LocaleTransitionProvider({ children }: PropsWithChildren) {
  const reduceMotion = useReducedMotion();
  const [opacity, setOpacity] = useState(() => {
    if (typeof window === "undefined") return 1;
    return shouldFadeInAfterLocaleSwitch() ? 0 : 1;
  });

  useEffect(() => {
    if (reduceMotion || opacity === 1) return;

    const frame = requestAnimationFrame(() => setOpacity(1));
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, opacity]);

  return (
    <motion.div
      className="flex min-h-0 flex-1 flex-col"
      initial={false}
      animate={{ opacity }}
      transition={{ duration: reduceMotion ? 0 : FADE_MS / 1000, ease: MOTION_EASE }}
    >
      {children}
    </motion.div>
  );
}
