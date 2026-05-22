/** Keep in sync with SITE_INTRO_BOOT_SCRIPT (next/script in root layout) */
export const SITE_INTRO_STORAGE_KEY = "alo-site-intro-seen-v2";

export const SITE_INTRO_IMAGE = "/images/intro.jpg";

/** Inline boot script — use only via next/script `beforeInteractive` in root layout */
export const SITE_INTRO_BOOT_SCRIPT = `(function(){try{var r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;var a=true;var s=sessionStorage.getItem("${SITE_INTRO_STORAGE_KEY}")==="1";if(!r&&(a||!s)){document.body.classList.add("site-intro-pending");var i=new Image();i.src="${SITE_INTRO_IMAGE}";}}catch(e){}})();`;

/** letter → word → hold (texto sobre imagen) → exit (capa sube) */
export const SITE_INTRO_TIMELINE_MS = {
  letter: 980,
  word: 1100,
  hold: 900,
  exit: 1200,
} as const;

export const SITE_INTRO_HIDE_AFTER_MS =
  SITE_INTRO_TIMELINE_MS.letter +
  SITE_INTRO_TIMELINE_MS.word +
  SITE_INTRO_TIMELINE_MS.hold +
  SITE_INTRO_TIMELINE_MS.exit;

/** Set false for production: show intro once per browser session */
export const SITE_INTRO_ALWAYS_SHOW = true;

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

export function setSiteIntroPlaceholderVisible(visible: boolean) {
  if (typeof document === "undefined") return;
  const placeholder = document.getElementById("site-intro-placeholder");
  if (!placeholder) return;
  placeholder.style.display = visible ? "block" : "none";
}
