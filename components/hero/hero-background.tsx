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
import { cn } from "@/lib/utils";

function pickHeroVideoSrc(): string {
  if (typeof window === "undefined") return HERO_VIDEO.src;
  const width = window.innerWidth;
  if (width <= 390) return HERO_VIDEO_MOBILE_LITE.src;
  if (width <= 900) return HERO_VIDEO_MOBILE.src;
  return HERO_VIDEO.src;
}

export function HeroBackground() {
  const reduceMotion = useReducedMotion();
  const [videoSrc, setVideoSrc] = useState(HERO_VIDEO.src);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useLayoutEffect(() => {
    setVideoSrc(pickHeroVideoSrc());
  }, []);

  const markReady = useCallback(() => {
    setVideoReady(true);
  }, []);

  const applyPlaybackRate = useCallback((el: HTMLVideoElement) => {
    el.playbackRate = HERO_VIDEO_PLAYBACK_RATE;
  }, []);

  const startPlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    applyPlaybackRate(video);
    const maybePlay = video.play();
    if (maybePlay?.catch) {
      maybePlay.catch(() => {});
    }
  }, [applyPlaybackRate]);

  useEffect(() => {
    startPlayback();
  }, [startPlayback, videoSrc, videoFailed]);

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
    <div
      className="absolute inset-0 z-0 bg-cover bg-center"
      style={{ backgroundImage: "url(/videos/hero-poster.jpg)" }}
      aria-hidden
    >
      <video
        key={videoSrc}
        ref={videoRef}
        className={cn(
          "size-full object-cover transition-opacity duration-700 ease-out",
          videoReady ? "opacity-100" : "opacity-0",
        )}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/videos/hero-poster.jpg"
        onLoadedMetadata={(event) => applyPlaybackRate(event.currentTarget)}
        onCanPlay={() => {
          markReady();
          startPlayback();
        }}
        onLoadedData={markReady}
        onPlaying={markReady}
        onError={() => setVideoFailed(true)}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}
