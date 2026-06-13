import type { Metadata } from "next";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";

import { Footer } from "@/components/footer/Footer";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { buildNotFoundMetadata } from "@/lib/i18n/localized-seo-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as AppLocale;
  return buildNotFoundMetadata(locale);
}

export default async function NotFound() {
  const locale = await getLocale();
  setRequestLocale(locale);
  const t = await getTranslations("notFound");

  return (
    <>
      <main className="flex min-h-[60vh] flex-1 flex-col items-center justify-center px-4 py-28 text-center sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary/85">
          {t("eyebrow")}
        </p>
        <h1 className="font-heading mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
          {t("heading")}
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">{t("body")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            {t("homeCta")}
          </Link>
          <Link
            href="/destinos"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-muted/50"
          >
            {t("destinationsCta")}
          </Link>
        </div>
      </main>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
