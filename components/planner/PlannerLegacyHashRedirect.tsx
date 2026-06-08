"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { PLANNER_PATH, SECTION_IDS } from "@/lib/constants";

/** Redirige enlaces viejos `/#planear-viaje` a la página dedicada del planner. */
export function PlannerLegacyHashRedirect() {
  const router = useRouter();

  useEffect(() => {
    if (window.location.hash !== `#${SECTION_IDS.planner}`) return;
    router.replace(PLANNER_PATH);
  }, [router]);

  return null;
}
