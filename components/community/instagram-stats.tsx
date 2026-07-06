"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { AppImage } from "@/components/media/AppImage";
import { useEffect, useMemo, useRef, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { InstagramProfileAvatar } from "@/components/community/InstagramProfileAvatar";
import {
  GALLERY_IMAGES,
  INSTAGRAM_STATS,
  SECTION_IDS,
  SITE,
  type InstagramStatItem,
} from "@/lib/constants";
import { useCoarseMobile } from "@/lib/use-coarse-mobile";
import { cn } from "@/lib/utils";

const FEED_LIKES = 1240;

const FEED_IMAGE_SIZES = "(max-width: 1024px) 90vw, 400px";
const CAROUSEL_AUTO_MS = 4500;
const CAROUSEL_PAUSE_MS = 9000;

function formatCount(n: number, locale: string) {
  return n.toLocaleString(locale);
}

function FeedAvatar() {
  return <InstagramProfileAvatar size="sm" />;
}

function FeedPostCarousel({
  images,
  priority,
  prevLabel,
  nextLabel,
}: {
  images: Array<(typeof GALLERY_IMAGES)[number]>;
  priority?: boolean;
  prevLabel: string;
  nextLabel: string;
}) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const pausedUntilRef = useRef(0);

  const goTo = (next: number) => {
    setActiveIndex((next + images.length) % images.length);
    pausedUntilRef.current = Date.now() + CAROUSEL_PAUSE_MS;
  };

  useEffect(() => {
    if (reduceMotion || images.length <= 1) return;

    const tick = window.setInterval(() => {
      if (Date.now() < pausedUntilRef.current) return;
      setActiveIndex((current) => (current + 1) % images.length);
    }, CAROUSEL_AUTO_MS);

    return () => window.clearInterval(tick);
  }, [images.length, reduceMotion]);

  if (images.length === 0) return null;

  return (
    <div className="group/post relative aspect-square w-full overflow-hidden bg-[#141414]">
      <div
        className="flex h-full transition-transform duration-500 ease-out motion-reduce:transition-none"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(-${(activeIndex * 100) / images.length}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={image.src}
            className="relative h-full shrink-0 overflow-hidden"
            style={{ width: `${100 / images.length}%` }}
          >
            <AppImage
              src={image.src}
              alt={image.alt}
              fill
              sizes={FEED_IMAGE_SIZES}
              qualityPreset="lightbox"
              priority={priority && index === 0}
              loading={index <= 1 ? "eager" : "lazy"}
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>

      {images.length > 1 ? (
        <>
          <div className="pointer-events-none absolute right-3 top-3 rounded-md bg-black/60 px-2 py-0.5 text-[0.65rem] font-semibold tabular-nums text-white ring-1 ring-white/15 backdrop-blur-sm">
            {activeIndex + 1}/{images.length}
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-2.5 flex justify-center gap-1">
            {images.map((image, index) => (
              <span
                key={image.src}
                className={cn(
                  "size-1.5 rounded-full transition",
                  index === activeIndex ? "bg-white" : "bg-white/40",
                )}
                aria-hidden
              />
            ))}
          </div>

          <button
            type="button"
            aria-label={prevLabel}
            onClick={() => goTo(activeIndex - 1)}
            className="absolute left-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white opacity-90 ring-1 ring-white/20 backdrop-blur-sm transition hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60 sm:size-7 sm:opacity-0 sm:group-hover/post:opacity-100"
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            onClick={() => goTo(activeIndex + 1)}
            className="absolute right-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white opacity-90 ring-1 ring-white/20 backdrop-blur-sm transition hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/60 sm:size-7 sm:opacity-0 sm:group-hover/post:opacity-100"
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </>
      ) : null}
    </div>
  );
}

function InstagramFeedPreview({ className }: { className?: string }) {
  const t = useTranslations("community");
  const locale = useLocale();
  const images = useMemo(
    () =>
      GALLERY_IMAGES.filter(Boolean).map((image, index) => ({
        ...image,
        alt: t("feedPhotoAlt", { n: index + 1 }),
      })),
    [t],
  );

  if (images.length === 0) return null;

  return (
    <div
      className={cn(
        "w-full max-w-[22rem] overflow-hidden rounded-2xl bg-[#0c0c0c] text-[#f5f5f5] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.65)] ring-1 ring-white/10 sm:max-w-[24rem] lg:max-w-[26rem] 2xl:max-w-[29rem]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
          </svg>
          <span className="text-sm font-semibold tracking-tight">Instagram</span>
        </div>
        <a
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-[#0095f6] px-3 py-1 text-[0.65rem] font-semibold text-white transition hover:bg-[#0086dc]"
        >
          {t("feedFollow")}
        </a>
      </div>

      <article className="group/post">
        <div className="flex items-center gap-2.5 px-3 py-2.5">
          <FeedAvatar />
          <span className="text-[0.8rem] font-semibold leading-none">
            {SITE.instagramHandle}
          </span>
          <MoreHorizontal className="ml-auto size-[1.1rem] text-white/45" aria-hidden />
        </div>

        <FeedPostCarousel
          images={images}
          priority
          prevLabel={t("feedPrevPhoto")}
          nextLabel={t("feedNextPhoto")}
        />

        <div className="flex items-center gap-3.5 px-3 py-2.5">
          <Heart className="size-[1.35rem] fill-[#ed4956] text-[#ed4956]" aria-hidden />
          <MessageCircle className="size-[1.35rem]" aria-hidden />
          <Send className="size-[1.35rem]" aria-hidden />
          <Bookmark className="ml-auto size-[1.35rem]" aria-hidden />
        </div>

        <p className="px-3 text-[0.78rem] font-semibold">
          {t("feedLikes", { count: formatCount(FEED_LIKES, locale) })}
        </p>
        <p className="px-3 pb-3 pt-1 text-[0.78rem] leading-snug text-white/85">
          <span className="font-semibold text-white">{SITE.instagramHandle}</span>{" "}
          {t("feedCaption")}
        </p>
      </article>

      <a
        href={SITE.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1.5 border-t border-white/10 bg-[#121212] px-4 py-3 text-[0.78rem] font-semibold text-[#71c4ff] transition hover:bg-[#1a1a1a]"
        aria-label={t("feedOpenProfileAria", { handle: SITE.instagramHandle })}
      >
        {t("feedOpenProfile")}
        <ArrowUpRight className="size-3.5" aria-hidden />
      </a>
    </div>
  );
}

function formatInteger(n: number, locale: string) {
  return Math.round(n).toLocaleString(locale);
}

function formatK(n: number, locale: string) {
  const rounded = Math.round(n * 10) / 10;
  return `${rounded.toLocaleString(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}k`;
}

function formatStatValue(item: InstagramStatItem, value: number, locale: string) {
  return item.variant === "integer" ? formatInteger(value, locale) : formatK(value, locale);
}

function AnimatedFollowers({ started, locale }: { started: boolean; locale: string }) {
  const followers = INSTAGRAM_STATS.find((item) => item.id === "followers");
  const reduceMotion = useReducedMotion();
  const isCoarseMobile = useCoarseMobile();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!followers || !started || reduceMotion || isCoarseMobile) return;
    const controls = animate(0, followers.target, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setValue(typeof latest === "number" ? latest : 0),
    });
    return () => controls.stop();
  }, [followers, started, reduceMotion, isCoarseMobile]);

  if (!followers) return null;

  const raw =
    (reduceMotion || isCoarseMobile) && started
      ? followers.target
      : reduceMotion || isCoarseMobile
        ? 0
        : value;

  return (
    <span className="font-heading text-2xl font-semibold tabular-nums tracking-tight text-white sm:text-[2rem]">
      {formatStatValue(followers, raw, locale)}
    </span>
  );
}

export function InstagramStats() {
  const t = useTranslations("community");
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10% 0px" });
  const posts = INSTAGRAM_STATS.find((item) => item.id === "posts");
  const destinations = INSTAGRAM_STATS.find((item) => item.id === "coverage");

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.community}
      className="scroll-mt-24 pt-12 sm:pt-16"
      aria-labelledby="comunidad-heading"
    >
      <Reveal>
        <div className="relative w-full overflow-hidden bg-footer-lake text-white">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-2 lg:items-stretch 2xl:max-w-[90rem]">
            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12 2xl:px-20 2xl:py-14">
              <div className="flex items-center gap-5 sm:gap-6">
                <InstagramProfileAvatar size="lg" linked />
                <div className="min-w-0">
                  <p className="text-base font-semibold text-white sm:text-lg">
                    @{SITE.instagramHandle}
                  </p>
                  <div className="mt-1.5 flex items-baseline gap-2">
                    <AnimatedFollowers started={inView} locale={locale} />
                    <span className="text-sm text-white/70">{t("followers")}</span>
                  </div>
                </div>
              </div>

              <h2
                id="comunidad-heading"
                className="font-heading mt-7 text-3xl font-semibold tracking-tight text-white sm:text-4xl 2xl:text-5xl"
              >
                {t("heading")}
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/78 sm:text-lg">
                {t("body")}
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {posts ? (
                  <span className="rounded-full bg-white/14 px-3 py-1.5 text-xs font-semibold text-white/92 ring-1 ring-white/22 backdrop-blur-sm">
                    {t("postsBadge", { count: formatStatValue(posts, posts.target, locale) })}
                  </span>
                ) : null}
                {destinations ? (
                  <span className="rounded-full bg-white/14 px-3 py-1.5 text-xs font-semibold text-white/92 ring-1 ring-white/22 backdrop-blur-sm">
                    {t("destinationsBadge", { count: destinations.target })}
                  </span>
                ) : null}
              </div>

              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "motion-cta mt-8 inline-flex h-11 w-fit items-center gap-2 rounded-full px-5 text-sm font-semibold text-white",
                  "bg-[linear-gradient(45deg,#f58529,#dd2a7b,#515bd4)] shadow-[0_12px_28px_-14px_rgba(221,42,123,0.55)]",
                  "hover:brightness-110",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70",
                )}
              >
                <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
                {t("followCta", { handle: SITE.instagramHandle })}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </div>

            <div className="flex items-center justify-center px-6 pb-8 pt-2 sm:px-10 sm:pb-10 sm:pt-4 lg:justify-start lg:pl-10 lg:pr-16 lg:py-12 xl:pl-12 xl:pr-20">
              <InstagramFeedPreview />
            </div>
          </div>
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-12 bg-gradient-to-b from-transparent to-[#121508]/55 sm:h-16"
            aria-hidden
          />
        </div>
      </Reveal>
    </section>
  );
}
