"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  ...props
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px 0px", amount: 0.1 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              type: "tween",
              duration: 1.05,
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
