import { cn } from "@/lib/utils";

/** Contenedor principal — escala de mobile a 4K (3840px). */
export const SHELL_MAX = cn(
  "mx-auto w-full max-w-7xl",
  "2xl:max-w-[90rem]",
  "min-[1920px]:max-w-[105rem]",
  "min-[2560px]:max-w-[125rem]",
  "min-[3840px]:max-w-[155rem]",
);

export const SHELL_PX = cn(
  "px-4 sm:px-8 lg:px-14 2xl:px-20",
  "min-[1920px]:px-24 min-[2560px]:px-28 min-[3840px]:px-32",
);

export const SHELL_PAGE_PT = cn(
  "pt-28 sm:pt-32",
  "min-[1920px]:pt-36 min-[2560px]:pt-[9.5rem]",
);

export function siteShell(className?: string) {
  return cn(SHELL_MAX, SHELL_PX, className);
}

/** Banda full-bleed para galerías hero (más ancha que el texto). */
export const GALLERY_BAND_PX = cn(
  "px-3 sm:px-6 md:px-8 lg:px-12 xl:px-14",
  "min-[1920px]:px-20 min-[2560px]:px-24 min-[3840px]:px-28",
);

export const GALLERY_MAX = cn(
  "mx-auto w-full max-w-[1560px]",
  "min-[1920px]:max-w-[105rem]",
  "min-[2560px]:max-w-[125rem]",
  "min-[3840px]:max-w-[155rem]",
);

/** Mismo ancho que GALLERY_MAX, sin centrado (dentro de flex). */
export const GALLERY_MAX_FLEX = cn(
  "min-w-0 w-full max-w-[1560px]",
  "min-[1920px]:max-w-[105rem]",
  "min-[2560px]:max-w-[125rem]",
  "min-[3840px]:max-w-[155rem]",
);

/** Mosaico de ficha de catálogo / home (6–7 tiles). */
export const CATALOG_GALLERY_GRID_HEIGHT = cn(
  "h-[clamp(420px,52vh,560px)]",
  "md:h-[clamp(480px,58vh,680px)]",
  "lg:h-[clamp(520px,62vh,760px)]",
  "xl:h-[clamp(560px,65vh,820px)]",
  "min-[1920px]:h-[min(72vh,920px)]",
  "min-[2560px]:h-[min(74vh,1080px)]",
  "min-[3840px]:h-[min(76vh,1280px)]",
);

export const CATALOG_GALLERY_SINGLE_HEIGHT = cn(
  "col-span-12 row-span-6 aspect-[4/3] md:aspect-auto",
  CATALOG_GALLERY_GRID_HEIGHT,
);

export const CATALOG_GALLERY_GAP = cn(
  "gap-1.5 md:gap-2.5 lg:gap-3",
  "min-[1920px]:gap-3.5 min-[2560px]:gap-4 min-[3840px]:gap-5",
);

export const HOME_GALLERY_GRID_HEIGHT = cn(
  "h-[min(66vh,480px)]",
  "min-[400px]:h-[min(68vh,540px)]",
  "sm:h-[min(72vh,620px)]",
  "md:h-[min(76vh,700px)]",
  "lg:h-[min(80vh,780px)]",
  "xl:h-[min(84vh,860px)]",
  "2xl:h-[min(86vh,920px)]",
  "min-[1920px]:h-[min(88vh,1000px)]",
  "min-[2560px]:h-[min(90vh,1140px)]",
  "min-[3840px]:h-[min(88vh,1280px)]",
);

export const HOME_GALLERY_GAP = cn(
  "gap-0.5 min-[400px]:gap-1 sm:gap-1 md:gap-1.5 lg:gap-1.5 xl:gap-2",
  "min-[1920px]:gap-2.5 min-[2560px]:gap-3 min-[3840px]:gap-3.5",
);

export const GALLERY_NAV_BUTTON_SIZE = cn(
  "size-11 md:size-12",
  "min-[1920px]:size-[3.25rem] min-[2560px]:size-14 min-[3840px]:size-16",
);

export const GALLERY_NAV_ROW_GAP = cn(
  "gap-3 md:gap-4",
  "min-[1920px]:gap-5 min-[2560px]:gap-6",
);

export const DETAIL_SIDEBAR_GRID = cn(
  "lg:grid-cols-[minmax(0,1fr)_320px]",
  "xl:grid-cols-[minmax(0,1fr)_360px]",
  "min-[1920px]:grid-cols-[minmax(0,1fr)_400px] min-[1920px]:gap-16",
  "min-[2560px]:grid-cols-[minmax(0,1fr)_440px] min-[2560px]:gap-20",
  "min-[3840px]:grid-cols-[minmax(0,1fr)_480px]",
);

export const PAGE_TITLE = cn(
  "text-3xl font-medium tracking-tight sm:text-4xl",
  "min-[1920px]:text-[2.75rem]",
  "min-[2560px]:text-5xl",
  "min-[3840px]:text-[3.35rem]",
);

export const DETAIL_TITLE = cn(
  "text-3xl font-medium tracking-tight sm:text-4xl",
  "lg:text-[2.6rem] lg:leading-tight",
  "min-[1920px]:text-[2.85rem]",
  "min-[2560px]:text-5xl min-[2560px]:leading-tight",
  "min-[3840px]:text-[3.25rem]",
);

export const SECTION_TITLE = cn(
  "text-2xl font-medium tracking-tight sm:text-3xl",
  "min-[1920px]:text-[2.1rem]",
  "min-[2560px]:text-4xl",
  "min-[3840px]:text-[2.75rem]",
);

export const DETAIL_STICKY_TOP = cn(
  "lg:top-28",
  "min-[1920px]:top-32 min-[2560px]:top-36",
);

/** Barra lateral del catálogo split — queda fija al hacer scroll. */
export const CATALOG_SPLIT_SIDEBAR_STICKY = cn(
  "sticky z-10 self-start",
  DETAIL_STICKY_TOP,
  "max-h-[calc(100dvh-7rem)] overflow-y-auto overscroll-y-contain",
  "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
);

export const LIGHTBOX_FRAME = cn(
  "h-[min(90vh,820px)] w-[min(92vw,1100px)]",
  "min-[1920px]:h-[min(88vh,980px)] min-[1920px]:w-[min(88vw,1280px)]",
  "min-[2560px]:h-[min(86vh,1200px)] min-[2560px]:w-[min(86vw,1480px)]",
  "min-[3840px]:h-[min(84vh,1400px)] min-[3840px]:w-[min(84vw,1680px)]",
);

export const LIGHTBOX_CONTROL_SIZE = cn(
  "size-11",
  "min-[1920px]:size-12 min-[2560px]:size-[3.25rem]",
);

export const CATALOG_GRID_GAP = cn(
  "gap-x-6 gap-y-10 lg:gap-x-8 lg:gap-y-12",
  "max-md:gap-y-8",
  "min-[1920px]:gap-x-10 min-[1920px]:gap-y-14",
  "min-[2560px]:gap-x-12 min-[2560px]:gap-y-16",
);

/** Espacio inferior en mobile para no tapar contenido con el FAB de WhatsApp. */
export const MOBILE_FAB_CLEARANCE = "max-md:pb-20";
