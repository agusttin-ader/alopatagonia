"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { Images, MapPinned, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import {
  INSTAGRAM_STATS,
  SECTION_IDS,
  SITE,
  type InstagramStatItem,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

const STAT_ICONS = {
  posts: Images,
  followers: Users,
  coverage: MapPinned,
} as const;

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

function statAriaLabel(item: InstagramStatItem) {
  const value =
    item.variant === "integer"
      ? formatIntegerEs(item.target)
      : formatKEs(item.target);
  return `${item.label}: ${value}. ${item.description}`;
}

function AnimatedStatValue({
  item,
  started,
}: {
  item: InstagramStatItem;
  started: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!started || reduceMotion) return;
    const controls = animate(0, item.target, {
      duration: 1.45,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setValue(typeof latest === "number" ? latest : 0);
      },
    });
    return () => controls.stop();
  }, [started, item.target, reduceMotion]);

  const raw =
    reduceMotion && started
      ? item.target
      : reduceMotion
        ? 0
        : value;

  const text =
    item.variant === "integer"
      ? formatIntegerEs(raw)
      : formatKEs(raw);

  return (
    <p
      className="font-heading text-4xl font-medium tabular-nums tracking-tight text-white sm:text-[2.75rem] sm:leading-none"
      aria-hidden
    >
      {text}
    </p>
  );
}

export function InstagramStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10% 0px" });

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.community}
      className="relative scroll-mt-6 overflow-hidden bg-zinc-950 px-6 py-24 text-zinc-100 sm:px-10 lg:px-16"
      aria-labelledby="comunidad-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(47,93,80,0.35),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_50%,rgba(47,93,80,0.12),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-emerald-400/90">
            Comunidad
          </p>
          <h2
            id="comunidad-heading"
            className="font-heading mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight"
          >
            Inspiración real, mismo criterio que en cada viaje
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">
            En{" "}
            <span className="font-medium text-zinc-200">
              @{SITE.instagramHandle}
            </span>{" "}
            mostramos el sur como lo vivimos: transparentes, actualizados y
            enfocados en que llegues bien informado antes de escribirnos.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {INSTAGRAM_STATS.map((item, index) => {
            const Icon =
              STAT_ICONS[item.id as keyof typeof STAT_ICONS] ?? Images;
            return (
              <Reveal key={item.id} delay={index * 0.07}>
                <div
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.02] px-6 py-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] transition-all duration-300",
                    "hover:-translate-y-0.5 hover:border-emerald-500/25 hover:shadow-lg hover:shadow-emerald-950/40",
                  )}
                  aria-label={statAriaLabel(item)}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                      {item.label}
                    </p>
                    <div
                      className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400/90 ring-1 ring-emerald-400/20 transition-colors duration-300 group-hover:bg-emerald-500/15"
                      aria-hidden
                    >
                      <Icon className="size-[1.15rem]" strokeWidth={1.75} />
                    </div>
                  </div>
                  <div className="my-7 min-h-[3.25rem] sm:min-h-[3.5rem]">
                    <AnimatedStatValue item={item} started={inView} />
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-500">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="mt-12 flex flex-col items-center gap-4">
          <p className="max-w-xl text-center text-sm text-zinc-500">
            Preferís ver reels, historias o el feed completo: es el mismo equipo
            que responde por WhatsApp cuando querés armar tu itinerario.
          </p>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-5 py-2.5 text-sm font-medium text-zinc-100",
              "shadow-sm transition-all duration-300",
              "hover:border-emerald-400/35 hover:bg-white/[0.09] hover:text-white",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500/60",
            )}
          >
            <span
              className="inline-block size-2 rounded-full bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#515bd4]"
              aria-hidden
            />
            Ver perfil en Instagram
          </a>
        </Reveal>
      </div>
    </section>
  );
}
