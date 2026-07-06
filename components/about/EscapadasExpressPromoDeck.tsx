"use client";

import { EscapadasExpressMobileDeck } from "@/components/about/EscapadasExpressMobileDeck";
import { EscapadasExpressTimedCarousel } from "@/components/about/EscapadasExpressTimedCarousel";
import type { EscapadaExpressPromo } from "@/lib/escapadas-express";

type EscapadasExpressPromoDeckProps = {
  promos: EscapadaExpressPromo[];
};

export function EscapadasExpressPromoDeck({ promos }: EscapadasExpressPromoDeckProps) {
  if (promos.length === 0) return null;

  return (
    <>
      <div className="md:hidden">
        <EscapadasExpressMobileDeck promos={promos} />
      </div>
      <div className="hidden md:block">
        <EscapadasExpressTimedCarousel promos={promos} />
      </div>
    </>
  );
}
