import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { EXPERIENCE_IMAGE, IMAGE_QUALITY_MAX, SECTION_IDS } from "@/lib/constants";
import { cn, interactiveCardHover } from "@/lib/utils";

export function Experience() {
  return (
    <section
      id={SECTION_IDS.experience}
      className="scroll-mt-6 border-y border-border/70 bg-secondary/40 px-4 py-20 sm:px-8 lg:px-14 2xl:px-20"
      aria-labelledby="experiencia-heading"
    >
      <div className="mx-auto grid max-w-7xl 2xl:max-w-[90rem] gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal
          className={cn(
            "relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5",
            interactiveCardHover,
          )}
        >
          <Image
            src={EXPERIENCE_IMAGE.src}
            alt={EXPERIENCE_IMAGE.alt}
            width={EXPERIENCE_IMAGE.width}
            height={EXPERIENCE_IMAGE.height}
            quality={IMAGE_QUALITY_MAX}
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
            className="font-heading mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl 2xl:text-5xl"
            >
              No es solo un viaje, es la experiencia completa
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="mt-6 space-y-4 text-lg text-muted-foreground 2xl:text-xl">
            <p>
              Desde una escapada romantica hasta un viaje familiar de varios
              destinos, diseniamos una experiencia equilibrada para que vivas
              Patagonia sin perder tiempo en logistica.
            </p>
            <p>
              Cada recomendacion esta pensada para que disfrutes paisajes,
              momentos y actividades memorables con la tranquilidad de tener todo
              coordinado por el mismo equipo.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
