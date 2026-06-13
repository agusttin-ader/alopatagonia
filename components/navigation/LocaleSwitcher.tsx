"use client";

import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { localeLabels, routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("nav");

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={cn("inline-flex items-center gap-0.5 rounded-full bg-muted/60 p-0.5 ring-1 ring-border/60", className)}
    >
      {routing.locales.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => router.replace(pathname, { locale: code })}
            aria-current={active ? "true" : undefined}
            className={cn(
              "min-w-[2.1rem] rounded-full px-2 py-1 text-[0.68rem] font-semibold tracking-wide transition",
              active
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {localeLabels[code]}
          </button>
        );
      })}
    </div>
  );
}
