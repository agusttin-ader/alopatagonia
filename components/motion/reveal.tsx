"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

import { useCoarseMobile } from "@/lib/use-coarse-mobile";
import { cn } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  variant?: "fade" | "up" | "scale-soft";
  staggerChildren?: boolean;
  once?: boolean;
  amount?: number;
  margin?: string;
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  staggerChildren = false,
  once = true,
  amount = 0.16,
  margin = "-40px 0px",
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const isCoarseMobile = useCoarseMobile();
  const useStagger = staggerChildren;
  const useLiteMotion = reduceMotion || isCoarseMobile;

  const resolvedVariant = isCoarseMobile && !reduceMotion ? "fade" : variant;

  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    up: {
      hidden: { opacity: 0, y: 22 },
      visible: { opacity: 1, y: 0 },
    },
    "scale-soft": {
      hidden: { opacity: 0, y: 16, scale: 0.978 },
      visible: { opacity: 1, y: 0, scale: 1 },
    },
  } as const;
  const selectedVariant = variants[resolvedVariant];

  return (
    <motion.div
      initial={useStagger ? (useLiteMotion ? undefined : "hidden") : useLiteMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{
        once,
        margin: isCoarseMobile ? "0px" : margin,
        amount: isCoarseMobile ? 0.2 : amount,
      }}
      variants={
        useStagger
          ? {
              hidden: {},
              visible: {
                transition: useLiteMotion
                  ? { staggerChildren: 0 }
                  : { staggerChildren: 0.07, delayChildren: delay },
              },
            }
          : selectedVariant
      }
      {...(useStagger
        ? {
            transition: undefined,
          }
        : {})}
      transition={
        useLiteMotion
          ? { duration: 0 }
          : {
              type: "tween",
              duration: isCoarseMobile ? 0.28 : 0.54,
              delay: isCoarseMobile ? 0 : delay,
              ease: [0.16, 1, 0.3, 1],
            }
      }
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
