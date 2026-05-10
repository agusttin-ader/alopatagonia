"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type PropsWithChildren } from "react";

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const offset = isMobile ? 18 : 42;
  const initialX = from === "left" ? -offset : offset;
  const mobileEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const desktopEase: [number, number, number, number] = [0.19, 1, 0.22, 1];

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: initialX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{
        once: true,
        amount: isMobile ? 0.12 : 0.18,
        margin: isMobile ? "-20px 0px" : "-32px 0px",
      }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: isMobile ? 0.4 : 0.58,
              delay,
              ease: isMobile ? mobileEase : desktopEase,
            }
      }
    >
      {children}
    </motion.div>
  );
}
