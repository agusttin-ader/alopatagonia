import {
  buildNextImageUrl,
  IMAGE_PRELOAD_WIDTH,
  IMAGE_QUALITY_INTRO,
} from "@/lib/image-config";

/** Keep in sync with SITE_INTRO_BOOT_SCRIPT (next/script in root layout) */
export const SITE_INTRO_STORAGE_KEY = "alo-site-intro-seen-v2";

export const SITE_INTRO_IMAGE = "/images/intro.jpg";
export const SITE_INTRO_IMAGE_OPTIMIZED_MOBILE = buildNextImageUrl(SITE_INTRO_IMAGE, {
  width: IMAGE_PRELOAD_WIDTH.introMobile,
  quality: IMAGE_QUALITY_INTRO,
});
export const SITE_INTRO_IMAGE_OPTIMIZED_DESKTOP = buildNextImageUrl(SITE_INTRO_IMAGE, {
  width: IMAGE_PRELOAD_WIDTH.introDesktop,
  quality: IMAGE_QUALITY_INTRO,
});
export const HERO_POSTER = "/videos/hero-poster.jpg";
/** Tono oscuro cercano a intro.jpg (solo respaldo mínimo detrás de la foto) */
export const SITE_INTRO_FALLBACK_BG = "#0a0f0d";

/** Mismo overlay que `components/motion/site-intro.tsx` */
export const SITE_INTRO_OVERLAY_CSS =
  "linear-gradient(to bottom, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.62) 45%, rgba(0,0,0,0.8) 100%)";

/** En true: cada carga ejecuta intro. En false (recomendado prod): una vez por sesión. */
export const SITE_INTRO_ALWAYS_SHOW = true;

/**
 * Scroll al inicio y bloque de restauración agresiva del navegador (evita quedar
 * medio scroll tras refresh / BFCache).
 */
export const SITE_INTRO_BOOT_SCRIPT = `(function(){try{if("scrollRestoration" in window.history)window.history.scrollRestoration="manual";var home=location.pathname==="/"||location.pathname==="";if(home&&location.hash){history.replaceState(null,"",location.pathname+location.search);}window.scrollTo(0,0);function sc(){scrollTo(0,0)}window.addEventListener("pageshow",function(e){if(e.persisted)sc()},false);window.addEventListener("load",sc,true);var r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;var a=${SITE_INTRO_ALWAYS_SHOW};var s=sessionStorage.getItem("${SITE_INTRO_STORAGE_KEY}")==="1";if(r||(!a&&s)){document.body.classList.remove("site-intro-pending");return;}document.body.classList.add("site-intro-pending");var i=new Image();i.fetchPriority="high";i.src="${SITE_INTRO_IMAGE}";i.onload=function(){var p=new Image();p.src="${HERO_POSTER}";};}catch(e){document.body.classList.remove("site-intro-pending");}})();`;

/** A grande → palabra completa → capa sube */
export const SITE_INTRO_TIMELINE_MS = {
  letter: 1100,
  word: 1700,
  exit: 1100,
} as const;

export const SITE_INTRO_HIDE_AFTER_MS =
  SITE_INTRO_TIMELINE_MS.letter +
  SITE_INTRO_TIMELINE_MS.word +
  SITE_INTRO_TIMELINE_MS.exit;

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

/** Oculta el placeholder SSR cuando la intro animada de React ya está activa */
export function setSiteIntroPlaceholderHidden(hidden: boolean) {
  if (typeof document === "undefined") return;
  document.body.classList.toggle("site-intro-placeholder-off", hidden);
}
