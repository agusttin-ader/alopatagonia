"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";

import { LocaleFlagIcon } from "@/components/navigation/LocaleFlagIcon";
import { usePathname } from "@/i18n/navigation";
import { localeLabels, localeNames, routing, type AppLocale } from "@/i18n/routing";
import { navigateToLocale } from "@/lib/i18n/locale-switch";
import { cn } from "@/lib/utils";

type LocaleSwitcherLayout = "header" | "mobile-bar";

type LocaleSwitcherProps = {
  className?: string;
  layout?: LocaleSwitcherLayout;
  /** Contraste sobre hero oscuro en mobile. */
  variant?: "onLight" | "onDark";
};

const MOTION_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function LocaleSwitcher({
  className,
  layout = "header",
  variant = "onLight",
}: LocaleSwitcherProps) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const t = useTranslations("nav");
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listboxId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const selectLocale = (code: AppLocale) => {
    setOpen(false);
    if (code !== locale) {
      navigateToLocale(pathname, code, { reduceMotion });
    }
  };

  if (layout === "mobile-bar") {
    const onDark = variant === "onDark";

    return (
      <div
        role="listbox"
        aria-label={t("language")}
        className={cn(
          "inline-flex shrink-0 items-center gap-0.5 rounded-full p-0.5",
          onDark
            ? "bg-white/12 ring-1 ring-white/25"
            : "bg-secondary/40 ring-1 ring-border/55 shadow-[0_8px_22px_-18px_rgba(26,47,38,0.35)]",
          className,
        )}
      >
        {routing.locales.map((code) => {
          const active = code === locale;

          return (
            <button
              key={code}
              type="button"
              role="option"
              aria-selected={active}
              aria-label={localeNames[code]}
              onClick={() => selectLocale(code)}
              className={cn(
                "inline-flex min-h-9 min-w-9 items-center justify-center rounded-full transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-lake/45 focus-visible:ring-offset-2",
                onDark ? "focus-visible:ring-offset-transparent" : "focus-visible:ring-offset-background",
                active
                  ? onDark
                    ? "bg-white/22 shadow-sm"
                    : "bg-background shadow-sm"
                  : onDark
                    ? "hover:bg-white/10"
                    : "hover:bg-background/70",
              )}
            >
              <LocaleFlagIcon locale={code} className="size-5" />
              <span className="sr-only">{localeLabels[code]}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "inline-flex min-h-10 items-center gap-2 rounded-full bg-secondary/40 pl-2 pr-2",
          "ring-1 ring-border/55 shadow-[0_10px_28px_-22px_rgba(26,47,38,0.35)]",
          "transition hover:bg-secondary/55",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-lake/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
      >
        <LocaleFlagIcon locale={locale} className="size-5" />
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-foreground">
          {localeLabels[locale]}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden
        />
        <span className="sr-only">{t("selectLanguage")}</span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            id={listboxId}
            role="listbox"
            aria-label={t("language")}
            initial={reduceMotion ? false : { opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.22, ease: MOTION_EASE }}
            className={cn(
              "absolute right-0 top-[calc(100%+0.45rem)] z-[1400] min-w-[7.25rem] overflow-hidden rounded-2xl",
              "border border-border/60 bg-background/95 p-1.5 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.45)] backdrop-blur-md",
            )}
          >
            {routing.locales.map((code) => {
              const active = code === locale;

              return (
                <button
                  key={code}
                  type="button"
                  role="option"
                  aria-selected={active}
                  aria-label={localeNames[code]}
                  onClick={() => selectLocale(code)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-left transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-footer-lake/45 focus-visible:ring-inset",
                    active ? "bg-secondary/70" : "hover:bg-secondary/45",
                  )}
                >
                  <LocaleFlagIcon locale={code} className="size-5" />
                  <span className="min-w-0 flex-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-foreground">
                    {localeLabels[code]}
                  </span>
                  {active ? (
                    <Check className="size-4 shrink-0 text-footer-lake" aria-hidden />
                  ) : null}
                </button>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
