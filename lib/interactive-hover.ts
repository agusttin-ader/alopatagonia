import { cn } from "@/lib/utils";

const HOVER_ONLY = "[@media(hover:hover)]";

/** Título editorial en cards clickeables (destinos, alojamientos, excursiones). */
export const EDITORIAL_CARD_TITLE_HOVER = cn(
  "transition-[color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
  `${HOVER_ONLY}:group-hover:text-cta`,
);

/** Ícono flecha en cards editoriales. */
export const EDITORIAL_CARD_ARROW_HOVER = cn(
  "transition-[color,border-color,background-color] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
  `${HOVER_ONLY}:group-hover:border-cta/35`,
  `${HOVER_ONLY}:group-hover:bg-cta/10`,
  `${HOVER_ONLY}:group-hover:text-cta`,
);

/** CTA transparente sobre póster oscuro (hub, catálogo mobile). */
export const POSTER_LINK_CTA_HOVER = cn(
  "transition-colors duration-300",
  `${HOVER_ONLY}:group-hover:text-cta`,
);
