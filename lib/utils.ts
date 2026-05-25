import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Hover sutil en elementos realmente interactivos. */
export const interactiveCardHover =
  "transition-shadow duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-md hover:shadow-primary/8 motion-reduce:transition-none"
