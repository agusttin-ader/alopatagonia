"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { GALLERY_IMAGES, IMAGE_QUALITY_GALLERY, IMAGE_QUALITY_LIGHTBOX, IMAGE_SIZES, SECTION_IDS } from "@/lib/constants";
import { useCoarseMobile } from "@/lib/use-coarse-mobile";
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
      "Bosques, lagos y circuitos. Base ideal para combinar montaña y ruta en auto.",
    imageIndexes: [0, 1, 4, 8],
  },
  {
    id: "ushuaia",
    name: "Ushuaia",
    region: "Tierra del Fuego · Fin del mundo",
    description:
      "Canal Beagle, montaña y clima cambiante. Ajustamos el plan según la ventana del día.",
    imageIndexes: [3, 6, 7, 10],
  },
  {
    id: "calafate",
    name: "El Calafate",
    region: "Santa Cruz",
    description:
      "Glaciares que se escuchan antes de verse. Hielo, estepa y excursiones bien marcadas.",
    imageIndexes: [2, 5, 9, 10],
  },
  {
    id: "san-martin",
    name: "San Martin",
    region: "San Martin de los Andes · Neuquen",
    description:
      "Bosque andino y rutas junto al lago. Relax, caminatas y ruta escénica.",
    imageIndexes: [1, 2, 8, 9],
  },
  {
    id: "madryn",
    name: "Madryn",
    region: "Chubut · Costa patagonica",
    description:
      "Mar patagónico y fauna en su hábitat. Ballenas, costa y excursiones de día.",
    imageIndexes: [0, 4, 5, 9],
  },
  {
    id: "villa-la-angostura",
    name: "Villa La Angostura",
    region: "Neuquen",
    description:
      "Reserva, pueblo chico y lagos cristalinos. Ritmo tranquilo y muy fotografiable.",
    imageIndexes: [0, 1, 4, 6],
  },
  {
    id: "el-bolson",
    name: "El Bolson",
    region: "Rio Negro",
    description:
      "Montaña alternativa y feria artesanal. Valle, senderos y pausas con calma.",
    imageIndexes: [2, 5, 8, 9],
  },
  {
    id: "esquel",
    name: "Esquel",
    region: "Chubut",
    description:
      "Estepa, bosque y el Tren Patagónico. Cordillera y paisajes auténticos del sur.",
    imageIndexes: [3, 6, 7, 10],
  },
  {
    id: "mendoza",
    name: "Mendoza",
    region: "Mendoza",
    description:
      "Viñedos al pie de la cordillera. Buena extensión si querés sumar montaña y bodegas.",
    imageIndexes: [1, 3, 8, 10],
  },
];

const DESTINATION_NAME_MOTION = {
  active: { scale: 1.06 },
  idle: { scale: 1 },
};

const MOBILE_DESTINATIONS_MQ = "(max-width: 1023px)";
const MOBILE_PANEL_MS = 520;

function DestinationName({
  name,
  isActive,
  className,
  disableScale = false,
}: {
  name: string;
  isActive: boolean;
  className?: string;
  disableScale?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  if (disableScale || reduceMotion) {
    return <span className={cn("inline-block", className)}>{name}</span>;
  }

  return (
    <motion.span
      className={cn("inline-block origin-left", className)}
      initial={false}
      animate={isActive ? DESTINATION_NAME_MOTION.active : DESTINATION_NAME_MOTION.idle}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
    >
      {name}
    </motion.span>
  );
}

function MobileDestinationPanel({
  isActive,
  itemId,
  onExpandEnd,
  children,
}: {
  isActive: boolean;
  itemId: string;
  onExpandEnd?: () => void;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const [expanded, setExpanded] = useState(false);
  const onExpandEndRef = useRef(onExpandEnd);
  onExpandEndRef.current = onExpandEnd;

  useEffect(() => {
    if (!isActive) {
      setExpanded(false);
      return;
    }

    if (reduceMotion) {
      setExpanded(true);
      onExpandEndRef.current?.();
      return;
    }

    setExpanded(false);
    const frameId = window.requestAnimationFrame(() => {
      setExpanded(true);
    });
    return () => window.cancelAnimationFrame(frameId);
  }, [isActive, itemId, reduceMotion]);

  if (!isActive) return null;

  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows,opacity] ease-[cubic-bezier(0.22,0.03,0.26,1)] motion-reduce:transition-none",
        expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
      )}
      style={{ transitionDuration: reduceMotion ? "0ms" : `${MOBILE_PANEL_MS}ms` }}
      onTransitionEnd={(event) => {
        if (
          event.propertyName === "grid-template-rows" &&
          expanded &&
          event.currentTarget === event.target
        ) {
          onExpandEndRef.current?.();
        }
      }}
    >
      <div className="min-h-0 overflow-hidden">
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
}

function DestinationGallery({
  destination,
  images,
  onImageClick,
  instant = false,
}: {
  destination: DestinationEditorialItem;
  images: (typeof GALLERY_IMAGES)[number][];
  onImageClick: (index: number) => void;
  instant?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const isCoarseMobile = useCoarseMobile();
  const useStaticTiles = instant || isCoarseMobile || reduceMotion;

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {images.map((image, index) => {
          const tileClassName =
            "relative aspect-[5/4] overflow-hidden rounded-2xl bg-muted shadow-[0_16px_30px_-20px_rgba(15,23,42,0.32)] transition-transform hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55 focus-visible:ring-offset-2 sm:aspect-[4/3]";

          if (useStaticTiles) {
            return (
              <button
                type="button"
                key={`${destination.id}-${image.src}`}
                onClick={() => onImageClick(index)}
                aria-label={`Expandir imagen de ${destination.name}`}
                className={tileClassName}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  quality={IMAGE_QUALITY_GALLERY}
                  className="object-cover"
                  sizes={IMAGE_SIZES.galleryTile}
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : undefined}
                />
              </button>
            );
          }

          return (
            <motion.button
              type="button"
              key={`${destination.id}-${image.src}`}
              onClick={() => onImageClick(index)}
              aria-label={`Expandir imagen de ${destination.name}`}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.32,
                delay: 0.04 * index,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={tileClassName}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                quality={IMAGE_QUALITY_GALLERY}
                className="object-cover"
                sizes={IMAGE_SIZES.galleryTile}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </motion.button>
          );
        })}
      </div>
      <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:mt-5 sm:text-lg">
        {destination.description}
      </p>
    </>
  );
}

export function Destinations() {
  const [activeDestinationId, setActiveDestinationId] = useState(
    DESTINATION_EDITORIAL_ITEMS[0].id,
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const mobileItemRefs = useRef(new Map<string, HTMLLIElement>());

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

  const scrollActiveDestinationIntoView = useCallback(
    (destinationId: string) => {
      if (typeof window === "undefined") return;
      if (!window.matchMedia(MOBILE_DESTINATIONS_MQ).matches) return;

      const activeItem = mobileItemRefs.current.get(destinationId);
      if (!activeItem) return;

      activeItem.scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "nearest",
      });
    },
    [],
  );

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
      className="scroll-mt-24 bg-background px-4 py-12 sm:px-8 sm:py-20 lg:px-14 2xl:px-20"
      aria-labelledby="destinos-heading"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[90rem]">
        <Reveal className="max-w-3xl 2xl:max-w-4xl">
          <h2
            id="destinos-heading"
            className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl 2xl:text-5xl"
          >
            Destinos
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground 2xl:text-xl">
            Elegí zona y mirá fotos reales de cada lugar. Después lo cerramos
            juntos por WhatsApp.
          </p>
        </Reveal>

        <div className="mt-7 grid gap-6 lg:mt-12 lg:grid-cols-[minmax(260px,0.9fr)_1.1fr] lg:items-start 2xl:gap-12">
          <div className="lg:hidden">
            <ul className="flex flex-col gap-2.5">
              {DESTINATION_EDITORIAL_ITEMS.map((item) => {
                const isActive = item.id === activeDestination.id;
                const itemImages = item.imageIndexes.map(
                  (imageIndex) => GALLERY_IMAGES[imageIndex],
                );

                return (
                  <li
                    key={item.id}
                    ref={(node) => {
                      if (node) mobileItemRefs.current.set(item.id, node);
                      else mobileItemRefs.current.delete(item.id);
                    }}
                    className={cn(isActive && "scroll-mt-[18vh]")}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveDestinationId(item.id)}
                      aria-pressed={isActive}
                      aria-expanded={isActive}
                      className={cn(
                        "group w-full rounded-2xl border px-4 py-3 text-left transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55 focus-visible:ring-offset-2",
                        isActive
                          ? "border-black/18 bg-black/[0.03]"
                          : "border-border/65 bg-card/70",
                      )}
                    >
                      <DestinationName
                        name={item.name}
                        isActive={isActive}
                        disableScale
                        className={cn(
                          "font-heading block text-[clamp(1.5rem,8vw,2.2rem)] font-semibold uppercase leading-[0.9] tracking-[-0.02em]",
                          isActive ? "text-black" : "text-black/58",
                        )}
                      />
                      <span
                        className={cn(
                          "mt-1.5 block text-[0.62rem] font-medium text-muted-foreground",
                          isActive ? "text-black/70" : "text-black/48",
                        )}
                      >
                        {item.region}
                      </span>
                    </button>

                    <MobileDestinationPanel
                      isActive={isActive}
                      itemId={item.id}
                      onExpandEnd={() => scrollActiveDestinationIntoView(item.id)}
                    >
                      <DestinationGallery
                        destination={item}
                        images={itemImages}
                        onImageClick={setLightboxIndex}
                        instant
                      />
                    </MobileDestinationPanel>
                  </li>
                );
              })}
            </ul>
          </div>

          <Reveal>
            <motion.ul layout className="hidden space-y-2 lg:block">
              {DESTINATION_EDITORIAL_ITEMS.map((item) => {
                const isActive = item.id === activeDestination.id;
                return (
                  <motion.li key={item.id} layout>
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
                      <DestinationName
                        name={item.name}
                        isActive={isActive}
                        className={cn(
                          "font-heading block text-[clamp(2rem,6.2vw,5.2rem)] font-semibold uppercase leading-[0.88] tracking-[-0.02em] transition-colors",
                          isActive
                            ? "text-black"
                            : "text-black/32 group-hover:text-black/60",
                        )}
                      />
                      <span
                        className={cn(
                          "mt-1 block text-xs font-medium text-muted-foreground transition-colors",
                          isActive
                            ? "text-black/70"
                            : "text-black/35 group-hover:text-black/55",
                        )}
                      >
                        {item.region}
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>
          </Reveal>

          <Reveal className="hidden lg:sticky lg:block lg:top-28 lg:self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDestination.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                <DestinationGallery
                  destination={activeDestination}
                  images={activeImages}
                  onImageClick={setLightboxIndex}
                />
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
                quality={IMAGE_QUALITY_LIGHTBOX}
                className="max-h-[90vh] w-auto max-w-[92vw] rounded-2xl object-contain"
                sizes={IMAGE_SIZES.lightbox}
                priority
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
