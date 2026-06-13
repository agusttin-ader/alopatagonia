"use client";

import { motion } from "framer-motion";
import type { Transition } from "framer-motion";

import { EscapadasExpressMedia } from "@/components/about/EscapadasExpressMedia";
import type { EscapadaExpressPromo } from "@/lib/escapadas-express";
import { cn } from "@/lib/utils";

const CARD_EASE = [0.22, 1, 0.36, 1] as const;

type EscapadasExpressThumbnailCardProps = {
  promo: EscapadaExpressPromo;
  index: number;
  onSelect: () => void;
  layoutId?: string;
  layoutTransition?: Transition;
  className?: string;
};

export function EscapadasExpressThumbnailCard({
  promo,
  index,
  onSelect,
  layoutId,
  layoutTransition,
  className,
}: EscapadasExpressThumbnailCardProps) {
  return (
    <motion.button
      type="button"
      layout
      onClick={onSelect}
      aria-label={`Ver ${promo.title}`}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{
        layout: layoutTransition ?? { duration: 0.65, ease: CARD_EASE },
        opacity: { duration: 0.35, ease: CARD_EASE },
        scale: { duration: 0.4, ease: CARD_EASE },
      }}
      whileHover={{ y: -3, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative h-[6.25rem] w-[4rem] shrink-0 overflow-hidden bg-black text-left sm:h-[6.75rem] sm:w-[4.35rem] lg:h-[7.25rem] lg:w-[4.65rem]",
        "shadow-[0_10px_28px_-16px_rgba(0,0,0,0.7)] ring-1 ring-white/20",
        "hover:ring-white/40",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        className,
      )}
    >
      <motion.div
        layoutId={layoutId}
        className="absolute inset-0 z-0 overflow-hidden bg-black"
        transition={layoutTransition ?? { duration: 0.65, ease: CARD_EASE }}
      >
        <EscapadasExpressMedia
          media={promo.media}
          isActive={false}
          qualityPreset="card"
          sizes="80px"
        />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/55 to-transparent"
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-black/95 via-black/80 to-transparent px-2 pb-2 pt-6">
        <span className="mb-1 block h-px w-5 bg-white/90" aria-hidden />
        <p className="line-clamp-2 text-[0.58rem] font-medium leading-tight text-white/88">
          {promo.subtitle}
        </p>
        <p className="font-heading mt-0.5 line-clamp-2 text-[0.62rem] font-semibold uppercase leading-tight tracking-[0.05em] text-white">
          {promo.title}
        </p>
        <span className="sr-only">
          {promo.highlights[0]} · Promo {String(index + 1).padStart(2, "0")}
        </span>
      </div>
    </motion.button>
  );
}
