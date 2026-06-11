"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { AppImage } from "@/components/media/AppImage";
import { ABOUT_US_COPY } from "@/lib/about-pages";
import { getAboutUsFallbackImage } from "@/lib/about-us-images";
import { canPlayInlineVideo } from "@/lib/media-video-support";
import { cn } from "@/lib/utils";

type PhoneVideoMockupProps = {
  src: string;
  poster: string;
  label: string;
  caption?: string;
  size?: "sm" | "lg";
  variant?: "device" | "plain";
  className?: string;
};

/** iPhone 15 Pro — viewport 393×852, aspect ~9:19.5 */
const SIZE_CLASS = {
  sm: "w-[min(62vw,14rem)] sm:w-[min(38vw,15rem)] lg:w-[min(100%,16.5rem)] xl:w-[17.5rem]",
  lg: "w-[min(72vw,15.5rem)] sm:w-[min(42vw,16.5rem)] lg:w-[min(100%,18rem)] xl:w-[19rem] 2xl:w-[20rem]",
} as const;

const IMAGE_SIZES = {
  sm: "(max-width: 640px) 62vw, 17.5rem",
  lg: "(max-width: 640px) 72vw, 20rem",
} as const;

const FRAME_RADIUS = "rounded-[2.65rem]";
const SCREEN_RADIUS = "rounded-[2.33rem]";
const BEZEL = "p-[0.32rem]";

function IPhoneSideButtons() {
  return (
    <>
      <span
        className="absolute -left-[0.18rem] top-[21%] h-[3.4%] min-h-[1.1rem] w-[0.22rem] rounded-l-[0.12rem] bg-[linear-gradient(180deg,#2a2a2a,#0a0a0a)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
        aria-hidden
      />
      <span
        className="absolute -left-[0.18rem] top-[31%] h-[5.6%] min-h-[1.75rem] w-[0.22rem] rounded-l-[0.12rem] bg-[linear-gradient(180deg,#2a2a2a,#0a0a0a)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
        aria-hidden
      />
      <span
        className="absolute -left-[0.18rem] top-[42%] h-[5.6%] min-h-[1.75rem] w-[0.22rem] rounded-l-[0.12rem] bg-[linear-gradient(180deg,#2a2a2a,#0a0a0a)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
        aria-hidden
      />
      <span
        className="absolute -right-[0.18rem] top-[34%] h-[6.8%] min-h-[2.1rem] w-[0.22rem] rounded-r-[0.12rem] bg-[linear-gradient(180deg,#2a2a2a,#0a0a0a)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
        aria-hidden
      />
    </>
  );
}

const PHONE_TILT_MOTION =
  "motion-safe:transition-transform motion-safe:duration-[1400ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:will-change-transform [transform:translateZ(0)]";

function DynamicIsland({ elapsedLabel }: { elapsedLabel: string }) {
  return (
    <>
      <div
        className="pointer-events-none absolute left-1/2 top-[2.4%] z-[4] flex h-[3.8%] min-h-[1rem] w-[31%] min-w-[3.65rem] -translate-x-1/2 items-center justify-center gap-1.5 rounded-full bg-black px-2.5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07),0_1px_2px_rgba(0,0,0,0.28)]"
        aria-hidden
      >
        <span className="relative flex size-[0.38rem] shrink-0 sm:size-[0.42rem]">
          <span className="absolute inline-flex size-full animate-[ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite] rounded-full bg-[#ff3b30]/60 opacity-70" />
          <span className="relative inline-flex size-full rounded-full bg-[#ff3b30]" />
        </span>
        <span className="text-[0.56rem] font-semibold tabular-nums leading-none text-white sm:text-[0.6rem]">
          {elapsedLabel}
        </span>
      </div>

      {/* Botón stop — Cámara iOS al grabar: anillo blanco + cuadrado rojo */}
      <div
        className="pointer-events-none absolute bottom-[5.8%] left-1/2 z-[4] -translate-x-1/2"
        aria-hidden
      >
        <div className="flex size-[3rem] items-center justify-center rounded-full border-[2px] border-white sm:size-[3.15rem]">
          <span className="size-[1.05rem] rounded-[0.28rem] bg-[#ff3b30] sm:size-[1.1rem] sm:rounded-[0.3rem]" />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_42%,transparent_76%,rgba(255,255,255,0.02))]"
        aria-hidden
      />
    </>
  );
}

function formatRecordingTime(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds));
  const minutes = Math.floor(total / 60);
  const secs = total % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

export function PhoneVideoMockup({
  src,
  poster,
  label,
  caption,
  size = "sm",
  variant = "device",
  className,
}: PhoneVideoMockupProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoSupported, setVideoSupported] = useState<boolean | null>(null);
  const [fallbackImage, setFallbackImage] = useState<(typeof ABOUT_US_COPY.images)[number] | null>(
    null,
  );
  const [elapsedLabel, setElapsedLabel] = useState("0:00");
  const isPlain = variant === "plain";

  useLayoutEffect(() => {
    setFallbackImage(getAboutUsFallbackImage());
    setVideoSupported(canPlayInlineVideo(reduceMotion));
  }, [reduceMotion]);

  const showVideo = videoSupported === true && !videoFailed && reduceMotion !== true;
  const staticImage = fallbackImage ?? { src: poster, alt: label };
  const showRecordingChrome = showVideo;

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
    if (!showVideo) return;

    const video = videoRef.current;
    if (!video) return;

    void startPlayback();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void startPlayback();
        else video.pause();
      },
      { threshold: 0.12 },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [showVideo, startPlayback]);

  useEffect(() => {
    if (!showVideo) {
      setElapsedLabel("0:00");
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const syncElapsed = () => {
      setElapsedLabel(formatRecordingTime(video.currentTime));
    };

    video.addEventListener("timeupdate", syncElapsed);
    video.addEventListener("seeked", syncElapsed);
    syncElapsed();

    return () => {
      video.removeEventListener("timeupdate", syncElapsed);
      video.removeEventListener("seeked", syncElapsed);
    };
  }, [showVideo, src]);

  return (
    <div className={cn("group relative mx-auto", SIZE_CLASS[size], className)}>
      {!isPlain ? (
        <div
          className="pointer-events-none absolute -inset-5 rounded-[3rem] bg-[radial-gradient(circle,rgba(218,209,156,0.22),transparent_68%)] blur-xl opacity-0 group-hover:opacity-100 motion-safe:transition-opacity duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          aria-hidden
        />
      ) : null}

      {/* Animación en wrapper aparte para no romper el clip de esquinas */}
      <div
        className={cn(
          "relative origin-center [perspective:1200px]",
          !reduceMotion &&
            cn(
              PHONE_TILT_MOTION,
              "md:-rotate-[0.4deg] md:group-hover:rotate-[0.55deg]",
            ),
        )}
      >
        <div
          className={cn(
            "relative bg-black ring-1 ring-black",
            FRAME_RADIUS,
            BEZEL,
            isPlain
              ? "shadow-[0_18px_40px_-24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]"
              : "shadow-[0_28px_56px_-26px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.1)]",
          )}
        >
          <IPhoneSideButtons />

          <div
            className={cn(
              "relative aspect-[393/852] w-full overflow-hidden bg-black isolate [transform:translateZ(0)]",
              SCREEN_RADIUS,
            )}
          >
            {showVideo ? (
              <video
                ref={videoRef}
                src={src}
                className={cn(
                  "absolute inset-0 size-full object-cover object-center [transform:translateZ(0)]",
                  SCREEN_RADIUS,
                )}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={fallbackImage?.src ?? poster}
                aria-label={label}
                onLoadedData={() => void startPlayback()}
                onCanPlay={() => void startPlayback()}
                onError={() => setVideoFailed(true)}
              />
            ) : (
              <AppImage
                src={staticImage.src}
                alt={staticImage.alt || label}
                fill
                qualityPreset="hero"
                className={cn("object-cover", SCREEN_RADIUS)}
                sizes={IMAGE_SIZES[size]}
              />
            )}

            {showRecordingChrome ? <DynamicIsland elapsedLabel={elapsedLabel} /> : null}
          </div>
        </div>
      </div>

      {caption ? (
        <p className="mt-4 text-center text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted-foreground lg:text-left">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
