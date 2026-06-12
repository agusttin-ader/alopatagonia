"use client";

import { useEffect } from "react";

import { PLANNER_PATH, SECTION_IDS } from "@/lib/constants";

/** Redirige enlaces viejos `/#planear-viaje` a la página dedicada del planner. */
export function PlannerLegacyHashRedirect() {
  useEffect(() => {
    if (window.location.hash !== `#${SECTION_IDS.planner}`) return;
    window.location.replace(PLANNER_PATH);
  }, []);

  return null;
}
