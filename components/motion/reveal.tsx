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
        reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px 0px", amount: 0.12 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: 0.5,
              delay,
              ease: [0.22, 1, 0.36, 1],
            }
      }
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
