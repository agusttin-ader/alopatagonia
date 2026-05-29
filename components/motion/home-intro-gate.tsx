"use client";

import { usePathname } from "next/navigation";

import { SiteIntro } from "@/components/motion/site-intro";

/** Intro animada solo en home — evita costo en /destinos, /invierno, etc. */
export function HomeIntroGate() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <SiteIntro />;
}
