import { ABOUT_US_COPY } from "@/lib/about-pages";
import { getFirstHeroCarouselSrc, getHeroVideoSrc, HERO_CAROUSEL_CANDIDATES } from "@/lib/hero-video";

/** Poster del hero — primera foto editorial (fallback estable para SSR/preload). */
export const HERO_POSTER_SRC = ABOUT_US_COPY.images[0]?.src ?? "/images/quienes-somos/quienes-somos-1.jpg";

const FIRST_HERO_CANDIDATE = HERO_CAROUSEL_CANDIDATES[0];

/** Preloads del primer clip del carrusel, acotados por breakpoint. */
export const HERO_VIDEO_PRELOADS = [
  {
    href: getHeroVideoSrc(FIRST_HERO_CANDIDATE, "desktop"),
    media: "(min-width: 901px)",
  },
  {
    href: getHeroVideoSrc(FIRST_HERO_CANDIDATE, "mobile"),
    media: "(min-width: 391px) and (max-width: 900px)",
  },
  {
    href: getHeroVideoSrc(FIRST_HERO_CANDIDATE, "mobileLite"),
    media: "(max-width: 390px)",
  },
] as const;

function appendPreloadLink(options: {
  href: string;
  as: "fetch" | "image";
  type?: string;
  media?: string;
  fetchPriority?: "high" | "low" | "auto";
  marker: string;
}) {
  if (typeof document === "undefined") return;

  const selector = `link[data-alo-preload="${options.marker}"][href="${options.href}"]`;
  if (document.head.querySelector(selector)) return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = options.as;
  link.href = options.href;
  if (options.type) link.type = options.type;
  if (options.media) link.media = options.media;
  if (options.fetchPriority) link.fetchPriority = options.fetchPriority;
  link.setAttribute("data-alo-preload", options.marker);
  document.head.appendChild(link);
}

/** Preload temprano del poster + primer video del hero (home). */
export function preloadHomeCriticalMedia(viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1280) {
  appendPreloadLink({
    href: HERO_POSTER_SRC,
    as: "image",
    fetchPriority: "high",
    marker: "hero-poster",
  });

  const videoHref = getFirstHeroCarouselSrc(viewportWidth);
  appendPreloadLink({
    href: videoHref,
    as: "fetch",
    type: "video/mp4",
    fetchPriority: "high",
    marker: "hero-video",
  });
}
