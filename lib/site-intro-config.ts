import {
  buildNextImageUrl,
  IMAGE_PRELOAD_WIDTH,
  IMAGE_QUALITY_INTRO,
} from "@/lib/image-config";

/** Keep in sync with SITE_INTRO_BOOT_SCRIPT (next/script in root layout) */
export const SITE_INTRO_STORAGE_KEY = "alo-site-intro-seen-v2";

export const SITE_INTRO_LOGO = "/images/logo/logo-alo.png";

/** Foto de fondo del splash de intro (con overlay oscuro encima). */
export const SITE_INTRO_IMAGE = "/images/intro.jpg";

export const SITE_INTRO_IMAGE_PRELOAD = buildNextImageUrl(SITE_INTRO_IMAGE, {
  width: IMAGE_PRELOAD_WIDTH.introDesktop,
  quality: IMAGE_QUALITY_INTRO,
});

export const HERO_POSTER = "/videos/hero-poster.jpg";
export const SITE_INTRO_FALLBACK_BG = "#0a0f0d";

export const SITE_INTRO_OVERLAY_CSS =
  "linear-gradient(to bottom, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.62) 45%, rgba(0,0,0,0.8) 100%)";

/** En true: cada carga ejecuta intro. En false: una vez por sesión al ingresar. */
export const SITE_INTRO_ALWAYS_SHOW = false;

/**
 * Scroll al inicio y bloqueo de intro solo en home (sin precargar imágenes duplicadas).
 */
export const SITE_INTRO_BOOT_SCRIPT = `(function(){try{if("scrollRestoration" in window.history)window.history.scrollRestoration="manual";var home=location.pathname==="/"||location.pathname==="";if(home&&location.hash){history.replaceState(null,"",location.pathname+location.search);}window.scrollTo(0,0);function sc(){scrollTo(0,0)}window.addEventListener("pageshow",function(e){if(e.persisted)sc()},false);var r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;var a=${SITE_INTRO_ALWAYS_SHOW};var s=sessionStorage.getItem("${SITE_INTRO_STORAGE_KEY}")==="1";if(!home||r||(!a&&s)){document.body.classList.remove("site-intro-pending");return;}document.body.classList.add("site-intro-pending");}catch(e){document.body.classList.remove("site-intro-pending");}})();`;

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

export function setSiteIntroPending(pending: boolean) {
  if (typeof document === "undefined") return;
  document.body.classList.toggle("site-intro-pending", pending);
}

export function setSiteIntroPlaceholderHidden(hidden: boolean) {
  if (typeof document === "undefined") return;
  document.body.classList.toggle("site-intro-placeholder-off", hidden);
}
