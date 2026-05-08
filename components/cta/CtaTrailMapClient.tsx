"use client";

import dynamic from "next/dynamic";

const CtaTrailMapDynamic = dynamic(
  () => import("@/components/cta/cta-trail-map").then((mod) => mod.CtaTrailMap),
  { ssr: false },
);

export function CtaTrailMapClient() {
  return <CtaTrailMapDynamic />;
}
