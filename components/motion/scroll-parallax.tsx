"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type ScrollParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Desplazamiento máximo en px (solo transform) */
  strength?: number;
};

export function ScrollParallax({
  children,
  className,
  strength = 36,
}: ScrollParallaxProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [strength * 0.35, -strength * 0.35]);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}
