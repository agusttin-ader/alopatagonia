import type { CatalogItemEntry } from "@/lib/catalog/catalog-items";
import { PLANNER_DESTINATION_FOCUS, resolvePlannerDestinationKey } from "@/lib/constants";
import type { DestinationCatalog } from "@/lib/catalog/types";
import type { SeoFaqItem } from "@/lib/seo-destinations";
import { SITE } from "@/lib/site";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type ItemListEntry = {
  name: string;
  path: string;
};

function geoForDestinationSlug(slug: string) {
  const key = resolvePlannerDestinationKey(slug);
  if (key === "none") return undefined;
  const focus = PLANNER_DESTINATION_FOCUS[key];
  return {
    "@type": "GeoCoordinates" as const,
    latitude: focus.center[0],
    longitude: focus.center[1],
  };
}

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
    knowsAbout: [
      "Viajes Patagonia Argentina",
      "Bariloche",
      "San Martín de los Andes",
      "El Chaltén",
      "El Calafate",
      "Puerto Madryn",
      "Ushuaia",
      "Turismo patagónico",
    ],
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
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, siteUrl).toString(),
    })),
  };
}

export function buildFAQPageJsonLd(siteUrl: string, faq: SeoFaqItem[], pagePath: string) {
  return {
    "@type": "FAQPage",
    "@id": new URL(pagePath, siteUrl).toString(),
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildItemListJsonLd(siteUrl: string, items: ItemListEntry[]) {
  return {
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: new URL(item.path, siteUrl).toString(),
    })),
  };
}

export function buildTouristDestinationJsonLd(
  siteUrl: string,
  destination: DestinationCatalog,
  description?: string,
) {
  const pageUrl = new URL(`/destinos/${destination.slug}`, siteUrl).toString();
  const imageUrl = new URL(destination.heroImage, siteUrl).toString();
  const geo = geoForDestinationSlug(destination.slug);

  return {
    "@type": "TouristDestination",
    "@id": pageUrl,
    name: destination.name,
    description: description ?? destination.intro,
    url: pageUrl,
    image: imageUrl,
    containedInPlace: {
      "@type": "Place",
      name: destination.region,
    },
    ...(geo ? { geo } : {}),
  };
}

export function buildDestinationPageGraphJsonLd(
  siteUrl: string,
  destination: DestinationCatalog,
  options?: {
    seoDescription?: string;
    faq?: SeoFaqItem[];
  },
) {
  const pagePath = `/destinos/${destination.slug}`;
  const graph: Record<string, unknown>[] = [
    buildBreadcrumbJsonLd(siteUrl, [
      { name: "Inicio", path: "/" },
      { name: "Destinos", path: "/destinos" },
      { name: destination.name, path: pagePath },
    ]),
    buildTouristDestinationJsonLd(siteUrl, destination, options?.seoDescription),
  ];

  if (options?.faq?.length) {
    graph.push(buildFAQPageJsonLd(siteUrl, options.faq, pagePath));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function buildCatalogItemGraphJsonLd(siteUrl: string, entry: CatalogItemEntry) {
  const { destination, item, kind } = entry;
  const pagePath = `/destinos/${destination.slug}/${item.itemSlug}`;
  const pageUrl = new URL(pagePath, siteUrl).toString();
  const imageUrl = new URL(item.images[0]?.src ?? destination.heroImage, siteUrl).toString();
  const geo = geoForDestinationSlug(destination.slug);

  const entity =
    kind === "accommodation"
      ? {
          "@type": "LodgingBusiness",
          "@id": pageUrl,
          name: item.name,
          description: item.description,
          url: pageUrl,
          image: imageUrl,
          address: {
            "@type": "PostalAddress",
            addressLocality: destination.name,
            addressRegion: destination.region,
            addressCountry: "AR",
          },
          ...(geo ? { geo } : {}),
        }
      : {
          "@type": "TouristAttraction",
          "@id": pageUrl,
          name: item.name,
          description: item.description,
          url: pageUrl,
          image: imageUrl,
          containedInPlace: {
            "@type": "Place",
            name: destination.name,
          },
          ...(geo ? { geo } : {}),
        };

  return {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd(siteUrl, [
        { name: "Inicio", path: "/" },
        { name: "Destinos", path: "/destinos" },
        { name: destination.name, path: `/destinos/${destination.slug}` },
        { name: item.name, path: pagePath },
      ]),
      entity,
    ],
  };
}

export function buildDestinosHubGraphJsonLd(
  siteUrl: string,
  destinations: DestinationCatalog[],
  faq: SeoFaqItem[],
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd(siteUrl, [
        { name: "Inicio", path: "/" },
        { name: "Destinos", path: "/destinos" },
      ]),
      buildItemListJsonLd(
        siteUrl,
        destinations.map((destination) => ({
          name: destination.name,
          path: `/destinos/${destination.slug}`,
        })),
      ),
      buildFAQPageJsonLd(siteUrl, faq, "/destinos"),
    ],
  };
}
