"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  HERO_IMAGE,
  HERO_VIDEO,
  HERO_VIDEO_PLAYBACK_RATE,
  IMAGE_QUALITY_MAX,
} from "@/lib/constants";
export function HeroBackground() {
  const reduceMotion = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const markReady = useCallback(() => {
    setVideoReady(true);
  }, []);

  const applyPlaybackRate = useCallback((el: HTMLVideoElement) => {
    el.playbackRate = HERO_VIDEO_PLAYBACK_RATE;
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (v && v.readyState >= 3) markReady();
  }, [markReady]);

  useEffect(() => {
    const v = videoRef.current;
    if (v) applyPlaybackRate(v);
  }, [applyPlaybackRate]);

  if (reduceMotion || videoFailed) {
    return (
      <div className="absolute inset-0 z-0">
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          quality={IMAGE_QUALITY_MAX}
          sizes="100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      className={`absolute inset-0 z-0 size-full object-cover transition-opacity duration-700 ease-out ${videoReady ? "opacity-100" : "opacity-0"}`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={HERO_IMAGE.src}
      aria-hidden
      onLoadedMetadata={(e) => applyPlaybackRate(e.currentTarget)}
      onCanPlay={markReady}
      onLoadedData={markReady}
      onPlaying={markReady}
      onError={() => setVideoFailed(true)}
    >
      <source src={HERO_VIDEO.src} type="video/mp4" />
    </video>
  );
}
