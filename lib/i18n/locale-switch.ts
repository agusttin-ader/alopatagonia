import { type AppLocale } from "@/i18n/routing";
import { getLocalizedPath } from "@/lib/seo-i18n";

const LOCALE_SWITCH_FADE_KEY = "alo-locale-switch-fade";
const LOCALE_COOKIE_NAME = "NEXT_LOCALE";
const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const FADE_MS = 280;

function persistLocaleChoice(locale: AppLocale): void {
  if (typeof document === "undefined") return;

  document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
}

/** Navegación completa — evita el fetch RSC frágil de router.replace al cambiar locale. */
export function navigateToLocale(
  pathname: string,
  locale: AppLocale,
  options?: { reduceMotion?: boolean | null },
): void {
  persistLocaleChoice(locale);
  const href = getLocalizedPath(pathname, locale);

  if (options?.reduceMotion) {
    window.location.assign(href);
    return;
  }

  try {
    sessionStorage.setItem(LOCALE_SWITCH_FADE_KEY, "1");
  } catch {
    // sessionStorage blocked — navigate without fade
    window.location.assign(href);
    return;
  }

  const root = document.documentElement;
  root.style.transition = `opacity ${FADE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`;
  root.style.opacity = "0";

  window.setTimeout(() => {
    window.location.assign(href);
  }, FADE_MS);
}

export function shouldFadeInAfterLocaleSwitch(): boolean {
  if (typeof window === "undefined") return false;

  try {
    if (sessionStorage.getItem(LOCALE_SWITCH_FADE_KEY) !== "1") return false;
    sessionStorage.removeItem(LOCALE_SWITCH_FADE_KEY);
    return true;
  } catch {
    return false;
  }
}
