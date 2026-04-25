import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { SECTION_IDS, SERVICES } from "@/lib/constants";
import { cn, interactiveCardHover } from "@/lib/utils";

export function Services() {
  return (
    <section
      id={SECTION_IDS.services}
      className="scroll-mt-6 bg-background px-4 py-20 sm:px-8 lg:px-14 2xl:px-20"
      aria-labelledby="servicios-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <Reveal className="max-w-2xl 2xl:max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Beneficios para tu viaje
          </p>
          <h2
            id="servicios-heading"
            className="font-heading mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl 2xl:text-5xl"
          >
            Te resolvemos lo clave para que viajes con tranquilidad
          </h2>
          <p className="mt-4 text-lg text-muted-foreground 2xl:text-xl">
            En lugar de que coordines proveedores por separado, centralizás todo
            en un solo equipo y ahorrás tiempo desde el primer mensaje.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4 2xl:gap-7">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={index * 0.06}>
                <Card
                  className={cn(
                    "h-full border-border/80 bg-card/80 shadow-sm backdrop-blur-sm",
                    interactiveCardHover,
                  )}
                >
                  <CardHeader className="gap-3">
                    <div
                      className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary"
                      aria-hidden
                    >
                      <Icon className="size-5" strokeWidth={1.75} />
                    </div>
                    <CardTitle className="font-heading text-lg 2xl:text-xl">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-base leading-relaxed 2xl:text-[1.05rem]">
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
