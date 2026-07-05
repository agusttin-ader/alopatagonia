import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import type { CatalogItemEntry } from "@/lib/catalog/catalog-items";
import type { DestinationCatalog } from "@/lib/catalog/types";
import { buildLocalizedPageMetadata } from "@/lib/seo-i18n";
import { getDestinationSeo, getDestinationSeoKeywords, SITE_SEO } from "@/lib/seo-destinations";
import { SITE } from "@/lib/site";

type HubPageKey = "home" | "destinos" | "alojamientos" | "excursiones" | "planner" | "invierno";

const HUB_PATHS: Record<HubPageKey, string> = {
  home: "/",
  destinos: "/destinos",
  alojamientos: "/alojamientos",
  excursiones: "/excursiones",
  planner: "/planear-mi-viaje",
  invierno: "/invierno",
};

const SITE_SEO_MAP = {
  home: SITE_SEO.home,
  destinos: SITE_SEO.destinos,
  alojamientos: SITE_SEO.alojamientos,
  excursiones: SITE_SEO.excursiones,
  planner: SITE_SEO.planner,
} as const;

export async function buildHubPageMetadata(
  locale: AppLocale,
  page: HubPageKey,
  extras?: {
    ogImage?: string;
    ogImageAlt?: string;
    index?: boolean;
  },
): Promise<Metadata> {
  const t = await getTranslations("seo");
  const path = HUB_PATHS[page];

  if (locale === "es" && page in SITE_SEO_MAP) {
    const seo = SITE_SEO_MAP[page as keyof typeof SITE_SEO_MAP];
    return buildLocalizedPageMetadata({
      locale,
      path,
      title: seo.title,
      description: seo.description,
      keywords: [...seo.keywords],
      titleOrder: "keyword-first",
      ...extras,
    });
  }

  return buildLocalizedPageMetadata({
    locale,
    path,
    title: t(`${page}.title`),
    description: t(`${page}.description`),
    keywords: t.raw(`${page}.keywords`) as string[],
    titleOrder: "keyword-first",
    ...extras,
  });
}

export async function buildDestinationPageMetadata(
  locale: AppLocale,
  destination: DestinationCatalog,
): Promise<Metadata> {
  const t = await getTranslations("seo");
  const tHome = await getTranslations("homeDestinations");
  const slug = destination.slug;
  const path = `/destinos/${slug}`;
  const nameKey = `destinations.${slug}.name`;
  const introKey = `destinations.${slug}.description`;
  const name = tHome.has(nameKey) ? tHome(nameKey) : destination.name;
  const intro = tHome.has(introKey) ? tHome(introKey) : destination.intro;

  if (locale === "es") {
    const seo = getDestinationSeo(slug);
    return buildLocalizedPageMetadata({
      locale,
      path,
      title: seo?.seoTitle ?? t("destination.title", { name }),
      description: seo?.seoDescription ?? intro,
      ogImage: destination.heroImage,
      ogImageAlt: t("destination.ogAlt", { name, site: SITE.name }),
      keywords: seo?.keywords,
      titleOrder: "keyword-first",
    });
  }

  return buildLocalizedPageMetadata({
    locale,
    path,
    title: t("destination.title", { name }),
    description: intro,
    ogImage: destination.heroImage,
    ogImageAlt: t("destination.ogAlt", { name, site: SITE.name }),
    keywords: getDestinationSeoKeywords(slug),
    titleOrder: "keyword-first",
  });
}

export async function buildCatalogItemPageMetadata(
  locale: AppLocale,
  entry: CatalogItemEntry,
): Promise<Metadata> {
  const t = await getTranslations("seo");
  const tHome = await getTranslations("homeDestinations");
  const { destination, item } = entry;
  const slug = destination.slug;
  const path = `/destinos/${slug}/${item.itemSlug}`;
  const nameKey = `destinations.${slug}.name`;
  const destName = tHome.has(nameKey) ? tHome(nameKey) : destination.name;
  const kindLabel =
    entry.kind === "accommodation"
      ? t("catalogItem.kindAccommodation")
      : t("catalogItem.kindExcursion");
  const heroImage = item.images[0]?.src ?? destination.heroImage;
  const itemKeywords = [
    item.name.toLowerCase(),
    `${kindLabel} ${destName.toLowerCase()}`,
    ...(entry.kind === "excursion" && item.category
      ? [`${item.category} ${destName.toLowerCase()}`]
      : []),
    ...getDestinationSeoKeywords(slug),
  ];

  return buildLocalizedPageMetadata({
    locale,
    path,
    title: t("catalogItem.title", { name: item.name, destination: destName, kind: kindLabel }),
    description:
      item.description ??
      t("catalogItem.descriptionFallback", {
        name: item.name,
        destination: destName,
        kind: kindLabel,
      }),
    ogImage: heroImage,
    ogImageAlt: t("catalogItem.ogAlt", { name: item.name, destination: destName, site: SITE.name }),
    keywords: itemKeywords,
    titleOrder: "keyword-first",
  });
}

export async function buildNotFoundMetadata(locale: AppLocale): Promise<Metadata> {
  const t = await getTranslations("notFound");

  return buildLocalizedPageMetadata({
    locale,
    path: "/404",
    title: t("metaTitle"),
    description: t("metaDescription"),
    index: false,
  });
}
