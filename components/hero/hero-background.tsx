"use client";

import { AppImage } from "@/components/media/AppImage";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import {
  HERO_IMAGE,
  HERO_VIDEO,
  HERO_VIDEO_MOBILE,
  HERO_VIDEO_MOBILE_LITE,
  HERO_VIDEO_PLAYBACK_RATE,
  IMAGE_SIZES,
} from "@/lib/constants";
import { useCoarseMobile } from "@/lib/use-coarse-mobile";

export function HeroBackground() {
  const reduceMotion = useReducedMotion();
  const isCoarseMobile = useCoarseMobile();
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const markReady = useCallback(() => {
    setVideoReady(true);
  }, []);

  const applyPlaybackRate = useCallback((el: HTMLVideoElement) => {
    el.playbackRate = HERO_VIDEO_PLAYBACK_RATE;
  }, []);

  const startPlayback = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    const maybePlay = v.play();
    if (maybePlay?.catch) {
      maybePlay.catch(() => {});
    }
  }, []);

  useEffect(() => {
    startPlayback();
  }, [startPlayback, isCoarseMobile, videoFailed]);

  useLayoutEffect(() => {
    const onReveal = () => startPlayback();
    window.addEventListener("alo-site-intro-reveal", onReveal);
    if (window.__aloIntroReveal) {
      queueMicrotask(onReveal);
    }
    return () => window.removeEventListener("alo-site-intro-reveal", onReveal);
  }, [startPlayback]);

  if (reduceMotion || videoFailed) {
    return (
      <div className="absolute inset-0 z-0">
        <AppImage
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          qualityPreset="hero"
          sizes={IMAGE_SIZES.viewport}
          fetchPriority="high"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      className={`absolute inset-0 z-0 size-full object-cover transition-opacity duration-700 ease-out ${videoReady ? "opacity-100" : "opacity-85"}`}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/videos/hero-poster.jpg"
      aria-hidden
      onLoadedMetadata={(e) => applyPlaybackRate(e.currentTarget)}
      onCanPlay={markReady}
      onLoadedData={markReady}
      onPlaying={markReady}
      onError={() => setVideoFailed(true)}
    >
      <source src={HERO_VIDEO_MOBILE_LITE.src} type="video/mp4" media="(max-width: 390px)" />
      <source src={HERO_VIDEO_MOBILE.src} type="video/mp4" media="(max-width: 900px)" />
      <source src={HERO_VIDEO.src} type="video/mp4" />
    </video>
  );
}
