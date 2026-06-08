"use client";

import { AppImage } from "@/components/media/AppImage";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import {
  HERO_IMAGE,
  HERO_VIDEO,
  HERO_VIDEO_MOBILE,
  HERO_VIDEO_MOBILE_LITE,
  HERO_VIDEO_PLAYBACK_RATE,
  IMAGE_SIZES,
} from "@/lib/constants";
import {
  shouldPlaySiteIntro,
  SITE_INTRO_REVEAL_FALLBACK_MS,
} from "@/lib/site-intro-config";
import { cn } from "@/lib/utils";

function pickHeroVideoSrc(): string {
  if (typeof window === "undefined") return HERO_VIDEO.src;
  const width = window.innerWidth;
  if (width <= 390) return HERO_VIDEO_MOBILE_LITE.src;
  if (width <= 900) return HERO_VIDEO_MOBILE.src;
  return HERO_VIDEO.src;
}

function canStartHeroVideo(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(window.__aloIntroReveal) || !shouldPlaySiteIntro();
}

export function HeroBackground() {
  const reduceMotion = useReducedMotion();
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /** El shell está oculto durante la intro — el autoplay falla si montamos antes. */
  useEffect(() => {
    if (reduceMotion) return;

    const activate = () => {
      setVideoSrc((current) => current ?? pickHeroVideoSrc());
    };

    if (canStartHeroVideo()) {
      activate();
      return;
    }

    window.addEventListener("alo-site-intro-reveal", activate, { once: true });
    const fallbackId = window.setTimeout(activate, SITE_INTRO_REVEAL_FALLBACK_MS);

    return () => {
      window.removeEventListener("alo-site-intro-reveal", activate);
      window.clearTimeout(fallbackId);
    };
  }, [reduceMotion]);

  const startPlayback = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.playbackRate = HERO_VIDEO_PLAYBACK_RATE;

    try {
      await video.play();
      setVideoReady(true);
    } catch {
      window.setTimeout(() => {
        void video.play().then(() => setVideoReady(true)).catch(() => {});
      }, 120);
    }
  }, []);

  useEffect(() => {
    if (!videoSrc || videoFailed) return;
    void startPlayback();
  }, [videoSrc, videoFailed, startPlayback]);

  useEffect(() => {
    if (!videoSrc || videoReady) return;
    const fallbackId = window.setTimeout(() => setVideoReady(true), 2800);
    return () => window.clearTimeout(fallbackId);
  }, [videoSrc, videoReady]);

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
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
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
          onLoadedData={() => void startPlayback()}
          onCanPlay={() => void startPlayback()}
          onPlaying={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
        />
      ) : null}
    </div>
  );
}
