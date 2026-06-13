import type { getTranslations } from "next-intl/server";

import { CATALOG_HUB_PILLARS, type CatalogHubPillar } from "@/lib/catalog-hub/config";
import type { EscapadaExpressPromo } from "@/lib/escapadas-express";
import type { HomeDestinationEditorial } from "@/lib/home-destinations-types";
import type { Testimonial } from "@/lib/constants";

type Translator = Awaited<ReturnType<typeof getTranslations>>;

export function localizeHomeDestinations(
  t: Translator,
  editorial: HomeDestinationEditorial[],
): HomeDestinationEditorial[] {
  return editorial.map((destination) => {
    const slug = destination.slug;
    const galleryAltsKey = `destinations.${slug}.galleryAlts`;
    const destinationGalleryAlts = t.has(galleryAltsKey)
      ? (t.raw(galleryAltsKey) as string[])
      : undefined;

    return {
      ...destination,
      name: t(`destinations.${slug}.name`),
      region: t(`destinations.${slug}.region`),
      description: t(`destinations.${slug}.description`),
      galleryImages: destination.galleryImages.map((image, index) => ({
        ...image,
        alt:
          destinationGalleryAlts?.[index] ??
          t("photoAlt", { destination: t(`destinations.${slug}.name`), n: index + 1 }),
      })),
    };
  });
}

export function localizeCatalogHubPillars(t: Translator): CatalogHubPillar[] {
  return CATALOG_HUB_PILLARS.map((pillar) => ({
    ...pillar,
    title: t(`pillars.${pillar.slug}.title`),
    eyebrow: t(`pillars.${pillar.slug}.eyebrow`),
    description: t(`pillars.${pillar.slug}.description`),
    imageAlt: t(`pillars.${pillar.slug}.imageAlt`),
  }));
}

export function localizeEscapadasPromos(
  t: Translator,
  promos: EscapadaExpressPromo[],
): EscapadaExpressPromo[] {
  return promos.map((promo) => {
    const highlights = t.raw(`items.${promo.id}.highlights`) as string[];

    return {
      ...promo,
      title: t(`items.${promo.id}.title`),
      subtitle: t(`items.${promo.id}.subtitle`),
      badge: t.has(`items.${promo.id}.badge`) ? t(`items.${promo.id}.badge`) : undefined,
      highlights,
      whatsappMessage: t(`items.${promo.id}.whatsappMessage`),
      media: {
        ...promo.media,
        alt: t(`items.${promo.id}.mediaAlt`),
      },
    };
  });
}

export function localizeTestimonials(t: Translator, testimonials: Testimonial[]): Testimonial[] {
  return testimonials.map((item, index) => ({
    ...item,
    name: t(`items.${index}.name`),
    highlight: t(`items.${index}.highlight`),
    quote: t(`items.${index}.quote`),
    timeAgo: t(`items.${index}.timeAgo`),
  }));
}

export function getWinterCarouselAlts(t: Translator): string[] {
  return t.raw("carouselAlts") as string[];
}
