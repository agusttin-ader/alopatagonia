import type { Metadata } from "next";

import { SITE } from "@/lib/site";

const DEFAULT_OG_IMAGE = SITE.ogImage;
const DEFAULT_OG_IMAGE_WIDTH = SITE.ogImageWidth;
const DEFAULT_OG_IMAGE_HEIGHT = SITE.ogImageHeight;

export const SITE_TITLE_PREFIX = "Alo Patagonia | ";

/** Título completo con marca al inicio (SEO + Open Graph). */
export function formatSiteTitle(pageTitle: string): string {
  if (pageTitle.startsWith(SITE_TITLE_PREFIX)) return pageTitle;
  return `${SITE_TITLE_PREFIX}${pageTitle}`;
}

type PageSeoOptions = {
  /** Parte descriptiva; se antepone «Alo Patagonia |» automáticamente. */
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogImageAlt?: string;
  index?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = SITE.ogImageAlt,
  index = true,
}: PageSeoOptions): Metadata {
  const fullTitle = formatSiteTitle(title);

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    robots: {
      index,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: "es_AR",
      url: path,
      siteName: SITE.name,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: DEFAULT_OG_IMAGE_WIDTH,
          height: DEFAULT_OG_IMAGE_HEIGHT,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: `@${SITE.instagramHandle}`,
      creator: `@${SITE.instagramHandle}`,
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

export function getGoogleSiteVerification(): string | undefined {
  return process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || undefined;
}
