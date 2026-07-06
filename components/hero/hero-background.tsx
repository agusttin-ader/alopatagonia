"use client";

import { AppImage } from "@/components/media/AppImage";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { ABOUT_US_COPY } from "@/lib/about-pages";
import { getAboutUsFallbackImage } from "@/lib/about-us-images";
import {
  HERO_CAROUSEL_CANDIDATES,
  HERO_VIDEO_CAROUSEL_ENABLED,
  HERO_VIDEO_CROSSFADE_MS,
  HERO_VIDEO_PLAYBACK_RATE,
  getHeroVideoSrc,
  pickHeroVideoTier,
  type HeroVideoTier,
} from "@/lib/hero-video";
import { canPlayInlineVideo } from "@/lib/media-video-support";
import {
  shouldPlaySiteIntro,
  SITE_INTRO_REVEAL_FALLBACK_MS,
} from "@/lib/site-intro-config";
import { IMAGE_SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

function canStartHeroVideo(): boolean {
  if (typeof window === "undefined") return false;
  return Boolean(window.__aloIntroReveal) || !shouldPlaySiteIntro();
}

function prepareVideoElement(video: HTMLVideoElement) {
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.playbackRate = HERO_VIDEO_PLAYBACK_RATE;
}

async function playVideo(video: HTMLVideoElement): Promise<boolean> {
  prepareVideoElement(video);
  try {
    await video.play();
    return true;
  } catch {
    return new Promise((resolve) => {
      window.setTimeout(() => {
        void video.play().then(
          () => resolve(true),
          () => resolve(false),
        );
      }, 120);
    });
  }
}

export function HeroBackground() {
  const reduceMotion = useReducedMotion();
  const carouselEnabled = HERO_VIDEO_CAROUSEL_ENABLED && reduceMotion !== true;

  const [activated, setActivated] = useState(false);
  const [activeSlot, setActiveSlot] = useState<0 | 1>(0);
  const [slots, setSlots] = useState<[string | null, string | null]>([null, null]);
  const [slotVisible, setSlotVisible] = useState<[boolean, boolean]>([false, false]);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoSupported, setVideoSupported] = useState<boolean | null>(null);
  const [fallbackImage, setFallbackImage] = useState<(typeof ABOUT_US_COPY.images)[number]>(
    ABOUT_US_COPY.images[0],
  );

  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const carouselIndexRef = useRef(0);
  const tierRef = useRef<HeroVideoTier>("desktop");
  const transitioningRef = useRef(false);

  useLayoutEffect(() => {
    setFallbackImage(getAboutUsFallbackImage());
    setVideoSupported(canPlayInlineVideo(reduceMotion));
    tierRef.current = pickHeroVideoTier(window.innerWidth);
  }, [reduceMotion]);

  const showVideo = videoSupported === true && !videoFailed && reduceMotion !== true;

  const resolveSrc = useCallback((index: number, tier: HeroVideoTier) => {
    const candidate = HERO_CAROUSEL_CANDIDATES[index] ?? HERO_CAROUSEL_CANDIDATES[0];
    return getHeroVideoSrc(candidate, tier);
  }, []);

  const setSlotSrc = useCallback((slot: 0 | 1, src: string) => {
    setSlots((current) => {
      const copy: [string | null, string | null] = [...current];
      copy[slot] = src;
      return copy;
    });
  }, []);

  useEffect(() => {
    if (!showVideo) return;

    const activate = () => {
      setActivated(true);
      carouselIndexRef.current = 0;
      setActiveSlot(0);
      setSlotSrc(0, resolveSrc(0, tierRef.current));
      setSlotVisible([false, false]);
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
  }, [showVideo, resolveSrc, setSlotSrc]);

  useEffect(() => {
    if (!showVideo || !activated) return;

    const onResize = () => {
      const nextTier = pickHeroVideoTier(window.innerWidth);
      if (nextTier === tierRef.current) return;
      tierRef.current = nextTier;
      transitioningRef.current = false;
      carouselIndexRef.current = 0;
      setActiveSlot(0);
      setSlotSrc(0, resolveSrc(0, nextTier));
      setSlots((current) => [current[0], null]);
      setSlotVisible([false, false]);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [showVideo, activated, resolveSrc, setSlotSrc]);

  const handleSlotReady = useCallback(
    async (slot: 0 | 1) => {
      const video = videoRefs[slot].current;
      if (!video || transitioningRef.current || slot !== activeSlot) return;

      const played = await playVideo(video);
      if (!played) {
        setVideoFailed(true);
        return;
      }

      setSlotVisible((current) => {
        const copy: [boolean, boolean] = [...current];
        copy[slot] = true;
        return copy;
      });
    },
    [activeSlot, videoRefs],
  );

  const advanceCarousel = useCallback(async () => {
    if (!carouselEnabled || transitioningRef.current) return;

    const nextIndex = (carouselIndexRef.current + 1) % HERO_CAROUSEL_CANDIDATES.length;
    const inactiveSlot = (activeSlot === 0 ? 1 : 0) as 0 | 1;
    const nextSrc = resolveSrc(nextIndex, tierRef.current);

    transitioningRef.current = true;
    setSlotSrc(inactiveSlot, nextSrc);

    await new Promise<void>((resolve) => {
      const waitForNode = () => {
        const video = videoRefs[inactiveSlot].current;
        if (!video) {
          window.requestAnimationFrame(waitForNode);
          return;
        }

        const onReady = async () => {
          video.removeEventListener("canplay", onReady);
          const played = await playVideo(video);
          if (!played) {
            transitioningRef.current = false;
            setVideoFailed(true);
            resolve();
            return;
          }

          setSlotVisible((current) => {
            const copy: [boolean, boolean] = [...current];
            copy[inactiveSlot] = true;
            copy[activeSlot] = false;
            return copy;
          });
          setActiveSlot(inactiveSlot);
          carouselIndexRef.current = nextIndex;

          window.setTimeout(() => {
            videoRefs[activeSlot].current?.pause();
            transitioningRef.current = false;
          }, HERO_VIDEO_CROSSFADE_MS);

          resolve();
        };

        if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
          void onReady();
        } else {
          video.addEventListener("canplay", onReady, { once: true });
          video.load();
        }
      };

      waitForNode();
    });
  }, [activeSlot, carouselEnabled, resolveSrc, setSlotSrc, videoRefs]);

  const handleVideoEnded = useCallback(
    (slot: 0 | 1) => {
      if (slot !== activeSlot) return;
      if (carouselEnabled) {
        void advanceCarousel();
        return;
      }
      void videoRefs[slot].current?.play();
    },
    [activeSlot, advanceCarousel, carouselEnabled, videoRefs],
  );

  useEffect(() => {
    if (!showVideo || !activated || !slots[0]) return;
    const fallbackId = window.setTimeout(() => {
      setSlotVisible((current) => (current[activeSlot] ? current : [true, false]));
    }, 2800);
    return () => window.clearTimeout(fallbackId);
  }, [showVideo, activated, slots, activeSlot]);

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
      {activated
        ? ([0, 1] as const).map((slot) => {
            const src = slots[slot];
            if (!src) return null;

            return (
              <video
                key={`${slot}-${src}`}
                ref={videoRefs[slot]}
                src={src}
                className={cn(
                  "absolute inset-0 size-full object-cover",
                  "transition-opacity ease-in-out motion-reduce:transition-none",
                  slotVisible[slot] ? "opacity-100" : "opacity-0",
                )}
                style={{ transitionDuration: `${HERO_VIDEO_CROSSFADE_MS}ms` }}
                autoPlay
                muted
                loop={!carouselEnabled}
                playsInline
                preload={slot === activeSlot ? "auto" : "metadata"}
                poster={fallbackImage.src}
                onLoadedData={() => {
                  if (slot === activeSlot && !transitioningRef.current) {
                    void handleSlotReady(slot);
                  }
                }}
                onCanPlay={() => {
                  if (slot === activeSlot && !transitioningRef.current) {
                    void handleSlotReady(slot);
                  }
                }}
                onPlaying={() => {
                  if (slot === activeSlot) {
                    setSlotVisible((current) => {
                      const copy: [boolean, boolean] = [...current];
                      copy[slot] = true;
                      return copy;
                    });
                  }
                }}
                onEnded={() => handleVideoEnded(slot)}
                onError={() => setVideoFailed(true)}
              />
            );
          })
        : null}
    </div>
  );
}
