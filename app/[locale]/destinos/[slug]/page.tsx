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
import { buildDestinationPageMetadata } from "@/lib/i18n/localized-seo-metadata";
import { buildLocalizedPageMetadata } from "@/lib/seo-i18n";
import { buildDestinationPageGraphJsonLd } from "@/lib/json-ld";
import { getDestinationSeo } from "@/lib/seo-destinations";
import { getSiteUrl } from "@/lib/site-url";

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

  const seo = getDestinationSeo(slug);
  const destinationJsonLd = buildDestinationPageGraphJsonLd(getSiteUrl(), destination, {
    seoDescription: seo?.seoDescription,
    faq: seo?.faq,
  });

  return (
    <>
      <JsonLdScript id="alo-destination-graph-jsonld" data={destinationJsonLd} />
      <main className="min-w-0 flex-1">
        <DestinationDetail destination={destination} />
      </main>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
