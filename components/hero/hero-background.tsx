"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 640], [0, 40]);
  const parallaxScale = useTransform(scrollY, [0, 640], [1, 1.04]);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [allowParallax, setAllowParallax] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const shouldAnimateBackground = !reduceMotion && allowParallax;

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

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true;
    const maybePlay = v.play();
    if (maybePlay?.catch) {
      maybePlay.catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const syncParallaxPreference = () => {
      setAllowParallax(mediaQuery.matches);
    };

    syncParallaxPreference();
    mediaQuery.addEventListener("change", syncParallaxPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncParallaxPreference);
    };
  }, [reduceMotion]);

  const parallaxStyle = shouldAnimateBackground
    ? { y: parallaxY, scale: parallaxScale }
    : undefined;

  if (videoFailed) {
    return (
      <motion.div className="absolute inset-0 z-0" style={parallaxStyle}>
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          quality={IMAGE_QUALITY_MAX}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
    );
  }

  return (
    <motion.video
      ref={videoRef}
      className={`absolute inset-0 z-0 size-full object-cover transition-opacity duration-700 ease-out ${videoReady ? "opacity-100" : "opacity-85"}`}
      style={parallaxStyle}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
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
    </motion.video>
  );
}
