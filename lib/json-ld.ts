import type { DestinationCatalog } from "@/lib/catalog/types";
import { SITE } from "@/lib/site";

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildTravelAgencyJsonLd(siteUrl: string) {
  const logoUrl = new URL(SITE.logoOnLight, siteUrl).toString();
  const imageUrl = new URL(SITE.ogImage, siteUrl).toString();

  return {
    "@type": "TravelAgency",
    "@id": `${siteUrl}#organization`,
    name: SITE.name,
    url: siteUrl,
    description: SITE.about,
    email: SITE.email,
    telephone: SITE.phoneDisplay,
    image: imageUrl,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
    },
    areaServed: {
      "@type": "Place",
      name: "Patagonia, Argentina",
    },
    sameAs: [SITE.instagram],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Buenos Aires",
      addressRegion: "Ciudad Autónoma de Buenos Aires",
      addressCountry: "AR",
    },
  };
}

export function buildWebSiteJsonLd(siteUrl: string) {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    name: SITE.name,
    url: siteUrl,
    description: SITE.about,
    inLanguage: "es-AR",
    publisher: {
      "@id": `${siteUrl}#organization`,
    },
  };
}

export function buildSiteGraphJsonLd(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [buildWebSiteJsonLd(siteUrl), buildTravelAgencyJsonLd(siteUrl)],
  };
}

export function buildBreadcrumbJsonLd(siteUrl: string, items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteUrl).toString(),
    })),
  };
}

export function buildTouristDestinationJsonLd(
  siteUrl: string,
  destination: DestinationCatalog,
) {
  const pageUrl = new URL(`/destinos/${destination.slug}`, siteUrl).toString();
  const imageUrl = new URL(destination.heroImage, siteUrl).toString();

  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "@id": pageUrl,
    name: destination.name,
    description: destination.intro,
    url: pageUrl,
    image: imageUrl,
    containedInPlace: {
      "@type": "Place",
      name: destination.region,
    },
    touristType: "Viajeros por la Patagonia Argentina",
  };
}
