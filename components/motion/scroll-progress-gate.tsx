"use client";

import { usePathname } from "next/navigation";

import { ScrollProgress } from "@/components/motion/scroll-progress";

/** Barra de progreso solo en home — evita scroll listeners en catálogo e invierno. */
export function ScrollProgressGate() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <ScrollProgress />;
}
