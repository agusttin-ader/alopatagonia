import Link from "next/link";

import { AppImage } from "@/components/media/AppImage";
import { PLANNER_BANNER, PLANNER_PAGE_COPY } from "@/lib/constants";
import { IMAGE_SIZES } from "@/lib/image-config";

export function TripPlannerPageIntro() {
  return (
    <section
      className="relative flex min-h-[40vh] flex-col justify-end overflow-hidden px-4 pb-10 pt-28 sm:min-h-[44vh] sm:px-8 sm:pb-12 sm:pt-32 lg:px-14 2xl:px-20"
      aria-labelledby="planner-page-heading"
    >
      <AppImage
        src={PLANNER_BANNER.src}
        alt={PLANNER_BANNER.alt}
        fill
        priority
        qualityPreset="hero"
        className="object-cover"
        sizes={IMAGE_SIZES.viewport}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/80 via-black/45 via-55% to-black/10"
        aria-hidden
      />
      <div className="relative z-[3] mx-auto w-full max-w-7xl 2xl:max-w-[90rem]">
        <nav className="mb-4 text-sm text-white/88 [text-shadow:0_1px_4px_rgba(0,0,0,0.45)]">
          <Link href="/" className="hover:text-white">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{PLANNER_PAGE_COPY.title}</span>
        </nav>
        <p className="text-sm font-medium text-white/92 [text-shadow:0_1px_4px_rgba(0,0,0,0.45)]">
          Patagonia Argentina
        </p>
        <h1
          id="planner-page-heading"
          className="font-heading mt-2 max-w-3xl text-3xl font-medium tracking-tight text-white sm:text-4xl 2xl:text-5xl [text-shadow:0_2px_10px_rgba(0,0,0,0.42)]"
        >
          {PLANNER_PAGE_COPY.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/94 sm:text-lg [text-shadow:0_1px_6px_rgba(0,0,0,0.4)]">
          {PLANNER_PAGE_COPY.description}
        </p>
      </div>
    </section>
  );
}
