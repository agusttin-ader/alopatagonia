import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/motion/reveal";
import { TestimonialReviewCard } from "@/components/testimonials/TestimonialReviewCard";
import { TestimonialStars } from "@/components/testimonials/TestimonialStars";
import { SECTION_IDS, TESTIMONIALS } from "@/lib/constants";
import { localizeTestimonials } from "@/lib/i18n/localized-home";
import { getAverageTestimonialRating } from "@/lib/testimonials-utils";
import { SECTION_HEADING, SECTION_SHELL } from "@/lib/layout-shell";
import { cn } from "@/lib/utils";

const DESKTOP_VISIBLE_COUNT = 3;

export async function Testimonials() {
  const t = await getTranslations("testimonials");
  const items = localizeTestimonials(t, TESTIMONIALS);
  const averageRating = getAverageTestimonialRating(items);
  const visibleItems = items.slice(0, DESKTOP_VISIBLE_COUNT);

  return (
    <section
      id={SECTION_IDS.testimonials}
      className={cn(SECTION_SHELL, "border-t border-brand-forest/10")}
      aria-labelledby="testimonios-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 xl:gap-16">
          <Reveal preserveSticky className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {t("eyebrow")}
            </p>
            <h2 id="testimonios-heading" className={cn(SECTION_HEADING, "mt-3")}>
              {t("heading")}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground 2xl:text-lg">
              {t("lead")}
            </p>

            <div
              className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10"
              aria-label={t("ratingAria", {
                rating: averageRating,
                count: items.length,
              })}
            >
              <TestimonialStars rating={averageRating} size="md" />
              <p className="text-sm text-muted-foreground">
                {t("stats", { count: items.length })}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden border-y border-black/8 bg-white/45 lg:rounded-2xl lg:border lg:bg-white/55">
              <ul className="divide-y divide-black/8">
                {visibleItems.map((testimonial) => (
                  <li key={testimonial.name}>
                    <TestimonialReviewCard
                      testimonial={testimonial}
                      className="px-4 py-6 sm:px-6 sm:py-7 lg:px-7"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
