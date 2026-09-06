"use client";

import { AppImage } from "@/components/media/AppImage";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { HERO_POSTER_SRC } from "@/lib/home-media-preload";
import {
  HERO_CAROUSEL_CANDIDATES,
  HERO_VIDEO_CAROUSEL_ENABLED,
  HERO_VIDEO_CROSSFADE_MS,
  HERO_VIDEO_PLAYBACK_RATE,
  getHeroVideoSrc,
  getNextCarouselIndex,
  pickHeroVideoTier,
  type HeroVideoTier,
} from "@/lib/hero-video";
import { canPlayInlineVideo } from "@/lib/media-video-support";
import {
  getSiteIntroRevealFallbackMs,
  shouldPlaySiteIntro,
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
  video.setAttribute("webkit-playsinline", "true");
  video.playbackRate = HERO_VIDEO_PLAYBACK_RATE;
}

async function playVideo(video: HTMLVideoElement, maxAttempts = 5): Promise<boolean> {
  prepareVideoElement(video);

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
        await waitForVideoReady(video);
      }
      await video.play();
      if (!video.paused) return true;
    } catch {
      await new Promise((resolve) => {
        window.setTimeout(resolve, 180 * (attempt + 1));
      });
    }
  }

  return false;
}

function waitForVideoReady(
  video: HTMLVideoElement,
  timeoutMs = 9000,
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      resolve();
      return;
    }

    const timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error("hero-video-ready-timeout"));
    }, timeoutMs);

    const cleanup = () => {
      window.clearTimeout(timeoutId);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("loadeddata", onReady);
    };

    const onReady = () => {
      cleanup();
      resolve();
    };

    video.addEventListener("canplay", onReady, { once: true });
    video.addEventListener("loadeddata", onReady, { once: true });

    if (video.networkState === HTMLMediaElement.NETWORK_EMPTY && video.src) {
      video.load();
    }
  });
}

export function HeroBackground() {
  const reduceMotion = useReducedMotion();
  const carouselEnabled = HERO_VIDEO_CAROUSEL_ENABLED && reduceMotion !== true;

  const [activated, setActivated] = useState(false);
  const [activeSlot, setActiveSlot] = useState<0 | 1>(0);
  const [slots, setSlots] = useState<[string | null, string | null]>([null, null]);
  const [slotVisible, setSlotVisible] = useState<[boolean, boolean]>([false, false]);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoSupported, setVideoSupported] = useState<boolean | null>(() =>
    typeof window !== "undefined" ? canPlayInlineVideo(false) : null,
  );

  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const carouselIndexRef = useRef(0);
  const tierRef = useRef<HeroVideoTier>("desktop");
  const transitioningRef = useRef(false);
  const slotsRef = useRef<[string | null, string | null]>([null, null]);
  const skipAttemptsRef = useRef(0);
  const activeSlotRef = useRef<0 | 1>(0);

  const canUseVideo = videoSupported !== false && !videoFailed && reduceMotion !== true;

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

  useLayoutEffect(() => {
    const supported = canPlayInlineVideo(reduceMotion);
    setVideoSupported(supported);
    tierRef.current = pickHeroVideoTier(window.innerWidth);
    if (supported) {
      setSlotSrc(0, resolveSrc(0, tierRef.current));
    }
  }, [reduceMotion, resolveSrc, setSlotSrc]);

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
      slotsRef.current[1] = null;
      setSlots((current) => [current[0], null]);
    },
    [resolveSrc, setSlotSrc],
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
    if (!canUseVideo || activated) return;

    const activate = () => {
      setActivated(true);
      bootCarousel(tierRef.current);
    };

    if (canStartHeroVideo()) {
      activate();
      return;
    }

    window.addEventListener("alo-site-intro-reveal", activate, { once: true });
    const fallbackId = window.setTimeout(activate, getSiteIntroRevealFallbackMs());

    return () => {
      window.removeEventListener("alo-site-intro-reveal", activate);
      window.clearTimeout(fallbackId);
    };
  }, [canUseVideo, activated, bootCarousel]);

  useEffect(() => {
    if (!canUseVideo || activated) return;

    const video = videoRefs[0].current;
    const src = slotsRef.current[0];
    if (!video || !src) return;

    prepareVideoElement(video);
    video.preload = "auto";
    if (video.readyState < HTMLMediaElement.HAVE_METADATA) {
      video.load();
    }
  }, [canUseVideo, activated, slots, videoRefs]);

  useEffect(() => {
    if (!canUseVideo || !activated) return;

    const onResize = () => {
      const nextTier = pickHeroVideoTier(window.innerWidth);
      if (nextTier === tierRef.current) return;
      tierRef.current = nextTier;
      bootCarousel(nextTier);
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [canUseVideo, activated, bootCarousel]);

  useEffect(() => {
    if (!canUseVideo || !activated || !carouselEnabled) return;

    const inactiveSlot = (activeSlot === 0 ? 1 : 0) as 0 | 1;
    const video = videoRefs[inactiveSlot].current;
    const src = slots[inactiveSlot];
    if (!video || !src) return;

    prepareVideoElement(video);
    if (video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA) {
      video.load();
    }
  }, [canUseVideo, activated, carouselEnabled, activeSlot, slots, videoRefs]);

  const handleSlotReady = useCallback(
    async (slot: 0 | 1) => {
      if (!activated) return;

      const video = videoRefs[slot].current;
      if (!video || transitioningRef.current || slot !== activeSlot) return;

      if (!video.paused && video.currentTime > 0) {
        setSlotVisible((current) => {
          if (current[slot]) return current;
          const copy: [boolean, boolean] = [...current];
          copy[slot] = true;
          return copy;
        });
        return;
      }

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
    },
    [activated, activeSlot, skipCurrentVideo, videoRefs],
  );

  useEffect(() => {
    if (!canUseVideo || !activated) return;

    let cancelled = false;
    const slot = activeSlot;
    const video = videoRefs[slot].current;
    const src = slotsRef.current[slot];
    if (!video || !src) return;

    const startActiveSlot = async () => {
      try {
        await waitForVideoReady(video);
        if (cancelled || transitioningRef.current || slot !== activeSlot) return;
        await handleSlotReady(slot);
      } catch {
        if (!cancelled) skipCurrentVideo();
      }
    };

    void startActiveSlot();

    return () => {
      cancelled = true;
    };
  }, [canUseVideo, activated, activeSlot, slots, handleSlotReady, skipCurrentVideo, videoRefs]);

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
    if (!canUseVideo || !activated || !carouselEnabled) return;

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
    canUseVideo,
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
    if (!canUseVideo || !activated || !slots[0]) return;
    const slot = activeSlot;
    const fallbackId = window.setTimeout(() => {
      setSlotVisible((current) => {
        if (current[slot]) return current;
        const copy: [boolean, boolean] = [...current];
        copy[slot] = true;
        return copy;
      });
    }, 4500);
    return () => window.clearTimeout(fallbackId);
  }, [canUseVideo, activated, slots, activeSlot]);

  useEffect(() => {
    activeSlotRef.current = activeSlot;
  }, [activeSlot]);

  useEffect(() => {
    if (!canUseVideo || !activated) return undefined;

    const hero = document.getElementById("inicio");
    if (!hero) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = Boolean(entry?.isIntersecting);

        for (const slot of [0, 1] as const) {
          const video = videoRefs[slot].current;
          if (!video || !slotsRef.current[slot]) continue;

          if (!visible) {
            video.pause();
            continue;
          }

          if (slot === activeSlotRef.current && video.paused) {
            void playVideo(video);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [canUseVideo, activated, videoRefs]);

  return (
    <div className="absolute inset-0 z-0" aria-hidden>
      <AppImage
        src={HERO_POSTER_SRC}
        alt=""
        fill
        priority
        withBlur={false}
        loadingPulse={false}
        qualityPreset="hero"
        sizes={IMAGE_SIZES.viewport}
        className={cn(
          "object-cover transition-opacity duration-700 ease-out motion-reduce:transition-none",
          canUseVideo && slotVisible[activeSlot] ? "opacity-0" : "opacity-100",
        )}
      />
      {canUseVideo &&
        ([0, 1] as const).map((slot) => {
          const src = slots[slot];
          if (!src) return null;

          const isActiveSlot = activated && slot === activeSlot;
          const shouldPreload = slot === 0 || isActiveSlot;

          return (
            <video
              key={`${slot}-${src}`}
              ref={videoRefs[slot]}
              src={src}
              poster={HERO_POSTER_SRC}
              className={cn(
                "absolute inset-0 z-[1] size-full object-cover will-change-[opacity]",
                "transition-opacity ease-in-out motion-reduce:transition-none",
                slotVisible[slot] ? "opacity-100" : "opacity-0",
              )}
              style={{ transitionDuration: `${HERO_VIDEO_CROSSFADE_MS}ms` }}
              autoPlay={isActiveSlot}
              muted
              loop={!carouselEnabled}
              playsInline
              preload={shouldPreload ? "auto" : "metadata"}
              onLoadedData={() => {
                if (isActiveSlot && !transitioningRef.current) {
                  void handleSlotReady(slot);
                }
              }}
              onCanPlay={() => {
                if (isActiveSlot && !transitioningRef.current) {
                  void handleSlotReady(slot);
                }
              }}
              onPlaying={() => {
                if (isActiveSlot) {
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
        })}
    </div>
  );
}
