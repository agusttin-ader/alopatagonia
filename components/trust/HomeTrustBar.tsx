import { MapPin, MessageCircle } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import { TestimonialStars } from "@/components/testimonials/TestimonialStars";
import { WhatsAppLink } from "@/components/whatsapp/WhatsAppLink";
import { TESTIMONIALS, getWhatsAppUrl } from "@/lib/constants";
import { getDestinationSlugs } from "@/lib/catalog/destinations";
import { localizeTestimonials } from "@/lib/i18n/localized-home";
import { SITE } from "@/lib/site";
import { getAverageTestimonialRating } from "@/lib/testimonials-utils";
import { cn } from "@/lib/utils";

function TrustDivider({ className }: { className?: string }) {
  return (
    <span
      className={cn("hidden h-8 w-px shrink-0 bg-border/80 sm:block", className)}
      aria-hidden
    />
  );
}

export async function HomeTrustBar() {
  const t = await getTranslations("trustBar");
  const tTestimonials = await getTranslations("testimonials");
  const tWa = await getTranslations("whatsapp");
  const locale = await getLocale();
  const whatsappUrl = getWhatsAppUrl(tWa("primaryMessage"));

  const testimonials = localizeTestimonials(tTestimonials, TESTIMONIALS);
  const averageRating = getAverageTestimonialRating(testimonials);
  const destinationCount = getDestinationSlugs().length;

  return (
    <section
      className="relative z-20 border-b border-border/70 bg-background"
      aria-label={t("ariaLabel")}
    >
      <div className="mx-auto max-w-7xl px-4 py-3.5 sm:px-8 sm:py-5 lg:px-14 lg:py-6 2xl:max-w-[90rem] 2xl:px-20">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-3.5 sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 sm:gap-y-3 lg:flex-nowrap lg:justify-between lg:gap-x-10 xl:gap-x-12">
          <li className="col-span-2 flex min-w-0 flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:col-span-1 sm:flex-nowrap sm:justify-start">
            <TestimonialStars
              rating={averageRating}
              size="md"
              label={tTestimonials("ratingAria", {
                rating: averageRating,
                count: testimonials.length,
              })}
            />
            <span className="min-w-0 text-sm font-medium text-foreground/90 sm:text-[0.9375rem]">
              {t("rating", {
                rating: averageRating.toLocaleString(locale, {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                }),
                count: testimonials.length,
              })}
            </span>
          </li>

          <TrustDivider className="max-sm:hidden" />

          <li className="flex min-w-0 items-center gap-2.5 max-sm:justify-start sm:justify-start">
            <MapPin className="size-4 shrink-0 text-brand-forest" aria-hidden />
            <span className="text-sm text-foreground/88 sm:text-[0.9375rem]">
              {t("destinations", { count: destinationCount })}
            </span>
          </li>

          <TrustDivider className="max-sm:hidden" />

          <li className="flex min-w-0 items-center max-sm:justify-start sm:justify-start">
            <WhatsAppLink
              href={whatsappUrl}
              className="group inline-flex min-w-0 items-center gap-2.5 rounded-md transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <MessageCircle className="size-4 shrink-0 text-brand-forest" aria-hidden />
              <span className="text-sm text-foreground/88 underline-offset-4 group-hover:underline sm:text-[0.9375rem]">
                {t("whatsapp")}
              </span>
            </WhatsAppLink>
          </li>

          <TrustDivider />

          <li
            className={cn(
              "col-span-2 text-center text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground sm:col-span-1 sm:text-left sm:text-[0.8125rem]",
            )}
          >
            {SITE.location ?? t("region")}
          </li>
        </ul>
      </div>
    </section>
  );
}
