"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

import { useCoarseMobile } from "@/lib/use-coarse-mobile";
import { cn } from "@/lib/utils";

type ScrollParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Desplazamiento máximo en px (solo transform) */
  strength?: number;
};

function ScrollParallaxActive({
  children,
  className,
  strength,
}: {
  children: ReactNode;
  className?: string;
  strength: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [strength * 0.35, -strength * 0.35]);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{ position: "relative" }}
    >
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

export function ScrollParallax({
  children,
  className,
  strength = 36,
}: ScrollParallaxProps) {
  const reduceMotion = useReducedMotion();
  const isCoarseMobile = useCoarseMobile();

  if (reduceMotion || isCoarseMobile) {
    return <div className={cn("relative", className)}>{children}</div>;
  }

  return (
    <ScrollParallaxActive className={className} strength={strength}>
      {children}
    </ScrollParallaxActive>
  );
}
