"use client";

import { useLayoutEffect, useState } from "react";

import { AppImage } from "@/components/media/AppImage";
import { ABOUT_US_COPY } from "@/lib/about-pages";
import { commitAboutImageIndex, peekAboutImageIndex } from "@/lib/about-us-images";
import { IMAGE_SIZES } from "@/lib/image-config";

/** Fondo a pantalla completa — rota la foto en cada visita. */
export function AboutUsRotatingBackground() {
  const [index, setIndex] = useState(0);

  useLayoutEffect(() => {
    const next = peekAboutImageIndex();
    commitAboutImageIndex(next);
    setIndex(next);
  }, []);

  const image = ABOUT_US_COPY.images[index];

  return (
    <div className="absolute inset-0 z-0 bg-[#121508]" aria-hidden>
      <AppImage
        key={image.src}
        src={image.src}
        alt=""
        fill
        loading="lazy"
        withBlur={false}
        loadingPulse={false}
        qualityPreset="detail"
        className="object-cover"
        sizes={IMAGE_SIZES.aboutUsBackground}
      />
    </div>
  );
}
