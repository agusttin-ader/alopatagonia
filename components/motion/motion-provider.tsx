"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

const DEFAULT_TRANSITION = {
  duration: 0.42,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export function MotionProvider({ children }: PropsWithChildren) {
  const reducedMotion = useReducedMotion();

  return (
    <MotionConfig
      reducedMotion="user"
      transition={reducedMotion ? { duration: 0 } : DEFAULT_TRANSITION}
    >
      {children}
    </MotionConfig>
  );
}
