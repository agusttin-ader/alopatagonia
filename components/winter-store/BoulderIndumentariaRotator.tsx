"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

import { BOULDER_INDUMENTARIA_IMAGES, type GalleryImage } from "@/lib/constants";
import { IMAGE_QUALITY, IMAGE_SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

type BoulderIndumentariaRotatorProps = {
  className?: string;
  images?: readonly GalleryImage[];
  sizes?: string;
  priority?: boolean;
  /** Segundos visibles por slide antes del crossfade. */
  slideSeconds?: number;
  /** Duración del crossfade entre slides. */
  fadeSeconds?: number;
};

export function BoulderIndumentariaRotator({
  className,
  images = BOULDER_INDUMENTARIA_IMAGES,
  sizes = IMAGE_SIZES.winterSection,
  priority = false,
  slideSeconds = 10,
  fadeSeconds = 1.75,
}: BoulderIndumentariaRotatorProps) {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const slides = images.length > 0 ? images : BOULDER_INDUMENTARIA_IMAGES;

  useEffect(() => {
    if (prefersReducedMotion || slides.length <= 1) return;

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, slideSeconds * 1000);

    return () => window.clearInterval(id);
  }, [prefersReducedMotion, slideSeconds, slides.length]);

  const activeIndex = prefersReducedMotion ? 0 : index;

  return (
    <div className={cn("relative size-full", className)}>
      {slides.map((image, i) => (
        <motion.div
          key={image.src}
          className="absolute inset-0"
          animate={{ opacity: i === activeIndex ? 1 : 0 }}
          transition={{
            duration: fadeSeconds,
            ease: [0.16, 1, 0.3, 1],
          }}
          aria-hidden={i !== activeIndex}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            quality={IMAGE_QUALITY}
            priority={priority && i === 0}
            className="object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
}
