"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useLayoutEffect, useState } from "react";

import { useCoarseMobile } from "@/lib/use-coarse-mobile";

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    mass: 0.12,
  });

  return (
    <motion.div
      aria-hidden
      className="motion-scroll-layer pointer-events-none fixed inset-x-0 top-0 z-[1250] h-[2px] origin-left bg-primary/85"
      style={{ scaleX: progress }}
    />
  );
}

export function ScrollProgress() {
  const reducedMotion = useReducedMotion();
  const isCoarseMobile = useCoarseMobile();
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || reducedMotion || isCoarseMobile) return null;

  return <ScrollProgressBar />;
}
