"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { GALLERY_IMAGES, IMAGE_QUALITY_MAX, SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type DestinationEditorialItem = {
  id: string;
  name: string;
  region: string;
  description: string;
  imageIndexes: [number, number, number, number];
};

const DESTINATION_EDITORIAL_ITEMS: DestinationEditorialItem[] = [
  {
    id: "bariloche",
    name: "Bariloche",
    region: "San Carlos de Bariloche - Rio Negro",
    description:
      "Bosques, lagos y rutas panoramicas para combinar alojamiento, paseos y montaña en una sola base.",
    imageIndexes: [0, 1, 4, 8],
  },
  {
    id: "ushuaia",
    name: "Ushuaia",
    region: "Tierra del Fuego · Fin del mundo",
    description:
      "Canales australes, montana y clima cambiante; ajustamos el itinerario para aprovechar cada ventana.",
    imageIndexes: [3, 6, 7, 10],
  },
  {
    id: "calafate",
    name: "El Calafate",
    region: "Santa Cruz",
    description:
      "Paisajes abiertos, hielo milenario y estancias para una experiencia intensa y bien planificada.",
    imageIndexes: [2, 5, 9, 10],
  },
  {
    id: "san-martin",
    name: "San Martin",
    region: "San Martin de los Andes · Neuquen",
    description:
      "Bosque andino, lago y montaña en un destino ideal para combinar relax, caminatas y ruta escenica.",
    imageIndexes: [1, 2, 8, 9],
  },
  {
    id: "madryn",
    name: "Madryn",
    region: "Chubut · Costa patagonica",
    description:
      "Fauna marina, playas extensas y excursiones icónicas para sumar naturaleza y mar a tu itinerario.",
    imageIndexes: [0, 4, 5, 9],
  },
];

export function Destinations() {
  const [activeDestinationId, setActiveDestinationId] = useState(
    DESTINATION_EDITORIAL_ITEMS[0].id,
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeDestination = useMemo(
    () =>
      DESTINATION_EDITORIAL_ITEMS.find((item) => item.id === activeDestinationId) ??
      DESTINATION_EDITORIAL_ITEMS[0],
    [activeDestinationId],
  );

  const activeImages = useMemo(
    () =>
      activeDestination.imageIndexes.map((imageIndex) => GALLERY_IMAGES[imageIndex]),
    [activeDestination],
  );

  const activeLightboxImage =
    lightboxIndex !== null ? activeImages[lightboxIndex] : null;

  useEffect(() => {
    setLightboxIndex(null);
  }, [activeDestinationId]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxIndex(null);
      } else if (event.key === "ArrowLeft") {
        setLightboxIndex((current) => {
          if (current === null) return current;
          return current === 0 ? activeImages.length - 1 : current - 1;
        });
      } else if (event.key === "ArrowRight") {
        setLightboxIndex((current) => {
          if (current === null) return current;
          return current === activeImages.length - 1 ? 0 : current + 1;
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxIndex, activeImages.length]);

  return (
    <section
      id={SECTION_IDS.destinations}
      className="scroll-mt-24 bg-background px-4 py-14 sm:px-8 sm:py-20 lg:px-14 2xl:px-20"
      aria-labelledby="destinos-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <Reveal className="max-w-3xl 2xl:max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Destinos
          </p>
          <h2
            id="destinos-heading"
            className="font-heading mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl 2xl:text-5xl"
          >
            Elegi el destino y mira su universo visual
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground 2xl:text-xl">
            Una seleccion editorial para que compares estilos de viaje y
            decidamos juntos la mejor ruta para vos.
          </p>
        </Reveal>

        <div className="mt-9 grid gap-8 lg:mt-12 lg:grid-cols-[minmax(260px,0.9fr)_1.1fr] lg:items-start 2xl:gap-12">
          <Reveal className="lg:hidden">
            <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {DESTINATION_EDITORIAL_ITEMS.map((item) => {
                const isActive = item.id === activeDestination.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActiveDestinationId(item.id)}
                      aria-pressed={isActive}
                      className={cn(
                        "group h-full w-full rounded-2xl border px-4 py-3 text-left transition",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55 focus-visible:ring-offset-2",
                        isActive
                          ? "border-black/18 bg-black/[0.03]"
                          : "border-border/65 bg-card/70",
                      )}
                    >
                      <span
                        className={cn(
                          "font-heading block text-[clamp(1.5rem,8vw,2.2rem)] font-semibold uppercase leading-[0.9] tracking-[-0.02em]",
                          isActive ? "text-black" : "text-black/58",
                        )}
                      >
                        {item.name}
                      </span>
                      <span
                        className={cn(
                          "mt-1.5 block text-[0.62rem] font-semibold uppercase tracking-[0.16em]",
                          isActive ? "text-black/70" : "text-black/48",
                        )}
                      >
                        {item.region}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal className="lg:sticky lg:top-28">
            <ul className="hidden space-y-2 lg:block">
              {DESTINATION_EDITORIAL_ITEMS.map((item) => {
                const isActive = item.id === activeDestination.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActiveDestinationId(item.id)}
                      aria-pressed={isActive}
                      className={cn(
                        "group relative w-full text-left transition",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55 focus-visible:ring-offset-4",
                        "rounded-xl px-1 py-2",
                      )}
                    >
                      <span
                        className={cn(
                          "font-heading block text-[clamp(2rem,6.2vw,5.2rem)] font-semibold uppercase leading-[0.88] tracking-[-0.02em] transition-colors",
                          isActive
                            ? "text-black"
                            : "text-black/32 group-hover:text-black/60",
                        )}
                      >
                        {item.name}
                      </span>
                      <span
                        className={cn(
                          "mt-1 block text-xs font-semibold uppercase tracking-[0.18em] transition-colors",
                          isActive
                            ? "text-black/70"
                            : "text-black/35 group-hover:text-black/55",
                        )}
                      >
                        {item.region}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDestination.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {activeImages.map((image, index) => (
                    <motion.button
                      type="button"
                      key={`${activeDestination.id}-${image.src}`}
                      onClick={() => setLightboxIndex(index)}
                      aria-label={`Expandir imagen de ${activeDestination.name}`}
                      initial={{ opacity: 0, scale: 0.985 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.32,
                        delay: 0.04 * index,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-muted shadow-[0_16px_30px_-20px_rgba(15,23,42,0.32)] transition-transform hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55 focus-visible:ring-offset-2 sm:aspect-[4/3]"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        quality={IMAGE_QUALITY_MAX}
                        className="object-cover"
                        sizes="(min-width: 1280px) 28vw, (min-width: 1024px) 36vw, (min-width: 640px) 50vw, 100vw"
                        loading="lazy"
                      />
                    </motion.button>
                  ))}
                </div>

                <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {activeDestination.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {activeLightboxImage ? (
          <motion.div
            className="fixed inset-0 z-[1450] flex items-center justify-center bg-black/88 p-3"
            role="dialog"
            aria-modal="true"
            aria-label={`Vista ampliada de ${activeDestination.name}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <button
              type="button"
              className="absolute inset-0"
              onClick={() => setLightboxIndex(null)}
              aria-label="Cerrar vista ampliada"
            />

            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="absolute right-[max(0.75rem,env(safe-area-inset-right))] top-[max(0.75rem,env(safe-area-inset-top))] z-[2] inline-flex size-11 items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Cerrar"
            >
              <X className="size-5" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setLightboxIndex((current) => {
                  if (current === null) return current;
                  return current === 0 ? activeImages.length - 1 : current - 1;
                });
              }}
              className="absolute left-[max(0.45rem,env(safe-area-inset-left))] top-1/2 z-[2] inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:left-4"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="size-6" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setLightboxIndex((current) => {
                  if (current === null) return current;
                  return current === activeImages.length - 1 ? 0 : current + 1;
                });
              }}
              className="absolute right-[max(0.45rem,env(safe-area-inset-right))] top-1/2 z-[2] inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:right-4"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="size-6" />
            </button>

            <motion.div
              key={activeLightboxImage.src}
              className="relative z-[1] max-h-[90vh] max-w-[92vw]"
              initial={{ opacity: 0, scale: 0.985, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.985, y: 8 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={activeLightboxImage.src}
                alt={activeLightboxImage.alt}
                width={activeLightboxImage.width}
                height={activeLightboxImage.height}
                quality={IMAGE_QUALITY_MAX}
                className="max-h-[90vh] w-auto max-w-[92vw] rounded-2xl object-contain"
                sizes="(min-width: 1280px) 1200px, 95vw"
                priority
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
