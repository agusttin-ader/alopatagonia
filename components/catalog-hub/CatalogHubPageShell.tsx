import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";

import type { CatalogHubPillar } from "@/lib/catalog-hub/config";
import { localizeCatalogHubPillars } from "@/lib/i18n/localized-home";
import { Link as LocaleLink } from "@/i18n/navigation";
import { PAGE_TITLE, SHELL_PAGE_PT, siteShell } from "@/lib/layout-shell";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";

type CatalogHubPageShellProps = {
  pillar: CatalogHubPillar;
  children: ReactNode;
};

export async function CatalogHubPageShell({ pillar, children }: CatalogHubPageShellProps) {
  const t = await getTranslations("catalog");
  const tNav = await getTranslations("nav");
  const localizedPillars = localizeCatalogHubPillars(await getTranslations("catalogHub"));
  const localizedPillar =
    localizedPillars.find((item) => item.slug === pillar.slug) ?? pillar;

  return (
    <main className={cn("min-w-0 flex-1 bg-background pb-14", SHELL_PAGE_PT)}>
      <div className={siteShell()}>
        <nav className="text-sm text-muted-foreground">
          <LocaleLink href="/" className="hover:text-foreground">
            {tNav("home")}
          </LocaleLink>
          <span className="mx-2">/</span>
          <a href={`/#${SECTION_IDS.catalogHub}`} className="hover:text-foreground">
            {t("breadcrumbCatalog")}
          </a>
          <span className="mx-2">/</span>
          <span className="text-foreground">{localizedPillar.title}</span>
        </nav>

        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-primary/85">
          {localizedPillar.eyebrow}
        </p>
        <h1 className={cn("font-heading mt-2", PAGE_TITLE)}>{localizedPillar.title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {localizedPillar.description}
        </p>

        {children}

        <aside className="mt-12 border-t border-border/70 pt-8">
          <p className="text-sm font-medium text-foreground">{t("alsoExplore")}</p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {localizedPillars.filter((item) => item.slug !== pillar.slug).map((item) => (
              <li key={item.slug}>
                <LocaleLink
                  href={item.href}
                  className={cn(
                    "inline-flex min-h-11 items-center rounded-full border border-border/80 px-4 py-2 text-sm font-medium",
                    "text-foreground/80 transition-colors hover:border-border hover:bg-muted/40 hover:text-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:ring-offset-2",
                  )}
                >
                  {item.title}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}
