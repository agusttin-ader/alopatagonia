"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { HERO_IMAGE, HERO_VIDEO } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Video de fondo con estado de carga: sin poster ni imagen duplicada hasta que reproduzca.
 * Si falla el video o hay prefers-reduced-motion, se usa la imagen estática.
 */
export function HeroBackground() {
  const reduceMotion = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const markReady = useCallback(() => {
    setVideoReady(true);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (v && v.readyState >= 3) markReady();
  }, [markReady]);

  if (reduceMotion || videoFailed) {
    return (
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <>
      <video
        ref={videoRef}
        className={cn(
          "absolute inset-0 z-0 size-full object-cover transition-opacity duration-700 ease-out",
          videoReady ? "opacity-100" : "opacity-0",
        )}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        onCanPlay={markReady}
        onLoadedData={markReady}
        onPlaying={markReady}
        onError={() => setVideoFailed(true)}
      >
        <source src={HERO_VIDEO.src} type="video/mp4" />
      </video>

      {!videoReady && (
        <div
          className="absolute inset-0 z-[3] flex flex-col items-center justify-center gap-5 bg-[#1a2f2a] bg-[radial-gradient(ellipse_at_50%_35%,rgba(47,93,80,0.35)_0%,transparent_55%)]"
          aria-busy="true"
          aria-live="polite"
        >
          <span className="sr-only">Cargando video del hero</span>
          <div className="relative size-[52px]" aria-hidden>
            <div className="absolute inset-0 rounded-full border-2 border-[#dce8e3]/25" />
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[#faf9f6] border-r-[#2f5d50]" />
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#faf9f6]/85">
            Cargando
          </p>
        </div>
      )}
    </>
  );
}
