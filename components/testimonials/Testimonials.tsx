import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Reveal } from "@/components/motion/reveal";
import { SECTION_IDS, TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <section
      id={SECTION_IDS.testimonials}
      className="scroll-mt-6 bg-secondary/30 px-6 py-20 sm:px-10 lg:px-16"
      aria-labelledby="testimonios-heading"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Testimonios
          </p>
          <h2
            id="testimonios-heading"
            className="font-heading mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl"
          >
            Historias de quienes ya la vivieron
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, index) => (
            <li key={t.name}>
              <Reveal delay={index * 0.07}>
                <Card className="h-full border-border/80 bg-card shadow-sm">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg">
                      {t.name}
                    </CardTitle>
                    <CardDescription className="sr-only">
                      Opinión de {t.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      “{t.quote}”
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
