"use client";

import { useLayoutEffect } from "react";

import { preloadAboutUsImages } from "@/lib/about-us-images";

/** Precarga las fotos de Quiénes somos al abrir la home. */
export function AboutUsImagePreload() {
  useLayoutEffect(() => {
    preloadAboutUsImages();
  }, []);

  return null;
}
