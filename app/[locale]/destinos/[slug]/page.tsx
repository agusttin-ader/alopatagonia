import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { DestinationDetail } from "@/components/catalog/DestinationDetail";
import { Footer } from "@/components/footer/Footer";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import type { AppLocale } from "@/i18n/routing";
import {
  getDestinationBySlug,
  getDestinationSlugs,
} from "@/lib/catalog/destinations";
import {
  getLocalizedDestinationSeoFaq,
  localizeDestinationCatalog,
} from "@/lib/i18n/localized-destinations-page";
import { buildDestinationPageMetadata } from "@/lib/i18n/localized-seo-metadata";
import { buildLocalizedPageMetadata } from "@/lib/seo-i18n";
import { buildDestinationPageGraphJsonLd } from "@/lib/json-ld";
import { MOBILE_FAB_CLEARANCE } from "@/lib/layout-shell";
import { getDestinationSeo } from "@/lib/seo-destinations";
import { getSiteUrl } from "@/lib/site-url";
import { cn } from "@/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getDestinationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (await getLocale()) as AppLocale;
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);

  if (!destination) {
    const t = await getTranslations("seo");
    return buildLocalizedPageMetadata({
      locale,
      path: `/destinos/${slug}`,
      title: t("destination.notFound"),
      description: t("destination.notFound"),
      index: false,
    });
  }

  return buildDestinationPageMetadata(locale, destination);
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  const locale = await getLocale();
  const tNav = await getTranslations("nav");
  const tHome = await getTranslations("homeDestinations");
  const tDest = await getTranslations("destinationsPage");

  const seo = getDestinationSeo(slug);
  const localizedDestination = localizeDestinationCatalog(tHome, destination);
  const localizedFaq = seo
    ? getLocalizedDestinationSeoFaq(tDest, locale, slug, seo.faq)
    : undefined;

  const destinationJsonLd = buildDestinationPageGraphJsonLd(
    getSiteUrl(),
    localizedDestination,
    {
      seoDescription: seo?.seoDescription,
      faq: localizedFaq,
      breadcrumbs: { home: tNav("home"), destinations: tNav("destinations") },
    },
  );

  return (
    <>
      <JsonLdScript id="alo-destination-graph-jsonld" data={destinationJsonLd} />
      <main className={cn("min-w-0 flex-1", MOBILE_FAB_CLEARANCE)}>
        <DestinationDetail destination={destination} />
      </main>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
