"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { SiteIntro } from "@/components/motion/site-intro";
import {
  isSiteHomePath,
  setSiteIntroPending,
  setSiteIntroPlaceholderHidden,
  SITE_INTRO_HIDE_AFTER_MS,
} from "@/lib/site-intro-config";

/** Intro animada solo en home (/, /en, /pt) — evita costo en /destinos, /invierno, etc. */
export function HomeIntroGate() {
  const pathname = usePathname();
  const isHome = isSiteHomePath(pathname);

  useEffect(() => {
    if (isHome) return;

    setSiteIntroPending(false);
    setSiteIntroPlaceholderHidden(true);
  }, [isHome]);

  useEffect(() => {
    if (!isHome) return;

    const fallbackId = window.setTimeout(() => {
      if (!document.documentElement.classList.contains("site-intro-pending")) return;

      setSiteIntroPending(false);
      setSiteIntroPlaceholderHidden(true);
      window.__aloIntroReveal = true;
      window.dispatchEvent(new CustomEvent("alo-site-intro-reveal"));
    }, SITE_INTRO_HIDE_AFTER_MS + 800);

    return () => window.clearTimeout(fallbackId);
  }, [isHome]);

  if (!isHome) return null;
  return <SiteIntro />;
}
