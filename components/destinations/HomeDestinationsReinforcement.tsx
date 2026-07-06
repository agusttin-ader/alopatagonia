import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/motion/reveal";
import { MagazinePillCta } from "@/components/ui/magazine-pill-cta";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { PLANNER_PATH } from "@/lib/constants";
import { MOBILE_MAGAZINE_G_ENABLED } from "@/lib/mobile-magazine-g";
import { cn } from "@/lib/utils";

export async function HomeDestinationsReinforcement() {
  const t = await getTranslations("homeDestinations");

  return (
    <section
      className="border-y border-brand-forest/10 bg-card/35 px-4 py-12 sm:px-8 sm:py-14 lg:px-14 lg:py-16 2xl:px-20"
      aria-labelledby="destinos-reinforcement-heading"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center 2xl:max-w-4xl">
        <Reveal>
          <h2
            id="destinos-reinforcement-heading"
            className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl 2xl:text-4xl"
          >
            {t("reinforcementTitle")}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("reinforcementLead")}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="mt-7 w-full max-w-sm sm:max-w-none">
          {MOBILE_MAGAZINE_G_ENABLED ? (
            <MagazinePillCta href={PLANNER_PATH} tone="cta" className="md:hidden">
              {t("reinforcementCta")}
            </MagazinePillCta>
          ) : null}
          <Link
            href={PLANNER_PATH}
            className={cn(
              buttonVariants({ variant: "marketing", size: "lg" }),
              "inline-flex h-12 rounded-full px-8 text-base font-semibold sm:mx-auto 2xl:h-14 2xl:px-10 2xl:text-lg",
              MOBILE_MAGAZINE_G_ENABLED && "max-md:hidden",
            )}
          >
            {t("reinforcementCta")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
