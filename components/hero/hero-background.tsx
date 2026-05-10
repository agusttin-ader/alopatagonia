"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  HERO_IMAGE,
  HERO_VIDEO,
  HERO_VIDEO_MOBILE,
  HERO_VIDEO_MOBILE_LITE,
  HERO_VIDEO_PLAYBACK_RATE,
  IMAGE_QUALITY_MAX,
} from "@/lib/constants";
export function HeroBackground() {
  useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoSrc, setVideoSrc] = useState(HERO_VIDEO_MOBILE.src);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const markReady = useCallback(() => {
    setVideoReady(true);
  }, []);

  const applyPlaybackRate = useCallback((el: HTMLVideoElement) => {
    el.playbackRate = HERO_VIDEO_PLAYBACK_RATE;
  }, []);

  const tryPlay = useCallback(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    videoElement.muted = true;
    const maybePlay = videoElement.play();
    if (maybePlay?.catch) {
      maybePlay.catch(() => {});
    }
  }, []);

  useEffect(() => {
    const pickSource = () => {
      const width = window.innerWidth;
      if (width <= 390) {
        setVideoSrc(HERO_VIDEO_MOBILE_LITE.src);
        return;
      }
      if (width <= 900) {
        setVideoSrc(HERO_VIDEO_MOBILE.src);
        return;
      }
      setVideoSrc(HERO_VIDEO.src);
    };

    pickSource();
    window.addEventListener("resize", pickSource);
    return () => window.removeEventListener("resize", pickSource);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (v && v.readyState >= 3) markReady();
  }, [markReady]);

  useEffect(() => {
    const v = videoRef.current;
    if (v) applyPlaybackRate(v);
  }, [applyPlaybackRate]);

  useEffect(() => {
    tryPlay();

    const onUserInteraction = () => {
      tryPlay();
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") {
        tryPlay();
      }
    };

    window.addEventListener("touchstart", onUserInteraction, { passive: true });
    window.addEventListener("pointerdown", onUserInteraction);
    window.addEventListener("pageshow", onUserInteraction);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("touchstart", onUserInteraction);
      window.removeEventListener("pointerdown", onUserInteraction);
      window.removeEventListener("pageshow", onUserInteraction);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [tryPlay, videoSrc]);

  if (videoFailed) {
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
      <video
        ref={videoRef}
        key={videoSrc}
        className={`absolute inset-0 z-[1] size-full object-cover transition-opacity duration-700 ease-out ${videoReady ? "opacity-100" : "opacity-0"}`}
        autoPlay
        muted
        defaultMuted
        loop
        playsInline
        preload="metadata"
        poster="/videos/hero-poster.jpg"
        aria-hidden
        onLoadedMetadata={(e) => applyPlaybackRate(e.currentTarget)}
        onCanPlay={markReady}
        onLoadedData={markReady}
        onPlaying={markReady}
        onError={() => {
          if (videoSrc !== HERO_VIDEO.src) {
            setVideoReady(false);
            setVideoSrc(HERO_VIDEO.src);
            return;
          }
          setVideoFailed(true);
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}
