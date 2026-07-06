import { getLocale, getTranslations } from "next-intl/server";

import { Reveal } from "@/components/motion/reveal";
import { TestimonialReviewCard } from "@/components/testimonials/TestimonialReviewCard";
import { TestimonialStars } from "@/components/testimonials/TestimonialStars";
import { SECTION_IDS, TESTIMONIALS } from "@/lib/constants";
import { localizeTestimonials } from "@/lib/i18n/localized-home";
import { getAverageTestimonialRating } from "@/lib/testimonials-utils";
import { SHELL_PX } from "@/lib/layout-shell";
import { cn } from "@/lib/utils";

export async function Testimonials() {
  const t = await getTranslations("testimonials");
  const locale = await getLocale();
  const items = localizeTestimonials(t, TESTIMONIALS);
  const averageRating = getAverageTestimonialRating(items);

  return (
    <section
      id={SECTION_IDS.testimonials}
      className={cn("scroll-mt-24 border-t border-brand-forest/10 bg-background", SHELL_PX, "py-12 sm:py-16 lg:py-20")}
      aria-labelledby="testimonios-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14 xl:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              {t("eyebrow")}
            </p>
            <h2
              id="testimonios-heading"
              className="font-heading mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-[2.1rem] sm:leading-snug 2xl:text-[2.75rem]"
            >
              {t("heading")}
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground 2xl:text-lg">
              {t("lead")}
            </p>

            <div
              className="mt-8 inline-flex flex-col gap-2 rounded-2xl border border-black/8 bg-white/55 px-5 py-4 sm:mt-10"
              aria-label={t("ratingAria", {
                rating: averageRating,
                count: items.length,
              })}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-heading text-4xl font-medium leading-none tracking-tight text-foreground">
                  {averageRating.toLocaleString(locale, {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  })}
                </span>
                <TestimonialStars rating={averageRating} size="md" />
              </div>
              <p className="text-sm text-muted-foreground">
                {t("stats", { count: items.length })}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="overflow-hidden border-y border-black/8 bg-white/45 lg:rounded-2xl lg:border lg:bg-white/55">
              <ul className="divide-y divide-black/8">
                {items.map((testimonial) => (
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
