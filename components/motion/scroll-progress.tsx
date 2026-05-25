"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

import { useCoarseMobile } from "@/lib/use-coarse-mobile";

export function ScrollProgress() {
  const reducedMotion = useReducedMotion();
  const isCoarseMobile = useCoarseMobile();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.18,
  });

  if (reducedMotion || isCoarseMobile) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[1250] h-[2px] origin-left bg-primary/85"
      style={{ scaleX: progress }}
    />
  );
}
