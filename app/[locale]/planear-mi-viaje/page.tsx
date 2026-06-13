import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getLocale, getTranslations } from "next-intl/server";

import { TripPlannerPageIntro } from "@/components/planner/TripPlannerPageIntro";
import { Footer } from "@/components/footer/Footer";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import type { AppLocale } from "@/i18n/routing";
import { PLANNER_BANNER, PLANNER_PATH } from "@/lib/constants";
import { buildHubPageMetadata } from "@/lib/i18n/localized-seo-metadata";
import { buildBreadcrumbJsonLd } from "@/lib/json-ld";
import { getSiteUrl } from "@/lib/site-url";

const TripPlannerSection = dynamic(
  () =>
    import("@/components/planner/TripPlannerSection").then((mod) => mod.TripPlannerSection),
  { loading: () => <div className="min-h-[480px]" aria-hidden /> },
);

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as AppLocale;
  return buildHubPageMetadata(locale, "planner", {
    ogImage: PLANNER_BANNER.src,
    ogImageAlt: PLANNER_BANNER.alt,
  });
}

export default async function PlanearMiViajePage() {
  const t = await getTranslations("planner");
  const tNav = await getTranslations("nav");

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(getSiteUrl(), [
    { name: tNav("home"), path: "/" },
    { name: t("page.title"), path: PLANNER_PATH },
  ]);

  return (
    <>
      <JsonLdScript id="alo-planner-breadcrumb-jsonld" data={breadcrumbJsonLd} />
      <main className="min-w-0 flex-1 pb-20 sm:pb-0">
        <TripPlannerPageIntro />
        <TripPlannerSection showHeading={false} />
      </main>
      <FloatingWhatsAppButton />
      <Footer />
    </>
  );
}
