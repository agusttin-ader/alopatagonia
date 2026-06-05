import type { MetadataRoute } from "next";

import { getDestinationSlugs } from "@/lib/catalog/destinations";
import { CATALOG_HUB_PILLARS } from "@/lib/catalog-hub/config";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

/** Actualizar al publicar cambios editoriales relevantes para Google. */
const SITE_LAST_MODIFIED = new Date("2026-06-05");

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
    priority: 0.8,
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
    {
      url: `${siteUrl}/invierno`,
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
