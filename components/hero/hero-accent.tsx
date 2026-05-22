"use client";

import { motion, useReducedMotion } from "framer-motion";

export function HeroAccent() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-[-20%] z-[3] mx-auto h-[62%] w-[86%] rounded-full bg-[radial-gradient(circle,rgba(218,209,156,0.28)_0%,rgba(218,209,156,0.11)_38%,rgba(218,209,156,0)_72%)] will-change-transform"
        style={{ filter: "saturate(1.03)" }}
        initial={reduceMotion ? false : { opacity: 0.24, y: 0 }}
        animate={reduceMotion ? { opacity: 0.28 } : { opacity: [0.24, 0.38, 0.24], y: [0, -10, 0] }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 7.2,
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1],
              }
        }
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-[6%] z-[3] mx-auto h-[30%] w-[56%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.04)_52%,rgba(255,255,255,0)_78%)] will-change-transform"
        initial={reduceMotion ? false : { opacity: 0.15 }}
        animate={reduceMotion ? { opacity: 0.16 } : { opacity: [0.14, 0.22, 0.14], x: [0, 4, 0] }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 9.4,
                repeat: Infinity,
                ease: [0.4, 0, 0.2, 1],
              }
        }
        aria-hidden
      />
    </>
  );
}
