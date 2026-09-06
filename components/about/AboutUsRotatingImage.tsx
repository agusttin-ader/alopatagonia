"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { AppImage } from "@/components/media/AppImage";
import { ABOUT_US_COPY } from "@/lib/about-pages";
import { commitAboutImageIndex, peekAboutImageIndex } from "@/lib/about-us-images";
import { IMAGE_SIZES } from "@/lib/image-config";

/** Fondo a pantalla completa — rota la foto en cada visita. */
export function AboutUsRotatingBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);

  useLayoutEffect(() => {
    const next = peekAboutImageIndex();
    commitAboutImageIndex(next);
    setIndex(next);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const image = ABOUT_US_COPY.images[index];

  return (
    <div ref={ref} className="absolute inset-0 z-0 bg-[#121508]" aria-hidden>
      {inView ? (
        <AppImage
          key={image.src}
          src={image.src}
          alt=""
          fill
          withBlur={false}
          qualityPreset="hero"
          className="object-cover"
          sizes={IMAGE_SIZES.aboutUsBackground}
        />
      ) : null}
    </div>
  );
}
