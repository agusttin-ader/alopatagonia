import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { EXPERIENCE_IMAGE, SECTION_IDS } from "@/lib/constants";

export function Experience() {
  return (
    <section
      id={SECTION_IDS.experience}
      className="scroll-mt-6 border-y border-border/70 bg-secondary/40 px-6 py-20 sm:px-10 lg:px-16"
      aria-labelledby="experiencia-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5">
          <Image
            src={EXPERIENCE_IMAGE.src}
            alt={EXPERIENCE_IMAGE.alt}
            width={EXPERIENCE_IMAGE.width}
            height={EXPERIENCE_IMAGE.height}
            className="size-full object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </Reveal>

        <div>
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
              Experiencia
            </p>
            <h2
              id="experiencia-heading"
              className="font-heading mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl"
            >
              La Patagonia en tu ritmo
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="mt-6 space-y-4 text-lg text-muted-foreground">
            <p>
              Desde una semana en Bariloche hasta la combinación Calafate–Ushuaia
              o la ruta de los glaciares: armamos el calendario según temporada,
              vuelos y lo que querés priorizar en cada etapa.
            </p>
            <p>
              Recomendaciones directas, reservas alineadas y respuesta por
              WhatsApp para que disfrutes el paisaje —no la logística.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
