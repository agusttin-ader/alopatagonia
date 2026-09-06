import { cn } from "@/lib/utils";

const SECTION_DEFER_CLASS = {
  compact: "section-defer section-defer--compact",
  default: "section-defer",
  tall: "section-defer section-defer--tall",
  heroAdjacent: "section-defer section-defer--hero-adjacent",
} as const;

export type SectionDeferSize = keyof typeof SECTION_DEFER_CLASS;

export function sectionDeferClass(size: SectionDeferSize = "default", className?: string) {
  return cn(SECTION_DEFER_CLASS[size], className);
}
