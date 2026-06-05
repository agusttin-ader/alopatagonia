/** URL pública canónica del sitio (SEO, sitemap, robots, Open Graph). */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.alopatagonia.com";
}
