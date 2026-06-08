import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DestinationDetail } from "@/components/catalog/DestinationDetail";
import { Footer } from "@/components/footer/Footer";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import {
  getDestinationBySlug,
  getDestinationSlugs,
} from "@/lib/catalog/destinations";
import { buildDestinationPageGraphJsonLd } from "@/lib/json-ld";
import { buildPageMetadata, formatSiteTitle } from "@/lib/seo";
import { getDestinationSeo } from "@/lib/seo-destinations";
import { getSiteUrl } from "@/lib/site-url";
import { SITE } from "@/lib/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getDestinationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) {
    return {
      title: { absolute: formatSiteTitle("Destino no encontrado") },
      robots: { index: false, follow: false },
    };
  }

  const seo = getDestinationSeo(slug);

  return buildPageMetadata({
    title: seo?.seoTitle ?? `${destination.name} — alojamiento y excursiones`,
    description: seo?.seoDescription ?? destination.intro,
    path: `/destinos/${slug}`,
    ogImage: destination.heroImage,
    ogImageAlt: `Viajes a ${destination.name} — ${SITE.name}`,
    keywords: seo?.keywords,
    titleOrder: "keyword-first",
  });
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
