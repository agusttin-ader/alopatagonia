import { getTranslations } from "next-intl/server";

import { EscapadasExpressPromoDeck } from "@/components/about/EscapadasExpressPromoDeck";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { PLANNER_PATH, SECTION_IDS } from "@/lib/constants";
import { getPublishedEscapadasExpressPromos } from "@/lib/escapadas-express";
import { localizeEscapadasPromos } from "@/lib/i18n/localized-home";
import { SHELL_PX } from "@/lib/layout-shell";
import { cn } from "@/lib/utils";

export async function EscapadasExpressSection() {
  const t = await getTranslations("promosPatagonia");
  const promos = localizeEscapadasPromos(t, getPublishedEscapadasExpressPromos());
  const hasPromos = promos.length > 0;

  if (hasPromos) {
    return (
      <section
        id={SECTION_IDS.promosPatagonia}
        className="relative isolate scroll-mt-24"
        aria-labelledby="promos-patagonia-heading"
      >
        <EscapadasExpressPromoDeck promos={promos} />
      </section>
    );
  }

  return (
    <section
      id={SECTION_IDS.promosPatagonia}
      className={cn(
        "relative isolate scroll-mt-24 overflow-hidden",
        "border-y border-brand-forest/10",
        "bg-[linear-gradient(180deg,color-mix(in_srgb,var(--secondary)_88%,var(--background))_0%,color-mix(in_srgb,var(--secondary)_52%,var(--background))_100%)]",
        SHELL_PX,
        "py-14 sm:py-16 lg:py-20",
      )}
      aria-labelledby="promos-patagonia-heading"
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          {t("packagesLabel")}
        </p>
        <h2
          id="promos-patagonia-heading"
          className="font-heading mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl 2xl:text-5xl"
        >
          {t("title")}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground 2xl:text-xl">
          {t("subtitle")}
        </p>
        <p className="mt-10 text-base leading-relaxed text-muted-foreground">
          {t("fallbackBody")}
        </p>
        <Link
          href={PLANNER_PATH}
          className={cn(
            buttonVariants({ variant: "marketing", size: "lg" }),
            "motion-cta mt-8 inline-flex h-12 rounded-full px-10 text-base font-semibold 2xl:h-14 2xl:px-12 2xl:text-lg",
          )}
        >
          {t("fallbackCta")}
        </Link>
      </div>
    </section>
  );
}
