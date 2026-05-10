"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

type AlternatingSectionRevealProps = PropsWithChildren<{
  from: "left" | "right";
  delay?: number;
}>;

export function AlternatingSectionReveal({
  children,
  from,
  delay = 0,
}: AlternatingSectionRevealProps) {
  const reduceMotion = useReducedMotion();
  const initialX = from === "left" ? -36 : 36;

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: initialX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.16, margin: "-32px 0px" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: 0.52,
              delay,
              ease: [0.16, 1, 0.3, 1],
            }
      }
    >
      {children}
    </motion.div>
  );
}
