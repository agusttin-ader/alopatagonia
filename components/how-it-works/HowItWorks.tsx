import { ClipboardCheck, MessageCircle, Mountain } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/motion/reveal";
import { TestimonialInlineQuote } from "@/components/testimonials/TestimonialInlineQuote";
import { buttonVariants } from "@/components/ui/button";
import { MagazinePillCta } from "@/components/ui/magazine-pill-cta";
import { Link } from "@/i18n/navigation";
import { PLANNER_PATH, SECTION_IDS, TESTIMONIALS } from "@/lib/constants";
import { localizeTestimonials } from "@/lib/i18n/localized-home";
import { SECTION_HEADING, SECTION_SHELL } from "@/lib/layout-shell";
import { MOBILE_MAGAZINE_G_ENABLED } from "@/lib/mobile-magazine-g";
import { cn } from "@/lib/utils";

const STEP_ICONS = [MessageCircle, ClipboardCheck, Mountain] as const;
const FEATURED_TESTIMONIAL_INDEX = 0;

export async function HowItWorks() {
  const t = await getTranslations("howItWorks");
  const tTeaser = await getTranslations("plannerTeaser");
  const tTestimonials = await getTranslations("testimonials");
  const steps = t.raw("steps") as Array<{ title: string; description: string }>;
  const featuredTestimonial = localizeTestimonials(tTestimonials, TESTIMONIALS)[
    FEATURED_TESTIMONIAL_INDEX
  ]!;

  return (
    <section
      id={SECTION_IDS.howItWorks}
      className={cn(SECTION_SHELL, MOBILE_MAGAZINE_G_ENABLED && "max-md:bg-footer-lake max-md:py-14")}
      aria-labelledby="como-funciona-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <Reveal className="mx-auto max-w-2xl text-center 2xl:max-w-3xl">
          <h2
            id="como-funciona-heading"
            className={cn(
              SECTION_HEADING,
              MOBILE_MAGAZINE_G_ENABLED && "max-md:text-footer-lake-foreground",
            )}
          >
            {t("heading")}
          </h2>
        </Reveal>

        <ol className="mt-8 grid list-none gap-6 py-2 sm:mt-12 md:mt-14 md:grid-cols-3 md:items-stretch md:gap-6 lg:gap-8 2xl:gap-10">
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[index] ?? MessageCircle;
            return (
              <li key={step.title} className="h-full min-h-0">
                <Reveal delay={index * 0.09} className="block h-full min-h-0 w-full">
                  <div
                    className={cn(
                      "relative z-0 flex min-h-0 w-full flex-col rounded-2xl px-6 pb-7 pt-7 shadow-sm ring-1 sm:px-8 sm:pb-9 sm:pt-9 md:h-full",
                      MOBILE_MAGAZINE_G_ENABLED
                        ? "bg-card/50 ring-brand-forest/10 max-md:bg-card max-md:ring-black/10"
                        : "bg-card/50 ring-brand-forest/10",
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-heading text-sm font-semibold tabular-nums text-brand-forest/80">
                        {index + 1}
                      </span>
                      <div
                        className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-forest/12 text-brand-forest"
                        aria-hidden
                      >
                        <Icon className="size-5" strokeWidth={1.9} />
                      </div>
                    </div>
                    <h3 className="mt-6 font-heading text-xl font-semibold leading-snug tracking-tight text-foreground 2xl:text-2xl">
                      {step.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-4 flex-1 text-[0.95rem] leading-[1.75] 2xl:text-[1.05rem]",
                        MOBILE_MAGAZINE_G_ENABLED
                          ? "text-muted-foreground max-md:text-foreground/82"
                          : "text-muted-foreground",
                      )}
                    >
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>

        <div
          id={SECTION_IDS.planner}
          className="mt-10 grid gap-6 scroll-mt-24 lg:mt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-stretch lg:gap-8"
        >
          <Reveal delay={0.1}>
            <TestimonialInlineQuote
              testimonial={featuredTestimonial}
              label={tTeaser("proofLabel")}
              darkOnMobile={MOBILE_MAGAZINE_G_ENABLED}
            />
          </Reveal>

          <Reveal
            delay={0.16}
            className="flex flex-col justify-center gap-4 lg:items-start lg:justify-center lg:py-2"
          >
            <h3
              className={cn(
                "font-heading text-2xl font-semibold tracking-tight sm:text-[1.65rem]",
                MOBILE_MAGAZINE_G_ENABLED
                  ? "max-md:text-footer-lake-foreground"
                  : "text-foreground",
              )}
            >
              {tTeaser("title")}
            </h3>
            <p
              className={cn(
                "text-[0.95rem] leading-relaxed sm:text-base",
                MOBILE_MAGAZINE_G_ENABLED
                  ? "max-md:text-footer-lake-foreground/82"
                  : "text-muted-foreground",
              )}
            >
              {tTeaser("ctaLead")}
            </p>
            {MOBILE_MAGAZINE_G_ENABLED ? (
              <MagazinePillCta href={PLANNER_PATH} tone="cta" className="md:hidden">
                {tTeaser("cta")}
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
              {tTeaser("cta")}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
