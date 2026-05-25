import { Reveal } from "@/components/motion/reveal";
import { SECTION_IDS, TESTIMONIALS } from "@/lib/constants";

export function Testimonials() {
  return (
    <section
      id={SECTION_IDS.testimonials}
      className="scroll-mt-24 bg-background px-4 py-12 sm:px-8 lg:px-14 2xl:px-20"
      aria-labelledby="testimonios-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <Reveal className="max-w-2xl 2xl:max-w-3xl">
          <h2
            id="testimonios-heading"
            className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-[2.1rem] sm:leading-snug 2xl:text-5xl"
          >
            Quienes ya viajaron con nosotros
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground 2xl:max-w-2xl 2xl:text-lg">
            Llegaron desde Instagram y cerraron auto, hotel y excursiones por
            WhatsApp.
          </p>
        </Reveal>

        <ul className="mt-8 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:gap-10 2xl:gap-12">
          {TESTIMONIALS.map((t, index) => (
            <li key={t.name}>
              <Reveal delay={index * 0.06}>
                <article className="flex h-full flex-col rounded-2xl bg-card/60 px-6 py-7 shadow-sm ring-1 ring-brand-forest/10 sm:px-8 sm:py-9">
                  <p className="text-sm text-muted-foreground">{t.highlight}</p>
                  <h3 className="mt-3 font-heading text-lg font-semibold tracking-tight text-foreground 2xl:text-xl">
                    {t.name}
                  </h3>
                  <p className="sr-only">Opinión de {t.name}</p>
                  <blockquote className="mt-4 flex-1 text-[0.95rem] leading-[1.75] text-muted-foreground 2xl:text-[1.05rem]">
                    {t.quote}
                  </blockquote>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
