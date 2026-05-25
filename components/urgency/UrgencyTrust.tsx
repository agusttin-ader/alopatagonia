import { CalendarRange, CarFront, MessageCircleMore } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SECTION_IDS } from "@/lib/constants";

const SIGNALS = [
  {
    title: "Enero a marzo se llena primero",
    description:
      "Autos y cabañas en Bariloche y el sur suelen agotarse con semanas de anticipación.",
    icon: CalendarRange,
  },
  {
    title: "Reservar antes abre más opciones",
    description:
      "Con fechas definidas podemos combinar mejor alojamiento, traslados y excursiones.",
    icon: CarFront,
  },
  {
    title: "Respondemos por WhatsApp",
    description:
      "Consultas y cambios en el mismo hilo — sin formularios ni demoras de días.",
    icon: MessageCircleMore,
  },
] as const;

export function UrgencyTrust() {
  return (
    <section
      id={SECTION_IDS.urgency}
      className="scroll-mt-24 border-y border-border/70 bg-secondary/30 px-4 py-12 sm:px-8 lg:px-14 2xl:px-20"
      aria-labelledby="urgencia-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <Reveal className="max-w-2xl 2xl:max-w-3xl">
          <h2
            id="urgencia-heading"
            className="font-heading text-3xl font-medium tracking-tight text-foreground sm:text-4xl 2xl:text-5xl"
          >
            Temporada alta en Patagonia
          </h2>
          <p className="mt-4 text-lg text-muted-foreground 2xl:text-xl">
            Datos útiles para elegir cuándo escribirnos y qué conviene reservar
            antes.
          </p>
        </Reveal>

        <ul className="mt-8 grid gap-6 md:grid-cols-3 2xl:gap-8">
          {SIGNALS.map((signal, index) => {
            const Icon = signal.icon;
            return (
              <li key={signal.title}>
                <Reveal
                  delay={index * 0.07}
                  className="h-full rounded-2xl border border-border/80 bg-card px-4 py-7 shadow-sm"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
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
