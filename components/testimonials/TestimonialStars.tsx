import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

type TestimonialStarsProps = {
  rating?: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
  label?: string;
};

export function TestimonialStars({
  rating = 5,
  max = 5,
  size = "sm",
  className,
  label,
}: TestimonialStarsProps) {
  const iconClass = size === "sm" ? "size-3.5" : "size-4";
  const rounded = Math.round(rating);

  return (
    <div
      className={cn("inline-flex items-center gap-0.5", className)}
      role="img"
      aria-label={label ?? `${rating} de ${max} estrellas`}
    >
      {Array.from({ length: max }, (_, index) => (
        <Star
          key={index}
          className={cn(
            iconClass,
            index < rounded
              ? "fill-[#f5a623] text-[#f5a623]"
              : "fill-transparent text-black/15",
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}
