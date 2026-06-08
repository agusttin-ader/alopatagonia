import { CalendarDays, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { MagazinePillCta } from "@/components/ui/magazine-pill-cta";
import { buttonVariants } from "@/components/ui/button";
import {
  PLANNER_PATH,
  PLANNER_TEASER_COPY,
  SECTION_IDS,
} from "@/lib/constants";
import { MOBILE_MAGAZINE_G_ENABLED } from "@/lib/mobile-magazine-g";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    icon: MapPin,
    title: "Destino",
    text: "Bariloche, El Chaltén, Madryn y más.",
  },
  {
    icon: CalendarDays,
    title: "Fechas",
    text: "Cuándo viajás y cuántos son.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    text: "Mensaje armado, listo para enviar.",
  },
] as const;

export function TripPlannerTeaser() {
  return (
    <section
      id={SECTION_IDS.planner}
      className={cn(
        "scroll-mt-24 px-4 py-12 sm:px-8 sm:py-16 lg:px-14 2xl:px-20",
        MOBILE_MAGAZINE_G_ENABLED
          ? "max-md:bg-footer-lake max-md:py-14"
          : "bg-background",
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
            {PLANNER_TEASER_COPY.title}
          </h2>
          <p
            className={cn(
              "mt-4 text-lg leading-relaxed 2xl:text-xl",
              MOBILE_MAGAZINE_G_ENABLED
                ? "max-md:text-footer-lake-foreground/82"
                : "text-muted-foreground",
            )}
          >
            {PLANNER_TEASER_COPY.description}
          </p>
        </Reveal>

        <ol className="mt-8 grid list-none gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.title}>
                <Reveal delay={index * 0.06}>
                  <div
                    className={cn(
                      "flex h-full flex-col rounded-2xl px-4 py-4 ring-1 sm:px-5 sm:py-5",
                      MOBILE_MAGAZINE_G_ENABLED
                        ? "max-md:bg-white/10 max-md:ring-white/14 sm:bg-card/60 sm:ring-brand-forest/10"
                        : "bg-card/60 ring-brand-forest/10",
                    )}
                  >
                    <div
                      className={cn(
                        "flex size-10 items-center justify-center rounded-xl",
                        MOBILE_MAGAZINE_G_ENABLED
                          ? "max-md:bg-white/12 max-md:text-footer-lake-foreground sm:bg-brand-forest/10 sm:text-brand-forest"
                          : "bg-brand-forest/10 text-brand-forest",
                      )}
                      aria-hidden
                    >
                      <Icon className="size-5" strokeWidth={1.9} />
                    </div>
                    <h3
                      className={cn(
                        "mt-3 font-heading text-lg font-semibold tracking-tight",
                        MOBILE_MAGAZINE_G_ENABLED
                          ? "max-md:text-footer-lake-foreground sm:text-foreground"
                          : "text-foreground",
                      )}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-1.5 text-sm leading-relaxed",
                        MOBILE_MAGAZINE_G_ENABLED
                          ? "max-md:text-footer-lake-foreground/78 sm:text-muted-foreground"
                          : "text-muted-foreground",
                      )}
                    >
                      {step.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>

        <Reveal delay={0.14} className="mt-8 sm:mt-10">
          {MOBILE_MAGAZINE_G_ENABLED ? (
            <MagazinePillCta
              href={PLANNER_PATH}
              tone="cta"
              className="mx-auto max-w-md md:hidden"
            >
              {PLANNER_TEASER_COPY.cta}
            </MagazinePillCta>
          ) : null}
          <Link
            href={PLANNER_PATH}
            className={cn(
              buttonVariants({ variant: "marketing", size: "lg" }),
              "motion-cta inline-flex h-12 px-10 text-base font-semibold 2xl:h-14 2xl:px-12 2xl:text-lg",
              MOBILE_MAGAZINE_G_ENABLED && "max-md:hidden",
            )}
          >
            {PLANNER_TEASER_COPY.cta}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
