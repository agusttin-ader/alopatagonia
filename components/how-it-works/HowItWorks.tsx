import { ClipboardCheck, MessageCircle, Mountain } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SECTION_IDS } from "@/lib/constants";

const STEPS = [
  {
    title: "Nos contás tu viaje",
    description:
      "Escribís por WhatsApp con fechas, presupuesto y qué te gustaría hacer.",
    icon: MessageCircle,
  },
  {
    title: "Te mandamos el plan",
    description:
      "Auto, hospedaje y excursiones según tu forma de viajar y la temporada.",
    icon: ClipboardCheck,
  },
  {
    title: "Viajás con todo ordenado",
    description:
      "Llegás con reservas hechas y seguimos respondiendo si surge alguna duda.",
    icon: Mountain,
  },
] as const;

export function HowItWorks() {
  return (
    <section
      id={SECTION_IDS.howItWorks}
      className="scroll-mt-24 bg-background px-4 py-12 sm:px-8 lg:px-14 2xl:px-20"
      aria-labelledby="como-funciona-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <Reveal className="mx-auto max-w-2xl text-center 2xl:max-w-3xl">
          <h2
            id="como-funciona-heading"
            className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-[2.1rem] sm:leading-snug 2xl:text-5xl"
          >
            Tres pasos por WhatsApp
          </h2>
        </Reveal>

        <ol className="mt-8 grid list-none gap-6 py-2 sm:mt-16 md:mt-20 md:grid-cols-3 md:items-stretch md:gap-6 lg:gap-8 2xl:gap-10">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="h-full min-h-0">
                <Reveal delay={index * 0.09} className="block h-full min-h-0 w-full">
                  <div className="relative z-0 flex min-h-0 w-full flex-col rounded-2xl bg-card/50 px-6 pb-7 pt-7 shadow-sm ring-1 ring-brand-forest/10 sm:px-8 sm:pb-9 sm:pt-9 md:h-full">
                    <div className="flex items-center justify-between gap-4">
                      <span className="font-heading text-sm font-semibold tabular-nums text-brand-forest/70">
                        {index + 1}
                      </span>
                      <div
                        className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-forest/10 text-brand-forest"
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
      </div>
    </section>
  );
}
