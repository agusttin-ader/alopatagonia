import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { Footer } from "@/components/footer/Footer";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { WinterStoreLanding } from "@/components/winter-store/WinterStoreLanding";
import type { AppLocale } from "@/i18n/routing";
import { BOULDER_INVIERNO_HERO_IMAGES, WINTER_STORE_IMAGE } from "@/lib/constants";
import { buildHubPageMetadata } from "@/lib/i18n/localized-seo-metadata";
import { buildBreadcrumbJsonLd } from "@/lib/json-ld";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("winterPage");

  return buildHubPageMetadata(locale, "invierno", {
    ogImage: WINTER_STORE_IMAGE.src,
    ogImageAlt: t("ogAlt"),
  });
}

function pickWinterHeroImage() {
  const index = Math.floor(Math.random() * BOULDER_INVIERNO_HERO_IMAGES.length);
  return BOULDER_INVIERNO_HERO_IMAGES[index];
}

export default async function InviernoPage() {
  const t = await getTranslations("winterPage");
  const tNav = await getTranslations("nav");
  const heroImage = pickWinterHeroImage();

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(getSiteUrl(), [
    { name: tNav("home"), path: "/" },
    { name: t("breadcrumbLabel"), path: "/invierno" },
  ]);

  return (
    <>
      <JsonLdScript id="alo-invierno-breadcrumb-jsonld" data={breadcrumbJsonLd} />
      <main className="min-w-0 flex-1">
        <WinterStoreLanding heroImage={heroImage} />
      </main>
      <Footer />
    </>
  );
}
