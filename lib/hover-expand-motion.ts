import { cn } from "@/lib/utils";

/** Base de suavidad para expansión al hover — 1.4s, cubic-bezier(0.22, 1, 0.36, 1). */
export const HOVER_EXPAND_MOTION = "motion-hover-expand";

export const CARD_IMAGE_HOVER_EXPAND = cn(
  "object-cover origin-center [image-rendering:auto]",
  HOVER_EXPAND_MOTION,
  "[@media(hover:hover)]:group-hover:scale-[1.04]",
  "motion-safe:group-active:scale-[1.025]",
);

export const GALLERY_TILE_HOVER_EXPAND = cn(
  HOVER_EXPAND_MOTION,
  "[@media(hover:hover)]:group-hover:scale-[1.012]",
);

export const CATALOG_GALLERY_IMAGE_HOVER_EXPAND = cn(
  HOVER_EXPAND_MOTION,
  "[@media(hover:hover)]:group-hover:scale-[1.015]",
);

export const HUB_PILLAR_IMAGE_HOVER_EXPAND = cn(
  "object-cover",
  HOVER_EXPAND_MOTION,
  "[@media(hover:hover)]:group-hover:scale-[1.05]",
);

export const SPREAD_TILE_HOVER_EXPAND = cn(
  HOVER_EXPAND_MOTION,
  "[@media(hover:hover)]:hover:scale-[1.012]",
);
