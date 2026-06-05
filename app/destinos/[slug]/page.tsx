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
import { buildBreadcrumbJsonLd, buildTouristDestinationJsonLd } from "@/lib/json-ld";
import { buildPageMetadata, formatSiteTitle } from "@/lib/seo";
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

  return buildPageMetadata({
    title: `${destination.name} — alojamiento y excursiones`,
    description: destination.intro,
    path: `/destinos/${slug}`,
    ogImage: destination.heroImage,
    ogImageAlt: `${destination.name} — ${SITE.name}`,
  });
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  const siteUrl = getSiteUrl();
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(siteUrl, [
    { name: "Inicio", path: "/" },
    { name: "Destinos", path: "/destinos" },
    { name: destination.name, path: `/destinos/${slug}` },
  ]);
  const destinationJsonLd = buildTouristDestinationJsonLd(siteUrl, destination);

  return (
    <>
      <JsonLdScript id="alo-destination-breadcrumb-jsonld" data={breadcrumbJsonLd} />
      <JsonLdScript id="alo-destination-jsonld" data={destinationJsonLd} />
      <main className="min-w-0 flex-1">
        <DestinationDetail destination={destination} />
      </main>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
