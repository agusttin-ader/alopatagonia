import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { SECTION_IDS, SERVICES } from "@/lib/constants";

export function Services() {
  return (
    <section
      id={SECTION_IDS.services}
      className="scroll-mt-24 bg-background px-4 py-12 sm:px-8 lg:px-14 2xl:px-20"
      aria-labelledby="servicios-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <Reveal className="max-w-2xl 2xl:max-w-3xl">
          <h2
            id="servicios-heading"
            className="font-heading text-3xl font-medium tracking-tight text-foreground sm:text-4xl 2xl:text-5xl"
          >
            Qué resolvemos por vos
          </h2>
          <p className="mt-4 text-lg text-muted-foreground 2xl:text-xl">
            En lugar de coordinar proveedores por separado, centralizás todo en
            un solo equipo desde el primer mensaje.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-5 sm:mt-14 sm:grid-cols-2 xl:grid-cols-4 2xl:gap-7">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={index * 0.06}>
                <Card className="h-full border-border/80 bg-card/80 shadow-sm">
                  <CardHeader className="gap-3">
                    <div
                      className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary"
                      aria-hidden
                    >
                      <Icon className="size-[1.15rem]" strokeWidth={1.75} />
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
