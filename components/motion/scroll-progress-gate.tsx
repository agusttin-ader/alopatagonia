"use client";

import { usePathname } from "next/navigation";

import { ScrollProgress } from "@/components/motion/scroll-progress";
import { isSiteHomePath } from "@/lib/site-intro-config";

/** Barra de progreso solo en home — evita scroll listeners en catálogo e invierno. */
export function ScrollProgressGate() {
  const pathname = usePathname();
  if (!isSiteHomePath(pathname)) return null;
  return <ScrollProgress />;
}
