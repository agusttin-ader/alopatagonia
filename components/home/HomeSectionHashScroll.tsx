"use client";

import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

import {
  SITE_INTRO_REVEAL_FALLBACK_MS,
  shouldPlaySiteIntro,
} from "@/lib/site-intro-config";

function scrollToHomeHash(reduceMotion: boolean | null) {
  const hash = window.location.hash;
  if (!hash) return;

  const sectionId = decodeURIComponent(hash.slice(1));
  const section = document.getElementById(sectionId);
  if (!section) return;

  section.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
    inline: "nearest",
  });
}

/** Lleva al ancla de sección tras la intro de home o en navegación client-side. */
export function HomeSectionHashScroll() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (pathname !== "/") return;

    const run = () => scrollToHomeHash(reduceMotion);

    if (window.__aloIntroReveal || !shouldPlaySiteIntro()) {
      run();
      return;
    }

    window.addEventListener("alo-site-intro-reveal", run, { once: true });
    const fallbackId = window.setTimeout(run, SITE_INTRO_REVEAL_FALLBACK_MS);

    return () => {
      window.removeEventListener("alo-site-intro-reveal", run);
      window.clearTimeout(fallbackId);
    };
  }, [pathname, reduceMotion]);

  return null;
}
