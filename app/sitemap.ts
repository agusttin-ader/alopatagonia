import type { MetadataRoute } from "next";

import { getDestinationSlugs } from "@/lib/catalog/destinations";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://alopatagonia.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const destinationUrls = getDestinationSlugs().map((slug) => ({
    url: `${siteUrl}/destinos/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/destinos`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...destinationUrls,
    {
      url: `${siteUrl}/invierno`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
