import { ClipboardCheck, MessageCircle, Mountain } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/motion/reveal";
import { TestimonialInlineQuote } from "@/components/testimonials/TestimonialInlineQuote";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { PLANNER_PATH, SECTION_IDS, TESTIMONIALS } from "@/lib/constants";
import { localizeTestimonials } from "@/lib/i18n/localized-home";
import { SECTION_HEADING, SECTION_SHELL } from "@/lib/layout-shell";
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
      className={cn(SECTION_SHELL, "max-md:bg-secondary/40 max-md:py-14")}
      aria-labelledby="como-funciona-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <Reveal className="mx-auto max-w-2xl text-center max-md:mx-0 max-md:max-w-none max-md:text-left 2xl:max-w-3xl">
          <h2
            id="como-funciona-heading"
            className={cn(
              SECTION_HEADING,
              "max-md:text-[clamp(1.75rem,7vw,2.05rem)] max-md:leading-[1.12] max-md:text-brand-forest",
            )}
          >
            {t("heading")}
          </h2>
        </Reveal>

        {/* Mobile: recorrido editorial */}
        <ol className="relative mt-10 list-none md:hidden">
          <span
            className="pointer-events-none absolute bottom-3 left-[1.05rem] top-3 w-px bg-brand-forest/20"
            aria-hidden
          />
          {steps.map((step, index) => (
            <li key={step.title} className="relative flex gap-5 pb-10 last:pb-2">
              <span
                className="font-heading relative z-[1] w-10 shrink-0 bg-secondary/40 pt-0.5 text-[clamp(1.55rem,6vw,1.85rem)] font-semibold tabular-nums leading-none tracking-tight text-brand-forest"
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1 pt-1">
                <h3 className="font-heading text-[clamp(1.05rem,4.2vw,1.2rem)] font-semibold leading-snug tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[34ch] text-[0.875rem] leading-relaxed text-muted-foreground line-clamp-2">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Desktop / tablet: cards originales — sin cambios de layout */}
        <ol className="mt-8 hidden list-none gap-6 py-2 sm:mt-12 md:mt-14 md:grid md:grid-cols-3 md:items-stretch md:gap-6 lg:gap-8 2xl:gap-10">
          {steps.map((step, index) => {
            const Icon = STEP_ICONS[index] ?? MessageCircle;
            return (
              <li key={step.title} className="h-full min-h-0">
                <Reveal delay={index * 0.09} className="block h-full min-h-0 w-full">
                  <div className="relative z-0 flex min-h-0 w-full flex-col rounded-2xl bg-card/50 px-6 pb-7 pt-7 shadow-sm ring-1 ring-brand-forest/10 sm:px-8 sm:pb-9 sm:pt-9 md:h-full">
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
                    <p className="mt-4 flex-1 text-[0.95rem] leading-[1.75] text-muted-foreground 2xl:text-[1.05rem]">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>

        <div id={SECTION_IDS.planner} className="scroll-mt-24">
          <div className="mt-4 md:hidden">
            <Reveal delay={0.08} className="max-md:[&_blockquote]:line-clamp-3">
              <TestimonialInlineQuote
                testimonial={featuredTestimonial}
                label={tTeaser("proofLabel")}
                className="rounded-[0.875rem] border-brand-forest/10 bg-background/70 px-4 py-4 shadow-none ring-0"
              />
            </Reveal>
            <Reveal delay={0.12} className="mt-7">
              <Link
                href={PLANNER_PATH}
                className={cn(
                  buttonVariants({ variant: "marketing", size: "lg" }),
                  "inline-flex min-h-11 w-full items-center justify-center rounded-full px-6 text-base font-semibold",
                  "shadow-[0_10px_28px_-18px_rgba(212,132,58,0.65)]",
                )}
              >
                {tTeaser("cta")}
              </Link>
            </Reveal>
          </div>

          <div className="mt-10 hidden gap-6 md:grid lg:mt-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-stretch lg:gap-8">
            <Reveal delay={0.1}>
              <TestimonialInlineQuote
                testimonial={featuredTestimonial}
                label={tTeaser("proofLabel")}
              />
            </Reveal>

            <Reveal
              delay={0.16}
              className="flex flex-col justify-center gap-4 lg:items-start lg:justify-center lg:py-2"
            >
              <h3 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]">
                {tTeaser("title")}
              </h3>
              <p className="text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
                {tTeaser("ctaLead")}
              </p>
              <Link
                href={PLANNER_PATH}
                className={cn(
                  buttonVariants({ variant: "marketing", size: "lg" }),
                  "inline-flex h-12 rounded-full px-8 text-base font-semibold 2xl:h-14 2xl:px-10 2xl:text-lg",
                )}
              >
                {tTeaser("cta")}
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
