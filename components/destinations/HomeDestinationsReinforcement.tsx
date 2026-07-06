import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/motion/reveal";
import { MagazinePillCta } from "@/components/ui/magazine-pill-cta";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { SECTION_IDS } from "@/lib/constants";
import { MOBILE_MAGAZINE_G_ENABLED } from "@/lib/mobile-magazine-g";
import { cn } from "@/lib/utils";

export async function HomeDestinationsReinforcement() {
  const t = await getTranslations("homeDestinations");
  const catalogHref = `#${SECTION_IDS.catalogHub}`;

  return (
    <section
      className="border-y border-brand-forest/10 bg-card/35 px-4 py-12 sm:px-8 sm:py-14 lg:px-14 lg:py-16 2xl:px-20"
      aria-labelledby="destinos-reinforcement-heading"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center 2xl:max-w-5xl lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:text-left">
        <Reveal className="lg:max-w-xl">
          <h2
            id="destinos-reinforcement-heading"
            className="font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            {t("reinforcementTitle")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("reinforcementLead")}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="w-full max-w-sm sm:max-w-none lg:w-auto lg:shrink-0">
          {MOBILE_MAGAZINE_G_ENABLED ? (
            <MagazinePillCta href={catalogHref} tone="cta" className="md:hidden">
              {t("viewCatalog")}
            </MagazinePillCta>
          ) : null}
          <Link
            href={catalogHref}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "inline-flex h-12 rounded-full px-8 text-base font-semibold sm:mx-auto 2xl:h-14 2xl:px-10 2xl:text-lg",
              MOBILE_MAGAZINE_G_ENABLED && "max-md:hidden",
            )}
          >
            {t("viewCatalog")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
