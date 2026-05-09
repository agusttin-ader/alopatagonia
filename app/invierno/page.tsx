import type { Metadata } from "next";

import { Footer } from "@/components/footer/Footer";
import { WinterStoreLanding } from "@/components/winter-store/WinterStoreLanding";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import { WINTER_STORE_COPY } from "@/lib/constants";

export const metadata: Metadata = {
  title: WINTER_STORE_COPY.metaTitle,
  description: WINTER_STORE_COPY.metaDescription,
  alternates: {
    canonical: "/invierno",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/invierno",
    title: WINTER_STORE_COPY.metaTitle,
    description: WINTER_STORE_COPY.metaDescription,
    images: [
      {
        url: "/videos/hero-poster.jpg",
        width: 1200,
        height: 630,
        alt: "Equipamiento de invierno para viajar por Patagonia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: WINTER_STORE_COPY.metaTitle,
    description: WINTER_STORE_COPY.metaDescription,
    images: ["/videos/hero-poster.jpg"],
  },
};

export default function InviernoPage() {
  return (
    <>
      <main className="min-w-0 flex-1">
        <WinterStoreLanding />
      </main>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
