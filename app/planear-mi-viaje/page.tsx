import dynamic from "next/dynamic";

import { TripPlannerPageIntro } from "@/components/planner/TripPlannerPageIntro";
import { Footer } from "@/components/footer/Footer";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import { PLANNER_BANNER, PLANNER_PAGE_COPY, PLANNER_PATH } from "@/lib/constants";
import { buildBreadcrumbJsonLd } from "@/lib/json-ld";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_SEO } from "@/lib/seo-destinations";
import { getSiteUrl } from "@/lib/site-url";

const TripPlannerSection = dynamic(
  () =>
    import("@/components/planner/TripPlannerSection").then((mod) => mod.TripPlannerSection),
  { loading: () => <div className="min-h-[480px]" aria-hidden /> },
);

export const metadata = buildPageMetadata({
  title: SITE_SEO.planner.title,
  description: SITE_SEO.planner.description,
  path: PLANNER_PATH,
  ogImage: PLANNER_BANNER.src,
  ogImageAlt: PLANNER_BANNER.alt,
  keywords: [...SITE_SEO.planner.keywords],
  titleOrder: "keyword-first",
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd(getSiteUrl(), [
  { name: "Inicio", path: "/" },
  { name: PLANNER_PAGE_COPY.title, path: PLANNER_PATH },
]);

export default function PlanearMiViajePage() {
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
