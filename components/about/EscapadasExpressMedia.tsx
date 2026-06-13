"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { AppImage } from "@/components/media/AppImage";
import type { EscapadaExpressMedia } from "@/lib/escapadas-express";
import { canPlayInlineVideo } from "@/lib/media-video-support";
import { IMAGE_SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

type EscapadasExpressMediaProps = {
  media: EscapadaExpressMedia;
  className?: string;
  priority?: boolean;
  isActive?: boolean;
  sizes?: string;
  qualityPreset?: "card" | "hero";
};

export function EscapadasExpressMedia({
  media,
  className,
  priority = false,
  isActive = true,
  sizes = IMAGE_SIZES.catalogCard,
  qualityPreset = "card",
}: EscapadasExpressMediaProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoSupported, setVideoSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setVideoSupported(canPlayInlineVideo(reduceMotion));
  }, [reduceMotion]);

  const showVideo =
    media.kind === "video" &&
    isActive &&
    videoSupported === true &&
    !videoFailed &&
    reduceMotion !== true;

  const startPlayback = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    try {
      await video.play();
    } catch {
      window.setTimeout(() => {
        void video.play().catch(() => setVideoFailed(true));
      }, 200);
    }
  }, []);

  useEffect(() => {
    if (!showVideo) {
      videoRef.current?.pause();
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    void startPlayback();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isActive) void startPlayback();
        else video.pause();
      },
      { threshold: 0.2 },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [showVideo, startPlayback, isActive]);

  if (media.kind === "video" && showVideo) {
    return (
      <video
        ref={videoRef}
        src={media.src}
        poster={media.poster}
        className={cn("absolute inset-0 size-full object-cover object-center", className)}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={media.alt}
        onLoadedData={() => void startPlayback()}
        onCanPlay={() => void startPlayback()}
        onError={() => setVideoFailed(true)}
      />
    );
  }

  const imageSrc = media.kind === "video" ? media.poster : media.src;
  const imageAlt = media.alt;

  return (
    <AppImage
      src={imageSrc}
      alt={imageAlt}
      fill
      priority={priority}
      qualityPreset={qualityPreset}
      className={cn("object-cover", className)}
      sizes={sizes}
    />
  );
}
