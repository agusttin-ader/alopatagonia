"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import {
  GALLERY_IMAGES,
  INSTAGRAM_STATS,
  SECTION_IDS,
  SITE,
  type InstagramStatItem,
} from "@/lib/constants";
import { IMAGE_QUALITY_GALLERY, IMAGE_SIZES } from "@/lib/image-config";
import { useCoarseMobile } from "@/lib/use-coarse-mobile";
import { cn } from "@/lib/utils";

const COLLAGE_IMAGE_INDEXES = [0, 4, 8, 2, 6] as const;

function formatIntegerEs(n: number) {
  return Math.round(n).toLocaleString("es-AR");
}

function formatKEs(n: number) {
  const rounded = Math.round(n * 10) / 10;
  return `${rounded.toLocaleString("es-AR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })}k`;
}

function formatStatValue(item: InstagramStatItem, value: number) {
  return item.variant === "integer" ? formatIntegerEs(value) : formatKEs(value);
}

function AnimatedFollowers({ started }: { started: boolean }) {
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
      {formatStatValue(followers, raw)}
    </span>
  );
}

function InstagramPhotoCollage({ className }: { className?: string }) {
  const images = COLLAGE_IMAGE_INDEXES.map((index) => GALLERY_IMAGES[index]);

  return (
    <a
      href={SITE.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative grid grid-cols-3 grid-rows-2 gap-1.5 overflow-hidden rounded-2xl bg-black/20 shadow-xl ring-1 ring-white/10 sm:gap-2 sm:rounded-[1.35rem]",
        className,
      )}
      aria-label={`Ver fotos de Patagonia en Instagram @${SITE.instagramHandle}`}
    >
      {images.map((image, index) => (
        <motion.div
          key={image.src}
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-5% 0px" }}
          transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "relative min-h-0 overflow-hidden",
            index === 0 ? "col-span-2 row-span-2 min-h-[220px] sm:min-h-[280px]" : "aspect-square",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={index === 0 ? IMAGE_SIZES.half : "(max-width: 1024px) 22vw, 12vw"}
            quality={IMAGE_QUALITY_GALLERY}
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
        </motion.div>
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4 sm:p-5">
        <p className="text-sm font-semibold text-white sm:text-base">
          Ver más en Instagram
        </p>
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm transition group-hover:bg-white/25">
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </div>
    </a>
  );
}

export function InstagramStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10% 0px" });
  const posts = INSTAGRAM_STATS.find((item) => item.id === "posts");
  const destinations = INSTAGRAM_STATS.find((item) => item.id === "coverage");

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.community}
      className="scroll-mt-24 py-12 sm:py-16"
      aria-labelledby="comunidad-heading"
    >
      <Reveal>
        <div className="w-full overflow-hidden bg-[#1a2f26] text-white">
          <div className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-stretch">
            <div className="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12 2xl:px-20 2xl:py-14">
                <div className="flex items-center gap-4">
                  <div className="shrink-0 rounded-full bg-[linear-gradient(45deg,#f58529,#dd2a7b,#515bd4)] p-[2.5px]">
                    <div className="relative size-16 overflow-hidden rounded-full bg-white ring-2 ring-[#1a2f26] sm:size-[4.5rem]">
                      <div className="flex size-full items-center justify-center p-2 sm:p-2.5">
                        <Image
                          src={SITE.logoOnLight}
                          alt={SITE.name}
                          width={591}
                          height={586}
                          sizes="64px"
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-white/65">@{SITE.instagramHandle}</p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <AnimatedFollowers started={inView} />
                      <span className="text-sm text-white/70">seguidores</span>
                    </div>
                  </div>
                </div>

                <h2
                  id="comunidad-heading"
                  className="font-heading mt-7 text-3xl font-semibold tracking-tight text-white sm:text-4xl 2xl:text-[2.6rem]"
                >
                  Patagonia en tu feed
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/78 sm:text-lg">
                  Rutas, clima y fotos reales de los destinos que armamos. Seguí el
                  perfil y escribinos cuando quieras planear el viaje.
                </p>

                <div className="mt-6 flex flex-wrap gap-2.5 text-[0.72rem] font-medium text-white/72 sm:text-xs">
                  {posts ? (
                    <span className="rounded-full bg-white/8 px-3 py-1 ring-1 ring-white/10">
                      {formatStatValue(posts, posts.target)} publicaciones
                    </span>
                  ) : null}
                  {destinations ? (
                    <span className="rounded-full bg-white/8 px-3 py-1 ring-1 ring-white/10">
                      {destinations.target} destinos
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
                  Seguir @{SITE.instagramHandle}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
            </div>

            <div className="flex items-center px-6 pb-8 pt-2 sm:px-10 sm:pb-10 lg:px-10 lg:py-12 2xl:px-14 2xl:py-14">
              <InstagramPhotoCollage className="w-full min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]" />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
