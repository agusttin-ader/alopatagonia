"use client";

import { AppImage } from "@/components/media/AppImage";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { ABOUT_US_COPY } from "@/lib/about-pages";
import { getAboutUsFallbackImage } from "@/lib/about-us-images";
import {
  HERO_VIDEO,
  HERO_VIDEO_MOBILE,
  HERO_VIDEO_MOBILE_LITE,
  HERO_VIDEO_PLAYBACK_RATE,
  IMAGE_SIZES,
} from "@/lib/constants";
import { canPlayInlineVideo } from "@/lib/media-video-support";
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
  const [videoSupported, setVideoSupported] = useState<boolean | null>(null);
  const [fallbackImage, setFallbackImage] = useState<(typeof ABOUT_US_COPY.images)[number]>(
    ABOUT_US_COPY.images[0],
  );
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useLayoutEffect(() => {
    setFallbackImage(getAboutUsFallbackImage());
    setVideoSupported(canPlayInlineVideo(reduceMotion));
  }, [reduceMotion]);

  const showVideo = videoSupported === true && !videoFailed && reduceMotion !== true;

  /** El shell está oculto durante la intro — el autoplay falla si montamos antes. */
  useEffect(() => {
    if (!showVideo) return;

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
  }, [showVideo]);

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
        void video
          .play()
          .then(() => setVideoReady(true))
          .catch(() => setVideoFailed(true));
      }, 120);
    }
  }, []);

  useEffect(() => {
    if (!showVideo || !videoSrc || videoFailed) return;
    void startPlayback();
  }, [showVideo, videoSrc, videoFailed, startPlayback]);

  useEffect(() => {
    if (!showVideo || !videoSrc || videoReady) return;
    const fallbackId = window.setTimeout(() => setVideoReady(true), 2800);
    return () => window.clearTimeout(fallbackId);
  }, [showVideo, videoSrc, videoReady]);

  if (!showVideo) {
    return (
      <div className="absolute inset-0 z-0">
        <AppImage
          src={fallbackImage.src}
          alt={fallbackImage.alt}
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
      style={{ backgroundImage: `url(${fallbackImage.src})` }}
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
          poster={fallbackImage.src}
          onLoadedData={() => void startPlayback()}
          onCanPlay={() => void startPlayback()}
          onPlaying={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
        />
      ) : null}
    </div>
  );
}
