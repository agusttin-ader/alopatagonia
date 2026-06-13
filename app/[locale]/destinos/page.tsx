import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { DestinationsIndex } from "@/components/catalog/DestinationsIndex";
import { FaqSection } from "@/components/seo/FaqSection";
import { Footer } from "@/components/footer/Footer";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { getAllDestinations } from "@/lib/catalog/destinations";
import { buildDestinosHubGraphJsonLd } from "@/lib/json-ld";
import { getLocalizedDestinationsIndexFaq, localizeDestinationCatalog } from "@/lib/i18n/localized-destinations-page";
import { buildHubPageMetadata } from "@/lib/i18n/localized-seo-metadata";
import { PAGE_TITLE, SHELL_PAGE_PT, siteShell } from "@/lib/layout-shell";
import { getSiteUrl } from "@/lib/site-url";
import { cn } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as AppLocale;
  return buildHubPageMetadata(locale, "destinos");
}

export default async function DestinosPage() {
  const t = await getTranslations("destinationsPage");
  const tNav = await getTranslations("nav");
  const tCatalog = await getTranslations("catalog");
  const tHome = await getTranslations("homeDestinations");
  const locale = await getLocale();

  const destinations = getAllDestinations();
  const faq = getLocalizedDestinationsIndexFaq(t, locale);
  const localizedDestinations = destinations.map((destination) =>
    localizeDestinationCatalog(tHome, destination),
  );
  const destinosGraphJsonLd = buildDestinosHubGraphJsonLd(
    getSiteUrl(),
    localizedDestinations,
    faq,
    {
      breadcrumbs: { home: tNav("home"), destinations: tNav("destinations") },
    },
  );

  return (
    <>
      <JsonLdScript id="alo-destinos-graph-jsonld" data={destinosGraphJsonLd} />
      <main className={cn("min-w-0 flex-1 bg-background pb-14", SHELL_PAGE_PT)}>
        <div className={siteShell()}>
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              {tNav("home")}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{tNav("destinations")}</span>
          </nav>

          <h1 className={cn("font-heading mt-4", PAGE_TITLE)}>{t("title")}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {t("intro")}
          </p>

          <DestinationsIndex />

          <FaqSection
            items={faq}
            title={tCatalog("faqPatagonia")}
            className="mt-16 border-t border-border/70 pt-12"
          />
        </div>
      </main>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
