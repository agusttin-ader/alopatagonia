import {
  buildNextImageUrl,
  IMAGE_PRELOAD_WIDTH,
  IMAGE_QUALITY_INTRO,
} from "@/lib/image-config";

/** Keep in sync with runSiteIntroBoot() (instrumentation-client.ts) */
export const SITE_INTRO_STORAGE_KEY = "alo-site-intro-seen-v2";

export const SITE_INTRO_LOGO = "/images/logo/logo-alo.png";

/** Foto de fondo del splash de intro (con overlay oscuro encima). */
export const SITE_INTRO_IMAGE = "/images/intro.jpg";

export const SITE_INTRO_IMAGE_PRELOAD = buildNextImageUrl(SITE_INTRO_IMAGE, {
  width: IMAGE_PRELOAD_WIDTH.introDesktop,
  quality: IMAGE_QUALITY_INTRO,
});

export const SITE_INTRO_FALLBACK_BG = "#1a2f26";

export const SITE_INTRO_OVERLAY_CSS =
  "linear-gradient(to bottom, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.62) 45%, rgba(0,0,0,0.8) 100%)";

/** En true: cada carga ejecuta intro. En false: una vez por sesión al ingresar. */
export const SITE_INTRO_ALWAYS_SHOW = false;

function preloadIntroImage() {
  if (typeof document === "undefined") return;
  if (document.querySelector('link[data-alo-intro-preload]')) return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = SITE_INTRO_IMAGE_PRELOAD;
  link.setAttribute("data-alo-intro-preload", "");
  link.fetchPriority = "high";
  document.head.appendChild(link);
}

/**
 * Boot de intro: scroll al inicio y clase `site-intro-pending` en <html>.
 * Se ejecuta desde instrumentation-client.ts (antes de hidratar React).
 */
export function runSiteIntroBoot(): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  try {
    const root = document.documentElement;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const home =
      window.location.pathname === "/" || window.location.pathname === "";

    if (home && window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }

    window.scrollTo(0, 0);

    const scrollHome = () => scrollTo(0, 0);
    window.addEventListener(
      "pageshow",
      (event) => {
        if (event.persisted) scrollHome();
      },
      false,
    );

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = window.sessionStorage.getItem(SITE_INTRO_STORAGE_KEY) === "1";

    if (!home || reduceMotion || (!SITE_INTRO_ALWAYS_SHOW && seen)) {
      root.classList.remove("site-intro-pending");
      return;
    }

    root.classList.add("site-intro-pending");
    preloadIntroImage();
  } catch {
    document.documentElement.classList.remove("site-intro-pending");
  }
}

/** CSS crítico inline: oculta la home en el primer paint si el boot ya marcó intro pendiente. */
export const SITE_INTRO_CRITICAL_CSS = `
html.site-intro-pending{background-color:${SITE_INTRO_FALLBACK_BG}!important;background-image:none!important}
html.site-intro-pending #site-app-shell{visibility:hidden!important}
html.site-intro-pending #site-intro-placeholder{display:flex!important}
html.site-intro-exiting #site-intro-placeholder{display:flex!important}
html.site-intro-placeholder-off #site-intro-placeholder{display:none!important}
`.replace(/\s+/g, " ");

/** Logo grande → se achica a la izquierda + wordmark → capa sube */
export const SITE_INTRO_TIMELINE_MS = {
  letter: 1500,
  word: 1500,
  exit: 900,
} as const;

export const SITE_INTRO_HIDE_AFTER_MS =
  SITE_INTRO_TIMELINE_MS.letter +
  SITE_INTRO_TIMELINE_MS.word +
  SITE_INTRO_TIMELINE_MS.exit;

/** Fallback del hero si el evento de reveal no llega. */
export const SITE_INTRO_REVEAL_FALLBACK_MS = SITE_INTRO_HIDE_AFTER_MS + 1200;

export function shouldPlaySiteIntro(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (SITE_INTRO_ALWAYS_SHOW) return true;
  return window.sessionStorage.getItem(SITE_INTRO_STORAGE_KEY) !== "1";
}

function getSiteIntroRoot(): HTMLElement | null {
  if (typeof document === "undefined") return null;
  return document.documentElement;
}

export function isSiteIntroPending(): boolean {
  return getSiteIntroRoot()?.classList.contains("site-intro-pending") ?? false;
}

export function setSiteIntroPending(pending: boolean) {
  getSiteIntroRoot()?.classList.toggle("site-intro-pending", pending);
}

export function setSiteIntroPlaceholderHidden(hidden: boolean) {
  getSiteIntroRoot()?.classList.toggle("site-intro-placeholder-off", hidden);
}

export function setSiteIntroExiting(exiting: boolean) {
  getSiteIntroRoot()?.classList.toggle("site-intro-exiting", exiting);
}

export function initSiteIntroVisibility(): boolean {
  if (typeof window === "undefined") return false;
  const home = window.location.pathname === "/" || window.location.pathname === "";
  const play = home && shouldPlaySiteIntro();
  if (play) setSiteIntroPending(true);
  return play;
}
