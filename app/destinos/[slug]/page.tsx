import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DestinationDetail } from "@/components/catalog/DestinationDetail";
import { Footer } from "@/components/footer/Footer";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import {
  getDestinationBySlug,
  getDestinationSlugs,
} from "@/lib/catalog/destinations";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getDestinationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) return { title: "Destino no encontrado" };

  return {
    title: `${destination.name} | Alojamientos y excursiones`,
    description: destination.intro,
    alternates: { canonical: `/destinos/${slug}` },
  };
}

export default async function DestinationPage({ params }: PageProps) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  return (
    <>
      <main className="min-w-0 flex-1">
        <DestinationDetail destination={destination} />
      </main>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
