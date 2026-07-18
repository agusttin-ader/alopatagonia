"use client";

import { useEffect, useState } from "react";

import { EscapadasExpressMobileDeck } from "@/components/about/EscapadasExpressMobileDeck";
import { EscapadasExpressTimedCarousel } from "@/components/about/EscapadasExpressTimedCarousel";
import type { EscapadaExpressPromo } from "@/lib/escapadas-express";

const DESKTOP_PROMO_MQ = "(min-width: 768px)";

type EscapadasExpressPromoDeckProps = {
  promos: EscapadaExpressPromo[];
};

export function EscapadasExpressPromoDeck({ promos }: EscapadasExpressPromoDeckProps) {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_PROMO_MQ);
    const sync = () => setIsDesktop(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  if (promos.length === 0) return null;

  if (isDesktop === null) {
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

  return isDesktop ? (
    <EscapadasExpressTimedCarousel promos={promos} />
  ) : (
    <EscapadasExpressMobileDeck promos={promos} />
  );
}
