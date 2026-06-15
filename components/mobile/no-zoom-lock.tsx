"use client";

import { useEffect } from "react";

/** Bloquea pinch-zoom en iOS Safari; el viewport meta cubre el resto. Sin listeners de touchmove/touchend para no trabar el scroll. */
export function NoZoomLock() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: coarse)").matches) return;

    const preventGesture = (event: Event) => {
      event.preventDefault();
    };

    document.addEventListener("gesturestart", preventGesture, { passive: false });
    document.addEventListener("gesturechange", preventGesture, { passive: false });
    document.addEventListener("gestureend", preventGesture, { passive: false });

    return () => {
      document.removeEventListener("gesturestart", preventGesture);
      document.removeEventListener("gesturechange", preventGesture);
      document.removeEventListener("gestureend", preventGesture);
    };
  }, []);

  return null;
}
