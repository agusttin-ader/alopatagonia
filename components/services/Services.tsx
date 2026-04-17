import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { SECTION_IDS, SERVICES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Services() {
  return (
    <section
      id={SECTION_IDS.services}
      className="scroll-mt-6 bg-background px-6 py-20 sm:px-10 lg:px-16"
      aria-labelledby="servicios-heading"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Qué hacemos
          </p>
          <h2
            id="servicios-heading"
            className="font-heading mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl"
          >
            Todo lo que necesitás para tu viaje
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            El mismo esquema que ves en nuestro día a día: alojamiento, ruedas o
            transfer, excursiones y un solo interlocutor para armar el viaje
            completo.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={index * 0.06}>
                <Card
                  className={cn(
                    "h-full border-border/80 bg-card/80 shadow-sm backdrop-blur-sm transition-all duration-300",
                    "hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10",
                  )}
                >
                  <CardHeader className="gap-3">
                    <div
                      className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary"
                      aria-hidden
                    >
                      <Icon className="size-5" strokeWidth={1.75} />
                    </div>
                    <CardTitle className="font-heading text-lg">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
