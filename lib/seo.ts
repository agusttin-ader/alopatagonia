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
  /** Parte descriptiva del título. */
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogImageAlt?: string;
  index?: boolean;
  /** Palabras clave para meta keywords y contexto editorial. */
  keywords?: string[];
  /** keyword-first → «Bariloche… | Alo Patagonia»; brand-first → «Alo Patagonia | …» */
  titleOrder?: "brand-first" | "keyword-first";
};

export function buildPageMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = SITE.ogImageAlt,
  index = true,
  keywords,
  titleOrder = "brand-first",
}: PageSeoOptions): Metadata {
  const fullTitle =
    titleOrder === "keyword-first"
      ? title.includes(SITE.name)
        ? title
        : `${title} | ${SITE.name}`
      : formatSiteTitle(title);

  return {
    title: { absolute: fullTitle },
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: path },
    robots: {
      index,
      follow: true,
      googleBot: {
        index,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
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
