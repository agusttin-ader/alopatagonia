import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Rail horizontal en mobile — evita scroll vertical al arrastrar con el dedo. */
export const horizontalScrollRailClass =
  "flex max-w-full flex-nowrap overflow-x-auto overflow-y-hidden overscroll-x-contain touch-pan-x [-ms-overflow-scrolling:touch] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
