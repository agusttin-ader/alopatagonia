import { Clock3, MessageCircleMore, TrendingUp } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SECTION_IDS } from "@/lib/constants";
import { cn, interactiveCardHover } from "@/lib/utils";

const SIGNALS = [
  {
    title: "Alta demanda en temporada",
    description:
      "Las mejores opciones de auto y hospedaje se ocupan rapido en fechas pico.",
    icon: TrendingUp,
  },
  {
    title: "Reserva con anticipacion",
    description:
      "Cuanto antes definimos tu plan, mas alternativas y mejores combinaciones tenes.",
    icon: Clock3,
  },
  {
    title: "Respuesta rapida por WhatsApp",
    description:
      "Te respondemos agil para que avances sin esperar dias entre consulta y propuesta.",
    icon: MessageCircleMore,
  },
] as const;

export function UrgencyTrust() {
  return (
    <section
      id={SECTION_IDS.urgency}
      className="scroll-mt-6 border-y border-border/70 bg-secondary/30 px-4 py-20 sm:px-8 lg:px-14 2xl:px-20"
      aria-labelledby="urgencia-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <Reveal className="max-w-2xl 2xl:max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Confianza y urgencia
          </p>
          <h2
            id="urgencia-heading"
            className="font-heading mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl 2xl:text-5xl"
          >
            Defini tu viaje antes de que se achiquen las opciones
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-6 md:grid-cols-3 2xl:gap-8">
          {SIGNALS.map((signal, index) => {
            const Icon = signal.icon;
            return (
              <li key={signal.title}>
                <Reveal
                  delay={index * 0.07}
                  className={cn(
                    "h-full rounded-2xl border border-border/80 bg-card px-4 py-7 shadow-sm",
                    interactiveCardHover,
                  )}
                >
                  <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-5" strokeWidth={1.8} aria-hidden />
                  </div>
                  <h3 className="font-heading mt-5 text-xl font-medium text-foreground 2xl:text-2xl">
                    {signal.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground 2xl:text-[1.05rem]">
                    {signal.description}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
