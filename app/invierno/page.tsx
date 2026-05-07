import type { Metadata } from "next";

import { Footer } from "@/components/footer/Footer";
import { WinterStoreLanding } from "@/components/winter-store/WinterStoreLanding";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import { WINTER_STORE_COPY } from "@/lib/constants";

export const metadata: Metadata = {
  title: WINTER_STORE_COPY.metaTitle,
  description: WINTER_STORE_COPY.metaDescription,
  openGraph: {
    title: WINTER_STORE_COPY.metaTitle,
    description: WINTER_STORE_COPY.metaDescription,
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
