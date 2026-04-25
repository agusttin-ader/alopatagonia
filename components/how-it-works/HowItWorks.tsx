import { ClipboardCheck, MessageCircle, Sparkles } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SECTION_IDS } from "@/lib/constants";
import { cn, interactiveCardHover } from "@/lib/utils";

const STEPS = [
  {
    title: "Nos contás tu viaje",
    description:
      "Nos escribís por WhatsApp con tus fechas, presupuesto y plan ideal.",
    icon: MessageCircle,
  },
  {
    title: "Te armamos una propuesta personalizada",
    description:
      "Combinamos auto, hospedaje y excursiones según tu forma de viajar.",
    icon: ClipboardCheck,
  },
  {
    title: "Disfrutás Patagonia sin estrés",
    description:
      "Viajás con todo ordenado y soporte rápido para resolver cualquier duda.",
    icon: Sparkles,
  },
] as const;

export function HowItWorks() {
  return (
    <section
      id={SECTION_IDS.howItWorks}
      className="scroll-mt-6 bg-background px-4 py-24 sm:px-8 lg:px-14 2xl:px-20"
      aria-labelledby="como-funciona-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <Reveal className="mx-auto max-w-2xl text-center 2xl:max-w-3xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#2D5A47]">
            Como funciona
          </p>
          <h2
            id="como-funciona-heading"
            className="font-heading mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-[2.1rem] sm:leading-snug 2xl:text-5xl"
          >
            Organizar tu viaje puede ser asi de simple
          </h2>
        </Reveal>

        <ol className="mt-20 grid list-none gap-10 py-2 md:mt-24 md:grid-cols-3 md:items-stretch md:gap-6 lg:gap-8 2xl:gap-10">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.title} className="h-full min-h-0">
                <Reveal
                  delay={index * 0.09}
                  className="block h-full min-h-0 w-full"
                >
                  <div
                    className={cn(
                      "group relative z-0 flex min-h-0 w-full flex-col rounded-2xl bg-card/50 px-8 pb-9 pt-9 md:h-full",
                      "shadow-sm ring-1 ring-[#2D5A47]/[0.08]",
                      interactiveCardHover,
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2D5A47]">
                        Paso {index + 1}
                      </span>
                      <div
                        className={cn(
                          "flex size-10 shrink-0 items-center justify-center rounded-full",
                          "bg-[#2D5A47]/10 text-[#2D5A47]",
                        )}
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
