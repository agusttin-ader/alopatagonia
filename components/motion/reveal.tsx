"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  variant?: "fade" | "up" | "scale-soft";
  once?: boolean;
  amount?: number;
  margin?: string;
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  once = true,
  amount = 0.16,
  margin = "-40px 0px",
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const variants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    up: {
      hidden: { opacity: 0, y: 14 },
      visible: { opacity: 1, y: 0 },
    },
    "scale-soft": {
      hidden: { opacity: 0, y: 10, scale: 0.982 },
      visible: { opacity: 1, y: 0, scale: 1 },
    },
  } as const;
  const selectedVariant = variants[variant];

  return (
    <motion.div
      initial={reduceMotion ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once, margin, amount }}
      variants={selectedVariant}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              type: "tween",
              duration: 0.46,
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
