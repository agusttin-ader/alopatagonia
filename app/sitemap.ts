import type { MetadataRoute } from "next";

import { getAllCatalogItemParams } from "@/lib/catalog/catalog-items";
import { getDestinationSlugs } from "@/lib/catalog/destinations";
import { CATALOG_HUB_PILLARS } from "@/lib/catalog-hub/config";
import { PLANNER_PATH } from "@/lib/constants";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

/** Actualizar al publicar cambios editoriales relevantes para Google. */
const SITE_LAST_MODIFIED = new Date("2026-06-07");

const catalogHubUrls = CATALOG_HUB_PILLARS.filter((pillar) => pillar.status === "live").map(
  (pillar) => ({
    url: `${siteUrl}${pillar.href}`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: pillar.slug === "destinos" ? 0.9 : 0.75,
  }),
);

export default function sitemap(): MetadataRoute.Sitemap {
  const destinationUrls = getDestinationSlugs().map((slug) => ({
    url: `${siteUrl}/destinos/${slug}`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const catalogItemUrls = getAllCatalogItemParams().map(({ slug, itemSlug }) => ({
    url: `${siteUrl}/destinos/${slug}/${itemSlug}`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: `${siteUrl}/`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...catalogHubUrls,
    ...destinationUrls,
    ...catalogItemUrls,
    {
      url: `${siteUrl}${PLANNER_PATH}`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/invierno`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
