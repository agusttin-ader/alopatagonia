import { MapPin } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { DESTINATIONS, SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Destinations() {
  return (
    <section
      id={SECTION_IDS.destinations}
      className="scroll-mt-6 bg-background px-6 py-20 sm:px-10 lg:px-16"
      aria-labelledby="destinos-heading"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Destinos
          </p>
          <h2
            id="destinos-heading"
            className="font-heading mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl"
          >
            De los lagos al fin del mundo
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Trabajamos itinerarios en los puntos más buscados del sur. Esta es
            una selección referencial para la demo; el plan final se adapta a
            tus fechas y presupuesto.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {DESTINATIONS.map((d, index) => (
            <Reveal key={d.name} delay={index * 0.06}>
              <article
                className={cn(
                  "group relative h-full rounded-2xl border border-border/90 bg-card/60 p-6 shadow-sm",
                  "transition-all duration-300 hover:border-primary/35 hover:shadow-md hover:shadow-primary/5",
                )}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                    aria-hidden
                  >
                    <MapPin className="size-5" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {d.region}
                    </p>
                    <h3 className="font-heading mt-1 text-xl font-medium text-foreground">
                      {d.name}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {d.description}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
