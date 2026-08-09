import { getTranslations } from "next-intl/server";

import { CtaTrailMapClient } from "@/components/cta/CtaTrailMapClient";
import { buttonVariants } from "@/components/ui/button";
import { MagazinePillCta } from "@/components/ui/magazine-pill-cta";
import { WhatsAppLink } from "@/components/whatsapp/WhatsAppLink";
import { Link } from "@/i18n/navigation";
import { PLANNER_PATH, SECTION_IDS, getWhatsAppUrl } from "@/lib/constants";
import { MOBILE_MAGAZINE_G_ENABLED } from "@/lib/mobile-magazine-g";
import { cn } from "@/lib/utils";

export async function CTA() {
  const t = await getTranslations("cta");
  const tNav = await getTranslations("nav");
  const tCatalog = await getTranslations("catalog");
  const tWa = await getTranslations("whatsapp");
  const whatsappUrl = getWhatsAppUrl(tWa("primaryMessage"));

  return (
    <section
      id={SECTION_IDS.cta}
      className="relative z-0 scroll-mt-24 min-h-[44dvh] px-0 pb-0 sm:min-h-[62dvh] lg:min-h-0"
      aria-labelledby="cta-heading"
    >
      <div
        className={cn(
          "relative flex min-h-[44dvh] w-full items-start justify-center overflow-hidden rounded-none bg-background px-6 pb-16 pt-10 text-center ring-1 ring-border/70 sm:min-h-[62dvh] sm:items-center sm:px-10 sm:pb-24 sm:pt-16 lg:min-h-[28rem] lg:border-t lg:border-brand-forest/10 lg:pb-28 lg:pt-20 lg:ring-0 2xl:px-20 2xl:pb-32 2xl:pt-24",
          MOBILE_MAGAZINE_G_ENABLED &&
            "max-md:bg-footer-lake max-md:ring-white/10 max-md:pb-16 max-md:pt-12",
        )}
      >
        <CtaTrailMapClient />
        <div className="relative z-10 mx-auto w-full max-w-4xl">
          <h2
            id="cta-heading"
            className={cn(
              "font-heading text-[clamp(1.65rem,6.5vw,1.875rem)] font-medium tracking-tight text-brand-forest sm:text-4xl 2xl:text-5xl",
              MOBILE_MAGAZINE_G_ENABLED && "max-md:text-footer-lake-foreground",
            )}
          >
            {t("heading")}
          </h2>
          <p
            className={cn(
              "mx-auto mt-5 max-w-[36ch] text-base leading-relaxed text-foreground/82 sm:max-w-xl sm:text-lg 2xl:max-w-2xl 2xl:text-xl",
              MOBILE_MAGAZINE_G_ENABLED && "max-md:text-footer-lake-foreground/82",
            )}
          >
            {t("body")}
          </p>
          {MOBILE_MAGAZINE_G_ENABLED ? (
            <div className="mx-auto mt-8 flex max-w-md flex-col items-stretch gap-3 md:hidden">
              <MagazinePillCta href={PLANNER_PATH} tone="cta">
                {tNav("planTrip")}
              </MagazinePillCta>
              <WhatsAppLink
                href={whatsappUrl}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "inline-flex min-h-11 w-full items-center justify-center rounded-full border-white/35 bg-transparent text-footer-lake-foreground hover:bg-white/10 hover:text-footer-lake-foreground",
                )}
              >
                {tCatalog("excursionWhatsAppCta")}
              </WhatsAppLink>
            </div>
          ) : (
            <div className="mx-auto mt-8 flex max-w-md flex-col items-stretch gap-3 md:hidden">
              <Link
                href={PLANNER_PATH}
                className={cn(
                  buttonVariants({ variant: "marketing", size: "lg" }),
                  "motion-cta inline-flex min-h-11 w-full items-center justify-center rounded-full text-base font-semibold",
                )}
              >
                {tNav("planTrip")}
              </Link>
              <WhatsAppLink
                href={whatsappUrl}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "inline-flex min-h-11 w-full items-center justify-center rounded-full",
                )}
              >
                {tCatalog("excursionWhatsAppCta")}
              </WhatsAppLink>
            </div>
          )}
          <WhatsAppLink
            href={whatsappUrl}
            className={cn(
              buttonVariants({ variant: "marketing", size: "lg" }),
              "motion-cta mt-8 inline-flex h-12 rounded-full px-10 text-base font-semibold 2xl:h-14 2xl:px-12 2xl:text-lg",
              "max-md:hidden",
            )}
          >
            {t("button")}
          </WhatsAppLink>
        </div>
      </div>
    </section>
  );
}
