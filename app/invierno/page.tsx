import { Footer } from "@/components/footer/Footer";
import { JsonLdScript } from "@/components/seo/JsonLdScript";
import { WinterStoreLanding } from "@/components/winter-store/WinterStoreLanding";
import { BOULDER_INVIERNO_HERO_IMAGES, WINTER_STORE_COPY, WINTER_STORE_IMAGE } from "@/lib/constants";
import { buildBreadcrumbJsonLd } from "@/lib/json-ld";
import { buildPageMetadata } from "@/lib/seo";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export const metadata = buildPageMetadata({
  title: "Indumentaria Boulder para el frío patagónico",
  description: WINTER_STORE_COPY.metaDescription,
  path: "/invierno",
  ogImage: WINTER_STORE_IMAGE.src,
  ogImageAlt: "Indumentaria outdoor Boulder — camperas y abrigos para la Patagonia",
});

const breadcrumbJsonLd = buildBreadcrumbJsonLd(getSiteUrl(), [
  { name: "Inicio", path: "/" },
  { name: "Indumentaria", path: "/invierno" },
]);

function pickWinterHeroImage() {
  const index = Math.floor(Math.random() * BOULDER_INVIERNO_HERO_IMAGES.length);
  return BOULDER_INVIERNO_HERO_IMAGES[index];
}

export default function InviernoPage() {
  const heroImage = pickWinterHeroImage();

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
