import type { Metadata, MetadataRoute } from "next";

import { routing, type AppLocale } from "@/i18n/routing";
import { buildPageMetadata, type PageSeoOptions } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

const OG_LOCALE: Record<AppLocale, string> = {
  es: "es_AR",
  en: "en_US",
  pt: "pt_BR",
};

/** Ruta interna sin prefijo de locale (ej. `/destinos`, `/`). */
export function getLocalizedPath(path: string, locale: AppLocale): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const suffix = normalized === "/" ? "" : normalized;

  if (locale === routing.defaultLocale) {
    return suffix || "/";
  }

  return `/${locale}${suffix}`;
}

export function getLocalizedAbsoluteUrl(path: string, locale: AppLocale): string {
  const localizedPath = getLocalizedPath(path, locale);
  const siteUrl = getSiteUrl().replace(/\/$/, "");

  if (localizedPath === "/") {
    return `${siteUrl}/`;
  }

  return `${siteUrl}${localizedPath}`;
}

export function buildLanguageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of routing.locales) {
    languages[locale] = getLocalizedAbsoluteUrl(path, locale);
  }

  languages["x-default"] = getLocalizedAbsoluteUrl(path, routing.defaultLocale);
  return languages;
}

export type LocalizedPageSeoOptions = PageSeoOptions & {
  locale: AppLocale;
};

export function buildLocalizedPageMetadata({
  locale,
  path,
  ...options
}: LocalizedPageSeoOptions): Metadata {
  const canonical = getLocalizedAbsoluteUrl(path, locale);
  const base = buildPageMetadata({
    ...options,
    path: getLocalizedPath(path, locale),
  });

  const alternateLocales = routing.locales
    .filter((item) => item !== locale)
    .map((item) => OG_LOCALE[item]);

  return {
    ...base,
    alternates: {
      canonical,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      ...base.openGraph,
      locale: OG_LOCALE[locale],
      alternateLocale: alternateLocales,
      url: canonical,
    },
  };
}

export function localizedSitemapEntries(
  path: string,
  options: {
    lastModified: Date;
    changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
    priority: number;
  },
): MetadataRoute.Sitemap {
  const languages = buildLanguageAlternates(path);

  return routing.locales.map((locale) => ({
    url: languages[locale]!,
    lastModified: options.lastModified,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: { languages },
  }));
}
