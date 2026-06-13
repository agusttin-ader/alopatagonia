"use client";

import { EscapadasExpressTimedCarousel } from "@/components/about/EscapadasExpressTimedCarousel";
import type { EscapadaExpressPromo } from "@/lib/escapadas-express";

type EscapadasExpressPromoDeckProps = {
  promos: EscapadaExpressPromo[];
};

export function EscapadasExpressPromoDeck({ promos }: EscapadasExpressPromoDeckProps) {
  if (promos.length === 0) return null;

  return <EscapadasExpressTimedCarousel promos={promos} />;
}
