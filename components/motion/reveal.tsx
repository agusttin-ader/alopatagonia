"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

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
  const useStagger = staggerChildren;
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
  const selectedVariant = variants[variant];

  return (
    <motion.div
      initial={useStagger ? (reduceMotion ? undefined : "hidden") : reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once, margin, amount }}
      variants={
        useStagger
          ? {
              hidden: {},
              visible: {
                transition: reduceMotion
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
        reduceMotion
          ? { duration: 0 }
          : {
              type: "tween",
              duration: 0.54,
              delay,
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
