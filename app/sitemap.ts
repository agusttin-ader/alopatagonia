import type { MetadataRoute } from "next";

import { getAllCatalogItemParams } from "@/lib/catalog/catalog-items";
import { getDestinationSlugs } from "@/lib/catalog/destinations";
import { CATALOG_HUB_PILLARS } from "@/lib/catalog-hub/config";
import { PLANNER_PATH } from "@/lib/constants";
import { localizedSitemapEntries } from "@/lib/seo-i18n";

/** Actualizar al publicar cambios editoriales relevantes para Google. */
const SITE_LAST_MODIFIED = new Date("2026-07-05");

const catalogHubPaths = CATALOG_HUB_PILLARS.filter((pillar) => pillar.status === "live").map(
  (pillar) => ({
    path: pillar.href,
    priority: pillar.slug === "destinos" ? 0.9 : 0.75,
  }),
);

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths: Array<{
    path: string;
    priority: number;
    changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  }> = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    ...catalogHubPaths.map((item) => ({
      ...item,
      changeFrequency: "weekly" as const,
    })),
    { path: PLANNER_PATH, priority: 0.85, changeFrequency: "monthly" },
    { path: "/invierno", priority: 0.7, changeFrequency: "weekly" },
  ];

  const destinationPaths = getDestinationSlugs().map((slug) => ({
    path: `/destinos/${slug}`,
    priority: 0.9,
    changeFrequency: "weekly" as const,
  }));

  const catalogItemPaths = getAllCatalogItemParams().map(({ slug, itemSlug }) => ({
    path: `/destinos/${slug}/${itemSlug}`,
    priority: 0.7,
    changeFrequency: "weekly" as const,
  }));

  const allPaths = [...staticPaths, ...destinationPaths, ...catalogItemPaths];

  return allPaths.flatMap(({ path, priority, changeFrequency }) =>
    localizedSitemapEntries(path, {
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency,
      priority,
    }),
  );
}
