"use client";

import { useEffect, useState } from "react";

/** Touch-first / narrow viewport — lighter motion profile */
export const COARSE_MOBILE_MQ = "(max-width: 767px)";

export function useCoarseMobile() {
  const [isCoarseMobile, setIsCoarseMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(COARSE_MOBILE_MQ);
    const sync = () => setIsCoarseMobile(mediaQuery.matches);
    sync();
    mediaQuery.addEventListener("change", sync);
    return () => mediaQuery.removeEventListener("change", sync);
  }, []);

  return isCoarseMobile;
}
