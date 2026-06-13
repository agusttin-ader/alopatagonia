import { defineRouting } from "next-intl/routing";

export const locales = ["es", "en", "pt"] as const;
export type AppLocale = (typeof locales)[number];

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale: "es",
  /** Español sin prefijo (/); EN y PT con /en y /pt. */
  localePrefix: "as-needed",
});

export const localeLabels: Record<AppLocale, string> = {
  es: "ES",
  en: "EN",
  pt: "PT",
};

/** Nombre completo para accesibilidad y UI expandida. */
export const localeNames: Record<AppLocale, string> = {
  es: "Español",
  en: "English",
  pt: "Português",
};
