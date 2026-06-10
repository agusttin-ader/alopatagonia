import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { ESCAPADAS_EXPRESS_COPY } from "@/lib/about-pages";
import { PLANNER_PATH, SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function EscapadasExpressSection() {
  return (
    <section
      id={SECTION_IDS.escapadasExpress}
      className="scroll-mt-24 bg-secondary/35 px-4 py-12 sm:px-8 sm:py-16 lg:px-14 2xl:px-20"
      aria-labelledby="escapadas-express-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <Reveal className="relative overflow-hidden rounded-3xl bg-background px-6 py-10 ring-1 ring-border/80 sm:px-10 sm:py-12">
          <span className="inline-flex rounded-full border border-brand-forest/20 bg-brand-forest/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-forest">
            Próximamente
          </span>
          <h2
            id="escapadas-express-heading"
            className="font-heading mt-5 text-3xl font-medium tracking-tight text-foreground sm:text-4xl 2xl:text-5xl"
          >
            {ESCAPADAS_EXPRESS_COPY.title}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground 2xl:text-xl">
            {ESCAPADAS_EXPRESS_COPY.subtitle}
          </p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground/90">
            {ESCAPADAS_EXPRESS_COPY.body}
          </p>
          <Link
            href={PLANNER_PATH}
            className={cn(
              buttonVariants({ variant: "marketing", size: "lg" }),
              "motion-cta mt-8 inline-flex h-12 rounded-full px-10 text-base font-semibold 2xl:h-14 2xl:px-12 2xl:text-lg",
            )}
          >
            Planear mi viaje
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
