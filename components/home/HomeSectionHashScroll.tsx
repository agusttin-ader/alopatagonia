"use client";

import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

import {
  resolveHomeSectionHashId,
  scrollToHomeSection,
} from "@/lib/home-sections";
import {
  SITE_INTRO_REVEAL_FALLBACK_MS,
  shouldPlaySiteIntro,
} from "@/lib/site-intro-config";

function scrollToHomeHash(reduceMotion: boolean | null) {
  const hash = window.location.hash;
  if (!hash) return;

  const sectionId = resolveHomeSectionHashId(decodeURIComponent(hash.slice(1)));
  if (!sectionId) return;

  scrollToHomeSection(sectionId, {
    behavior: reduceMotion ? "auto" : "smooth",
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

  useEffect(() => {
    if (pathname !== "/") return;

    const onHashChange = () => scrollToHomeHash(reduceMotion);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname, reduceMotion]);

  return null;
}
