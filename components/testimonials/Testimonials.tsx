import { Reveal } from "@/components/motion/reveal";
import { SECTION_IDS, TESTIMONIALS } from "@/lib/constants";
import { cn, interactiveCardHover } from "@/lib/utils";

export function Testimonials() {
  return (
    <section
      id={SECTION_IDS.testimonials}
      className="scroll-mt-6 bg-background px-4 py-24 sm:px-8 lg:px-14 2xl:px-20"
      aria-labelledby="testimonios-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <Reveal className="max-w-2xl 2xl:max-w-3xl">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#2D5A47]">
            Prueba social
          </p>
          <h2
            id="testimonios-heading"
            className="font-heading mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-[2.1rem] sm:leading-snug 2xl:text-5xl"
          >
            Viajeros que ya organizaron su Patagonia con nosotros
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground 2xl:max-w-2xl 2xl:text-lg">
            Experiencias reales de personas que llegaron desde Instagram y
            resolvieron su viaje por WhatsApp.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:gap-10 2xl:gap-12">
          {TESTIMONIALS.map((t, index) => (
            <li key={t.name}>
              <Reveal delay={index * 0.06}>
                <article
                  className={cn(
                    "group relative flex h-full flex-col rounded-2xl bg-card/60 px-8 py-9",
                    "shadow-sm ring-1 ring-[#2D5A47]/[0.08]",
                    interactiveCardHover,
                  )}
                >
                  <span
                    className="pointer-events-none absolute left-7 top-7 font-heading text-5xl font-light leading-none text-[#2D5A47]/[0.12] select-none"
                    aria-hidden
                  >
                    “
                  </span>
                  <p className="relative text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#2D5A47]/80">
                    {t.highlight}
                  </p>
                  <h3 className="relative mt-5 font-heading text-lg font-semibold tracking-tight text-foreground 2xl:text-xl">
                    {t.name}
                  </h3>
                  <p className="sr-only">Opinión de {t.name}</p>
                  <blockquote className="relative mt-4 flex-1 text-[0.95rem] leading-[1.75] text-muted-foreground 2xl:text-[1.05rem]">
                    {t.quote}
                  </blockquote>
                  <div
                    className="relative mt-8 h-px w-12 bg-[#2D5A47]/25"
                    aria-hidden
                  />
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
