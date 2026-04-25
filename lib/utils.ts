import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Hover de cards alineado a Beneficios (Services): leve elevación + sombra con tinte primary. */
export const interactiveCardHover =
  "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
