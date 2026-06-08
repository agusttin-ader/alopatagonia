import Link from "next/link";

import { Footer } from "@/components/footer/Footer";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import { formatSiteTitle } from "@/lib/seo";

export const metadata = {
  title: { absolute: formatSiteTitle("Página no encontrada") },
  description: "Esta página no está. Volvé al inicio o mirá los destinos.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <>
      <main className="flex min-h-[60vh] flex-1 flex-col items-center justify-center px-4 py-28 text-center sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary/85">Error 404</p>
        <h1 className="font-heading mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
          No encontramos esta página
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          Puede que el enlace esté desactualizado. Probá desde el inicio o el catálogo de destinos.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Ir al inicio
          </Link>
          <Link
            href="/destinos"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-muted/50"
          >
            Ver destinos
          </Link>
        </div>
      </main>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
