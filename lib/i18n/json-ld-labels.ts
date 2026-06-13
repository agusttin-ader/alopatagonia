import type { AppLocale } from "@/i18n/routing";

export type JsonLdBreadcrumbLabels = {
  home: string;
  destinations: string;
};

export function localeToSchemaLanguage(locale: AppLocale): string {
  switch (locale) {
    case "en":
      return "en";
    case "pt":
      return "pt-BR";
    default:
      return "es-AR";
  }
}
