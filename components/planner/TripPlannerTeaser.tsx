import { CalendarDays, MapPin, MessageCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/motion/reveal";
import { TestimonialInlineQuote } from "@/components/testimonials/TestimonialInlineQuote";
import { MagazinePillCta } from "@/components/ui/magazine-pill-cta";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { PLANNER_PATH, SECTION_IDS, TESTIMONIALS } from "@/lib/constants";
import { localizeTestimonials } from "@/lib/i18n/localized-home";
import { MOBILE_MAGAZINE_G_ENABLED } from "@/lib/mobile-magazine-g";
import { cn } from "@/lib/utils";

const STEP_ICONS = [MapPin, CalendarDays, MessageCircle] as const;
const STEP_KEYS = ["destination", "dates", "whatsapp"] as const;
const FEATURED_TESTIMONIAL_INDEX = 0;

export async function TripPlannerTeaser() {
  const t = await getTranslations("plannerTeaser");
  const tTestimonials = await getTranslations("testimonials");
  const featuredTestimonial = localizeTestimonials(tTestimonials, TESTIMONIALS)[
    FEATURED_TESTIMONIAL_INDEX
  ]!;

  return (
    <section
      id={SECTION_IDS.planner}
      className={cn(
        "scroll-mt-24 bg-background px-4 py-12 sm:px-8 sm:py-16 lg:px-14 2xl:px-20",
        MOBILE_MAGAZINE_G_ENABLED && "max-md:bg-footer-lake max-md:py-14",
      )}
      aria-labelledby="planner-teaser-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <Reveal className="max-w-2xl 2xl:max-w-3xl">
          <h2
            id="planner-teaser-heading"
            className={cn(
              "font-heading text-3xl font-semibold tracking-tight sm:text-4xl 2xl:text-5xl",
              MOBILE_MAGAZINE_G_ENABLED
                ? "max-md:text-footer-lake-foreground"
                : "text-foreground",
            )}
          >
            {t("title")}
          </h2>
          <p
            className={cn(
              "mt-4 text-lg leading-relaxed 2xl:text-xl",
              MOBILE_MAGAZINE_G_ENABLED
                ? "max-md:text-footer-lake-foreground/88"
                : "text-muted-foreground",
            )}
          >
            {t("description")}
          </p>
        </Reveal>

        <ol className="mt-10 grid list-none gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-12">
          {STEP_KEYS.map((key, index) => {
            const Icon = STEP_ICONS[index] ?? MapPin;
            return (
              <li key={key}>
                <Reveal delay={index * 0.06}>
                  <div
                    className={cn(
                      "flex h-full flex-col rounded-2xl px-5 py-5 ring-1 sm:px-6 sm:py-6",
                      MOBILE_MAGAZINE_G_ENABLED
                        ? "bg-card/40 ring-border/70 max-md:bg-white/10 max-md:ring-white/15"
                        : "bg-card/40 ring-border/70",
                    )}
                  >
                    <div
                      className={cn(
                        "mb-4 flex size-10 items-center justify-center rounded-xl",
                        MOBILE_MAGAZINE_G_ENABLED
                          ? "bg-brand-forest/10 text-brand-forest max-md:bg-white/12 max-md:text-footer-lake-foreground"
                          : "bg-brand-forest/10 text-brand-forest",
                      )}
                    >
                      <Icon className="size-5" strokeWidth={1.9} aria-hidden />
                    </div>
                    <h3
                      className={cn(
                        "font-heading text-lg font-semibold",
                        MOBILE_MAGAZINE_G_ENABLED && "max-md:text-footer-lake-foreground",
                      )}
                    >
                      {t(`steps.${key}.title`)}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 text-[0.95rem] leading-relaxed",
                        MOBILE_MAGAZINE_G_ENABLED
                          ? "max-md:text-footer-lake-foreground/82"
                          : "text-muted-foreground",
                      )}
                    >
                      {t(`steps.${key}.text`)}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 grid gap-6 lg:mt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-stretch lg:gap-8">
          <Reveal delay={0.1}>
            <TestimonialInlineQuote
              testimonial={featuredTestimonial}
              label={t("proofLabel")}
              darkOnMobile={MOBILE_MAGAZINE_G_ENABLED}
            />
          </Reveal>

          <Reveal
            delay={0.16}
            className="flex flex-col justify-center gap-4 lg:items-start lg:py-2"
          >
            <p
              className={cn(
                "text-[0.95rem] leading-relaxed",
                MOBILE_MAGAZINE_G_ENABLED
                  ? "max-md:text-footer-lake-foreground/82"
                  : "text-muted-foreground",
              )}
            >
              {t("ctaLead")}
            </p>
            {MOBILE_MAGAZINE_G_ENABLED ? (
              <MagazinePillCta href={PLANNER_PATH} tone="cta" className="md:hidden">
                {t("cta")}
              </MagazinePillCta>
            ) : null}
            <Link
              href={PLANNER_PATH}
              className={cn(
                buttonVariants({ variant: "marketing", size: "lg" }),
                "inline-flex h-12 rounded-full px-8 text-base font-semibold 2xl:h-14 2xl:px-10 2xl:text-lg",
                MOBILE_MAGAZINE_G_ENABLED && "max-md:hidden",
              )}
            >
              {t("cta")}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
