"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import {
  GALLERY_IMAGES,
  IMAGE_QUALITY_MAX,
  SECTION_IDS,
} from "@/lib/constants";
import { cn, interactiveCardHover } from "@/lib/utils";

const CONTEXT_ITEMS = [
  {
    image: GALLERY_IMAGES[0],
    title: "Circuito escenico en Patagonia",
    context: "Definimos horarios y paradas para evitar picos y aprovechar la luz.",
  },
  {
    image: GALLERY_IMAGES[1],
    title: "Paisajes que valen cada kilometro",
    context: "Te proponemos rutas reales segun temporada y dias disponibles.",
  },
  {
    image: GALLERY_IMAGES[4],
    title: "Hospedaje en ubicacion clave",
    context: "Buscamos la mejor combinacion entre vista, acceso y presupuesto.",
  },
  {
    image: GALLERY_IMAGES[8],
    title: "Excursion bien coordinada",
    context: "Ajustamos cada salida a clima, energia del grupo y traslados.",
  },
  {
    image: GALLERY_IMAGES[6],
    title: "Ritmo tranquilo, experiencia completa",
    context: "Armamos el viaje para que disfrutes, no para correr de un punto a otro.",
  },
  {
    image: GALLERY_IMAGES[3],
    title: "Postales reales de Patagonia",
    context: "Todo con soporte por WhatsApp para resolver dudas en el momento.",
  },
] as const;

export function ContextGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [lightboxLoaded, setLightboxLoaded] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const activeItem = openIndex !== null ? CONTEXT_ITEMS[openIndex] : null;

  const closeLightbox = useCallback(() => {
    setOpenIndex(null);
    setLightboxLoaded(false);
  }, []);

  const showPrev = useCallback(() => {
    setLightboxLoaded(false);
    setOpenIndex((current) => {
      if (current === null) return current;
      return current <= 0 ? CONTEXT_ITEMS.length - 1 : current - 1;
    });
  }, []);

  const showNext = useCallback(() => {
    setLightboxLoaded(false);
    setOpenIndex((current) => {
      if (current === null) return current;
      return current >= CONTEXT_ITEMS.length - 1 ? 0 : current + 1;
    });
  }, []);

  useEffect(() => {
    if (openIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
      if (event.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button,[href],[tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (active === last || !active)) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex, closeLightbox, showPrev, showNext]);

  useEffect(() => {
    if (openIndex === null) return;
    closeButtonRef.current?.focus();
  }, [openIndex]);

  return (
    <section
      id={SECTION_IDS.gallery}
      className="scroll-mt-24 bg-secondary/20 px-4 py-20 sm:px-8 lg:px-14 2xl:px-20"
      aria-labelledby="context-gallery-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <Reveal className="max-w-3xl 2xl:max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Galeria con contexto
          </p>
          <h2
            id="context-gallery-heading"
            className="font-heading mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl 2xl:text-5xl"
          >
            Postales reales de la experiencia que podemos armar para vos
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground 2xl:text-xl">
            Cada imagen representa una parte del viaje: ruta, hospedaje,
            excursiones y acompanamiento para que disfrutes Patagonia con todo
            resuelto.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:gap-7">
          {CONTEXT_ITEMS.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05} className="h-full">
              <article
                className={cn(
                  "group h-full overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm",
                  interactiveCardHover,
                )}
              >
                <button
                  type="button"
                  onClick={() => {
                    setLightboxLoaded(false);
                    setOpenIndex(index);
                  }}
                  className="relative block aspect-[4/3] w-full overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 lg:cursor-zoom-in"
                  aria-label={`Expandir imagen: ${item.title}`}
                >
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    quality={IMAGE_QUALITY_MAX}
                    className="size-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    sizes="(min-width: 1280px) 380px, (min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                    loading={index < 1 ? "eager" : "lazy"}
                  />
                </button>
                <div className="space-y-2 px-5 py-5">
                  <h3 className="font-heading text-lg font-semibold leading-snug text-foreground 2xl:text-xl">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground 2xl:text-base">
                    {item.context}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10 text-center">
          <a
            href={`#${SECTION_IDS.planner}`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "inline-flex h-12 rounded-full px-8 text-base font-semibold 2xl:h-14 2xl:px-10 2xl:text-lg",
            )}
          >
            Quiero este tipo de viaje
          </a>
        </Reveal>
      </div>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            ref={dialogRef}
            className="fixed inset-0 z-[1400] flex items-center justify-center bg-black/88 p-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:p-6 lg:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`Vista ampliada: ${activeItem.title}`}
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              className="absolute inset-0 z-0"
              aria-label="Cerrar imagen ampliada"
              onClick={closeLightbox}
            />
            <button
              ref={closeButtonRef}
              type="button"
              className="absolute right-[max(0.75rem,env(safe-area-inset-right))] top-[max(0.75rem,env(safe-area-inset-top))] inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:right-6 sm:top-6"
              onClick={closeLightbox}
              aria-label="Cerrar imagen ampliada"
            >
              <X className="size-5" aria-hidden />
            </button>

            <button
              type="button"
              className="absolute left-[max(0.75rem,env(safe-area-inset-left))] top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:left-6"
              onClick={(event) => {
                event.stopPropagation();
                showPrev();
              }}
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>

            <button
              type="button"
              className="absolute right-[max(0.75rem,env(safe-area-inset-right))] top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:right-6"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>

            <motion.div
              className="relative z-[1] max-h-[86vh] max-w-[94vw] sm:max-h-[90vh] sm:max-w-[90vw]"
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, scale: 0.985, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.985, y: 8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={activeItem.image.src}
                alt={activeItem.image.alt}
                width={activeItem.image.width}
                height={activeItem.image.height}
                quality={IMAGE_QUALITY_MAX}
                className={cn(
                  "max-h-[86vh] w-auto max-w-[94vw] rounded-2xl bg-black/20 object-contain transition-opacity duration-200 sm:max-h-[90vh] sm:max-w-[90vw]",
                  lightboxLoaded ? "opacity-100" : "opacity-0",
                )}
                sizes="(min-width: 1600px) 1280px, (min-width: 1280px) 80vw, 100vw"
                priority
                onLoad={() => setLightboxLoaded(true)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
