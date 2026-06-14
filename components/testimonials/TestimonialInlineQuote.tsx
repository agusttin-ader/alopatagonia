import { TestimonialStars } from "@/components/testimonials/TestimonialStars";
import type { Testimonial } from "@/lib/constants";
import { parseTestimonialName } from "@/lib/testimonials-utils";
import { cn } from "@/lib/utils";

type TestimonialInlineQuoteProps = {
  testimonial: Testimonial;
  label?: string;
  /** Estilos claros en desktop; en mobile oscuro solo con `max-md:` cuando la sección es footer-lake. */
  darkOnMobile?: boolean;
  className?: string;
};

export function TestimonialInlineQuote({
  testimonial,
  label,
  darkOnMobile = false,
  className,
}: TestimonialInlineQuoteProps) {
  const { displayName, location } = parseTestimonialName(testimonial.name);
  const rating = testimonial.rating ?? 5;

  return (
    <figure
      className={cn(
        "rounded-2xl border border-border/70 bg-card/55 px-5 py-5 shadow-sm ring-1 ring-brand-forest/[0.06] sm:px-6 sm:py-6",
        darkOnMobile &&
          "max-md:border-white/14 max-md:bg-white/10 max-md:ring-white/10",
        className,
      )}
    >
      {label ? (
        <p
          className={cn(
            "text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
            darkOnMobile && "max-md:text-footer-lake-foreground/70",
          )}
        >
          {label}
        </p>
      ) : null}

      <div className={cn("flex items-center gap-2", label ? "mt-3" : undefined)}>
        <TestimonialStars rating={rating} size="sm" />
        {testimonial.highlight ? (
          <span
            className={cn(
              "text-[0.72rem] font-medium text-brand-forest/85",
              darkOnMobile && "max-md:text-footer-lake-foreground/82",
            )}
          >
            {testimonial.highlight}
          </span>
        ) : null}
      </div>

      <blockquote
        className={cn(
          "mt-3 text-[0.98rem] leading-[1.65] text-foreground sm:text-[1.02rem] sm:leading-[1.7]",
          darkOnMobile && "max-md:text-footer-lake-foreground",
        )}
      >
        “{testimonial.quote}”
      </blockquote>

      <figcaption
        className={cn(
          "mt-4 text-sm font-semibold text-foreground",
          darkOnMobile && "max-md:text-footer-lake-foreground",
        )}
      >
        {displayName}
        {location ? (
          <span
            className={cn(
              "font-normal text-muted-foreground",
              darkOnMobile && "max-md:text-footer-lake-foreground/75",
            )}
          >
            {" "}
            · {location}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
