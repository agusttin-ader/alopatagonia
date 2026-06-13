import { TestimonialStars } from "@/components/testimonials/TestimonialStars";
import type { Testimonial } from "@/lib/constants";
import {
  getTestimonialAvatarTone,
  getTestimonialInitials,
  parseTestimonialName,
} from "@/lib/testimonials-utils";
import { cn } from "@/lib/utils";

type TestimonialReviewCardProps = {
  testimonial: Testimonial;
  className?: string;
};

export function TestimonialReviewCard({ testimonial, className }: TestimonialReviewCardProps) {
  const { displayName, location } = parseTestimonialName(testimonial.name);
  const initials = getTestimonialInitials(testimonial.name);
  const avatarTone = getTestimonialAvatarTone(testimonial.name);
  const rating = testimonial.rating ?? 5;

  return (
    <article className={cn("flex gap-3.5 sm:gap-4", className)}>
      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-full text-[0.72rem] font-semibold tracking-wide sm:size-11 sm:text-xs",
          avatarTone,
        )}
        aria-hidden
      >
        {initials}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1.5">
          <div className="min-w-0">
            <h3 className="text-[0.95rem] font-semibold leading-snug text-foreground sm:text-base">
              {displayName}
            </h3>
            <p className="mt-0.5 text-xs leading-snug text-muted-foreground">
              {[location, testimonial.timeAgo].filter(Boolean).join(" · ")}
            </p>
          </div>
          <TestimonialStars rating={rating} size="sm" className="shrink-0 pt-0.5" />
        </div>

        <p className="mt-2 inline-flex max-w-full items-center rounded-full bg-brand-forest/[0.07] px-2.5 py-1 text-[0.68rem] font-medium tracking-wide text-brand-forest/90 sm:text-[0.72rem]">
          {testimonial.highlight}
        </p>

        <blockquote className="mt-3 text-[0.9375rem] leading-[1.65] text-foreground/88 sm:text-[0.97rem] sm:leading-[1.7]">
          {testimonial.quote}
        </blockquote>
      </div>
    </article>
  );
}
