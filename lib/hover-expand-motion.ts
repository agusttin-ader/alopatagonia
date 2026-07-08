import { cn } from "@/lib/utils";

/** Expansión suave al hover — 2.25s, cubic-bezier(0.16, 1, 0.3, 1). */
export const HOVER_EXPAND_MOTION = "motion-hover-expand";

const IMAGE_HOVER_BASE = "object-cover origin-center [image-rendering:auto]";

/** Cards de catálogo, destinos, excursiones y grid editorial. */
export const CARD_IMAGE_HOVER_EXPAND = cn(
  IMAGE_HOVER_BASE,
  HOVER_EXPAND_MOTION,
  "[@media(hover:hover)]:group-hover:scale-[1.03]",
  "motion-safe:group-active:scale-[1.015]",
);

/** Alias semántico — misma animación que CARD_IMAGE_HOVER_EXPAND. */
export const EXCURSION_EDITORIAL_IMAGE_HOVER_EXPAND = CARD_IMAGE_HOVER_EXPAND;

export const GALLERY_TILE_HOVER_EXPAND = cn(
  HOVER_EXPAND_MOTION,
  "[@media(hover:hover)]:group-hover:scale-[1.012]",
);

export const CATALOG_GALLERY_IMAGE_HOVER_EXPAND = cn(
  HOVER_EXPAND_MOTION,
  "[@media(hover:hover)]:group-hover:scale-[1.015]",
);

export const HUB_PILLAR_IMAGE_HOVER_EXPAND = cn(
  IMAGE_HOVER_BASE,
  HOVER_EXPAND_MOTION,
  "[@media(hover:hover)]:group-hover:scale-[1.03]",
);

export const SPREAD_TILE_HOVER_EXPAND = cn(
  HOVER_EXPAND_MOTION,
  "[@media(hover:hover)]:hover:scale-[1.012]",
);
