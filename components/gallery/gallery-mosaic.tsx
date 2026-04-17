"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Reveal } from "@/components/motion/reveal";
import { IMAGE_QUALITY_MAX, type GalleryImage } from "@/lib/constants";
import { cn } from "@/lib/utils";

const layouts = [
  "sm:col-span-2 sm:row-span-2",
  "",
  "",
  "sm:col-span-2",
  "",
  "sm:row-span-2",
  "",
  "sm:col-span-2",
  "",
  "sm:col-span-2",
  "",
  "",
] as const;

type GalleryMosaicProps = {
  images: GalleryImage[];
};

export function GalleryMosaic({ images }: GalleryMosaicProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  const close = useCallback(() => setOpenIndex(null), []);

  const goPrev = useCallback(() => {
    setOpenIndex((i) => {
      if (i === null) return i;
      return i <= 0 ? images.length - 1 : i - 1;
    });
  }, [images.length]);

  const goNext = useCallback(() => {
    setOpenIndex((i) => {
      if (i === null) return i;
      return i >= images.length - 1 ? 0 : i + 1;
    });
  }, [images.length]);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, close, goPrev, goNext]);

  useEffect(() => {
    if (openIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [openIndex]);

  useEffect(() => {
    if (openIndex !== null && !wasOpenRef.current) {
      closeBtnRef.current?.focus();
    }
    wasOpenRef.current = openIndex !== null;
  }, [openIndex]);

  const active = openIndex !== null ? images[openIndex] : null;

  const lightbox =
    portalTarget && (
      <AnimatePresence>
        {active && (
          <motion.div
            key="gallery-lightbox"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Vista ampliada de la galería"
            tabIndex={-1}
            className="fixed inset-0 z-[200]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.button
              type="button"
              className="absolute inset-0 z-0 bg-black"
              aria-hidden
              tabIndex={-1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
            />
            <div className="absolute inset-0 z-[1] flex min-h-0 items-center justify-center px-3 py-3 sm:px-6">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={active.src}
                  className="flex w-full max-w-full items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Image
                    src={active.src}
                    alt={active.alt}
                    width={active.width}
                    height={active.height}
                    quality={IMAGE_QUALITY_MAX}
                    className="max-h-[100dvh] w-auto max-w-full object-contain pointer-events-none"
                    sizes="100vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="absolute right-3 top-3 z-[2] flex size-11 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70 sm:right-5 sm:top-5 sm:size-12"
              aria-label="Cerrar galería"
            >
              <X className="size-5 sm:size-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-2 top-1/2 z-[2] flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70 sm:left-4 sm:size-12"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="size-6 sm:size-7" aria-hidden />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-2 top-1/2 z-[2] flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition hover:bg-black/70 sm:right-4 sm:size-12"
              aria-label="Imagen siguiente"
            >
              <ChevronRight className="size-6 sm:size-7" aria-hidden />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    );

  return (
    <>
      <div className="gallery-dense mt-14 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-3 md:gap-4 lg:auto-rows-[220px]">
        {images.map((img, index) => (
          <Reveal
            key={img.src}
            delay={(index % 4) * 0.05}
            className={cn("h-full", layouts[index] ?? "")}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className={cn(
                "group relative block h-full min-h-[180px] w-full overflow-hidden rounded-xl bg-muted text-left ring-1 ring-black/5 sm:min-h-[200px] lg:min-h-[220px]",
                "cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              )}
              aria-haspopup="dialog"
              aria-label={`Ampliar: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt=""
                fill
                quality={IMAGE_QUALITY_MAX}
                sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, (max-width: 1920px) 33vw, min(40vw, 1600px)"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                loading={index < 3 ? "eager" : "lazy"}
              />
            </button>
          </Reveal>
        ))}
      </div>
      {lightbox && createPortal(lightbox, portalTarget)}
    </>
  );
}
