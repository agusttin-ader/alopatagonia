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
  getFirstHeroCarouselSrc,
  getHeroVideoSrc,
  getNextCarouselIndex,
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

/** Segundos antes del final para precargar el clip siguiente en el slot inactivo. */
const PRELOAD_LEAD_SECONDS = 4;

/** Segundos antes del final para iniciar el crossfade solapado. */
const OVERLAP_LEAD_SECONDS = HERO_VIDEO_CROSSFADE_MS / 1000 + 0.08;

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
    return !video.paused;
  } catch {
    return new Promise((resolve) => {
      window.setTimeout(() => {
        void video.play().then(
          () => resolve(!video.paused),
          () => resolve(false),
        );
      }, 120);
    });
  }
}

function waitForVideoReady(video: HTMLVideoElement): Promise<void> {
  return new Promise((resolve) => {
    if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
      resolve();
      return;
    }

    const onReady = () => {
      video.removeEventListener("canplaythrough", onReady);
      video.removeEventListener("canplay", onReady);
      resolve();
    };

    video.addEventListener("canplaythrough", onReady, { once: true });
    video.addEventListener("canplay", onReady, { once: true });
    video.load();
  });
}

function prefetchVideoUrl(href: string) {
  if (typeof document === "undefined") return;
  const selector = `link[rel="prefetch"][href="${href}"]`;
  if (document.head.querySelector(selector)) return;
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.as = "fetch";
  link.href = href;
  document.head.appendChild(link);
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
  const slotsRef = useRef<[string | null, string | null]>([null, null]);
  const skipAttemptsRef = useRef(0);

  useLayoutEffect(() => {
    setFallbackImage(getAboutUsFallbackImage());
    setVideoSupported(canPlayInlineVideo(reduceMotion));
    tierRef.current = pickHeroVideoTier(window.innerWidth);
    if (canPlayInlineVideo(reduceMotion)) {
      prefetchVideoUrl(getFirstHeroCarouselSrc(window.innerWidth));
    }
  }, [reduceMotion]);

  const showVideo = videoSupported === true && !videoFailed && reduceMotion !== true;

  const resolveSrc = useCallback((index: number, tier: HeroVideoTier) => {
    const candidate = HERO_CAROUSEL_CANDIDATES[index] ?? HERO_CAROUSEL_CANDIDATES[0];
    return getHeroVideoSrc(candidate, tier);
  }, []);

  const setSlotSrc = useCallback((slot: 0 | 1, src: string) => {
    slotsRef.current[slot] = src;
    setSlots((current) => {
      const copy: [string | null, string | null] = [...current];
      copy[slot] = src;
      return copy;
    });
  }, []);

  const preloadUpcoming = useCallback(
    (activeIndex: number, tier: HeroVideoTier, inactiveSlot: 0 | 1) => {
      if (!carouselEnabled) return;
      const nextIndex = getNextCarouselIndex(activeIndex);
      const nextSrc = resolveSrc(nextIndex, tier);
      if (slotsRef.current[inactiveSlot] === nextSrc) return;
      setSlotSrc(inactiveSlot, nextSrc);
    },
    [carouselEnabled, resolveSrc, setSlotSrc],
  );

  const bootCarousel = useCallback(
    (tier: HeroVideoTier) => {
      carouselIndexRef.current = 0;
      transitioningRef.current = false;
      skipAttemptsRef.current = 0;
      setActiveSlot(0);
      setSlotSrc(0, resolveSrc(0, tier));
      setSlotVisible([false, false]);
      if (carouselEnabled) {
        preloadUpcoming(0, tier, 1);
      } else {
        slotsRef.current[1] = null;
        setSlots((current) => [current[0], null]);
      }
    },
    [carouselEnabled, preloadUpcoming, resolveSrc, setSlotSrc],
  );

  const skipCurrentVideo = useCallback(() => {
    if (skipAttemptsRef.current >= HERO_CAROUSEL_CANDIDATES.length) {
      setVideoFailed(true);
      return false;
    }
    skipAttemptsRef.current += 1;
    const nextIndex = getNextCarouselIndex(carouselIndexRef.current);
    carouselIndexRef.current = nextIndex;
    setSlotVisible([false, false]);
    setSlotSrc(activeSlot, resolveSrc(nextIndex, tierRef.current));
    if (carouselEnabled) {
      preloadUpcoming(nextIndex, tierRef.current, (activeSlot === 0 ? 1 : 0) as 0 | 1);
    }
    return true;
  }, [activeSlot, carouselEnabled, preloadUpcoming, resolveSrc, setSlotSrc]);

  useEffect(() => {
    if (!showVideo) return;

    const activate = () => {
      setActivated(true);
      bootCarousel(tierRef.current);
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
  }, [showVideo, bootCarousel]);

  useEffect(() => {
    if (!showVideo || !activated) return;

    const onResize = () => {
      const nextTier = pickHeroVideoTier(window.innerWidth);
      if (nextTier === tierRef.current) return;
      tierRef.current = nextTier;
      bootCarousel(nextTier);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [showVideo, activated, bootCarousel]);

  useEffect(() => {
    if (!showVideo || !activated || !carouselEnabled) return;

    const inactiveSlot = (activeSlot === 0 ? 1 : 0) as 0 | 1;
    const video = videoRefs[inactiveSlot].current;
    const src = slots[inactiveSlot];
    if (!video || !src) return;

    prepareVideoElement(video);
    if (video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
      video.load();
    }
  }, [showVideo, activated, carouselEnabled, activeSlot, slots, videoRefs]);

  const handleSlotReady = useCallback(
    async (slot: 0 | 1) => {
      const video = videoRefs[slot].current;
      if (!video || transitioningRef.current || slot !== activeSlot) return;

      const played = await playVideo(video);
      if (!played) {
        skipCurrentVideo();
        return;
      }

      skipAttemptsRef.current = 0;
      setSlotVisible((current) => {
        const copy: [boolean, boolean] = [...current];
        copy[slot] = true;
        return copy;
      });

      if (carouselEnabled) {
        const inactiveSlot = (slot === 0 ? 1 : 0) as 0 | 1;
        preloadUpcoming(carouselIndexRef.current, tierRef.current, inactiveSlot);
      }
    },
    [activeSlot, carouselEnabled, preloadUpcoming, skipCurrentVideo, videoRefs],
  );

  const advanceCarousel = useCallback(async () => {
    if (!carouselEnabled || transitioningRef.current) return;

    const nextIndex = getNextCarouselIndex(carouselIndexRef.current);
    const inactiveSlot = (activeSlot === 0 ? 1 : 0) as 0 | 1;
    const nextSrc = resolveSrc(nextIndex, tierRef.current);
    const previousActiveSlot = activeSlot;

    transitioningRef.current = true;

    if (slotsRef.current[inactiveSlot] !== nextSrc) {
      setSlotSrc(inactiveSlot, nextSrc);
    }

    await new Promise<void>((resolve) => {
      const waitForNode = () => {
        const video = videoRefs[inactiveSlot].current;
        if (!video) {
          window.requestAnimationFrame(waitForNode);
          return;
        }

        void waitForVideoReady(video).then(async () => {
          video.currentTime = 0;
          const played = await playVideo(video);
          if (!played) {
            transitioningRef.current = false;
            skipAttemptsRef.current += 1;
            if (skipAttemptsRef.current >= HERO_CAROUSEL_CANDIDATES.length) {
              setVideoFailed(true);
              resolve();
              return;
            }
            carouselIndexRef.current = nextIndex;
            void advanceCarousel();
            resolve();
            return;
          }

          skipAttemptsRef.current = 0;

          setSlotVisible((current) => {
            const copy: [boolean, boolean] = [...current];
            copy[inactiveSlot] = true;
            copy[previousActiveSlot] = false;
            return copy;
          });
          setActiveSlot(inactiveSlot);
          carouselIndexRef.current = nextIndex;

          window.setTimeout(() => {
            videoRefs[previousActiveSlot].current?.pause();
            transitioningRef.current = false;
            preloadUpcoming(nextIndex, tierRef.current, previousActiveSlot);
          }, HERO_VIDEO_CROSSFADE_MS);

          resolve();
        });
      };

      waitForNode();
    });
  }, [activeSlot, carouselEnabled, preloadUpcoming, resolveSrc, setSlotSrc, videoRefs]);

  useEffect(() => {
    if (!showVideo || !activated || !carouselEnabled) return;

    const activeVideo = videoRefs[activeSlot].current;
    if (!activeVideo) return;

    const inactiveSlot = (activeSlot === 0 ? 1 : 0) as 0 | 1;

    const onTimeUpdate = () => {
      if (transitioningRef.current) return;

      const duration = activeVideo.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;

      const remaining = duration - activeVideo.currentTime;

      if (remaining <= PRELOAD_LEAD_SECONDS) {
        preloadUpcoming(carouselIndexRef.current, tierRef.current, inactiveSlot);
      }

      if (remaining <= OVERLAP_LEAD_SECONDS) {
        void advanceCarousel();
      }
    };

    activeVideo.addEventListener("timeupdate", onTimeUpdate);
    return () => activeVideo.removeEventListener("timeupdate", onTimeUpdate);
  }, [
    showVideo,
    activated,
    carouselEnabled,
    activeSlot,
    advanceCarousel,
    preloadUpcoming,
    videoRefs,
  ]);

  const handleVideoEnded = useCallback(
    (slot: 0 | 1) => {
      if (slot !== activeSlot || transitioningRef.current) return;
      if (carouselEnabled) {
        void advanceCarousel();
        return;
      }
      void videoRefs[slot].current?.play();
    },
    [activeSlot, advanceCarousel, carouselEnabled, videoRefs],
  );

  const handleVideoError = useCallback(
    (slot: 0 | 1) => {
      if (slot !== activeSlot) return;
      if (carouselEnabled) {
        skipCurrentVideo();
        return;
      }
      setVideoFailed(true);
    },
    [activeSlot, carouselEnabled, skipCurrentVideo],
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
                  "absolute inset-0 size-full object-cover will-change-[opacity]",
                  "transition-opacity ease-in-out motion-reduce:transition-none",
                  slotVisible[slot] ? "opacity-100" : "opacity-0",
                )}
                style={{ transitionDuration: `${HERO_VIDEO_CROSSFADE_MS}ms` }}
                autoPlay={slot === activeSlot}
                muted
                loop={!carouselEnabled}
                playsInline
                preload="auto"
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
                onError={() => handleVideoError(slot)}
              />
            );
          })
        : null}
    </div>
  );
}
