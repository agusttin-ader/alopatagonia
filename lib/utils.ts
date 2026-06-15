import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Rail horizontal en mobile — scroll lateral contenido, sin arrastrar la página. */
export const horizontalScrollRailClass =
  "flex max-w-full min-w-0 flex-nowrap overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x [-ms-overflow-scrolling:touch] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
