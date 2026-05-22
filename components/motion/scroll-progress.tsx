"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.18,
  });

  if (reducedMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[1250] h-[3px] origin-left bg-[linear-gradient(90deg,var(--color-primary)_0%,var(--color-footer-lake)_100%)] shadow-[0_1px_8px_rgba(45,90,71,0.35)]"
      style={{ scaleX: progress }}
    />
  );
}
