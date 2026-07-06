import { Share2 } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { FooterDesignerCredit } from "@/components/footer/FooterDesignerCredit";
import { SiteLogo } from "@/components/brand/SiteLogo";
import { Link } from "@/i18n/navigation";
import { PLANNER_PATH, SECTION_IDS } from "@/lib/constants";
import { getLocalizedHomeSectionHref } from "@/lib/i18n/internal-href";
import { SEO_POPULAR_DESTINATIONS } from "@/lib/seo-destinations";
import { SITE } from "@/lib/site";

export async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");

  return (
    <footer className="relative z-30 -mt-4 sm:-mt-8 lg:-mt-8">
      <div className="h-22 w-full overflow-hidden sm:h-24" aria-hidden>
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="var(--footer-lake)"
            d="M0,50 C170,20 330,86 530,62 C730,38 900,88 1105,60 C1260,38 1360,74 1440,66 L1440,120 L0,120 Z"
          />
        </svg>
      </div>
      <div className="bg-[var(--footer-lake)] px-4 pb-[max(6rem,calc(env(safe-area-inset-bottom)+5rem))] pt-8 sm:px-8 sm:pb-9 lg:px-14 2xl:px-20">
        <div className="mx-auto grid max-w-7xl gap-8 text-[var(--footer-lake-foreground)] md:grid-cols-2 lg:grid-cols-4 2xl:max-w-[90rem]">
          <div className="space-y-4">
            <SiteLogo variant="onDark" showWordmark className="h-11 sm:h-12" />
            <p className="max-w-sm text-[0.92rem] leading-relaxed text-white/88">
              {t("about")}
            </p>
            <p className="text-[0.9rem] text-white/78">{t("location")}</p>
            <div className="hidden border-t border-white/10 pt-5 md:block">
              <FooterDesignerCredit
                label={t("designedBy")}
                ariaLabel={t("designedByAria", { name: SITE.designer.name })}
              />
            </div>
          </div>

          <div className="space-y-2.5 text-[0.92rem] text-white/88">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-white">
              {t("inquiries")}
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="block hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {t("email", { email: SITE.email })}
            </a>
            {SITE.phoneDisplay ? (
              <p>{t("phone", { phone: SITE.phoneDisplay })}</p>
            ) : null}
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <Share2 className="size-4" aria-hidden />
              {t("instagram", { handle: SITE.instagramHandle })}
            </a>
          </div>

          <div className="space-y-2.5 text-[0.92rem] text-white/88">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-white">
              {t("explore")}
            </p>
            <Link
              href="/destinos"
              className="block hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {tNav("destinations")}
            </Link>
            <Link
              href="/alojamientos"
              className="block hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {tNav("accommodations")}
            </Link>
            <Link
              href="/excursiones"
              className="block hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {tNav("excursions")}
            </Link>
            <Link
              href={PLANNER_PATH}
              className="block hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {tNav("planTrip")}
            </Link>
            <Link
              href={getLocalizedHomeSectionHref(SECTION_IDS.promosPatagonia)}
              className="block hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {t("promosPatagonia")}
            </Link>
            <Link
              href={getLocalizedHomeSectionHref(SECTION_IDS.aboutUs)}
              className="block hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {t("aboutUs")}
            </Link>
            <Link
              href="/invierno"
              className="block hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {tNav("winterShop")}
            </Link>
          </div>

          <div className="space-y-2.5 text-[0.92rem] text-white/88">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-white">
              {t("popularDestinations")}
            </p>
            {SEO_POPULAR_DESTINATIONS.map((destination) => (
              <Link
                key={destination.slug}
                href={`/destinos/${destination.slug}`}
                className="block hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              >
                {destination.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-7 w-full max-w-7xl border-t border-white/14 pt-5 2xl:max-w-[90rem]">
          <div className="flex w-full flex-col items-center gap-3.5 text-center md:items-start md:gap-0 md:text-left">
            <p className="max-w-[min(100%,18rem)] text-[0.72rem] leading-relaxed text-white/62 md:max-w-none">
              {t("copyright", { year: new Date().getFullYear() })}
            </p>
            <div className="flex w-full justify-center md:hidden">
              <FooterDesignerCredit
                label={t("designedBy")}
                ariaLabel={t("designedByAria", { name: SITE.designer.name })}
                align="center"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
