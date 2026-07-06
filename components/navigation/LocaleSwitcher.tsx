"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";

import { LocaleFlagIcon } from "@/components/navigation/LocaleFlagIcon";
import { usePathname } from "@/i18n/navigation";
import { localeLabels, localeNames, routing, type AppLocale } from "@/i18n/routing";
import { navigateToLocale } from "@/lib/i18n/locale-switch";
import { cn } from "@/lib/utils";

type LocaleSwitcherLayout = "header" | "drawer";

type LocaleSwitcherProps = {
  className?: string;
  layout?: LocaleSwitcherLayout;
  /** Clases extra para el disparador (p. ej. texto claro sobre el hero). */
  triggerClassName?: string;
};

const MOTION_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type LocaleMenuProps = {
  locale: AppLocale;
  reduceMotion: boolean | null;
  onSelect: (code: AppLocale) => void;
  listboxId?: string;
  ariaLabel: string;
  layout: LocaleSwitcherLayout;
};

function LocaleMenuList({
  locale,
  reduceMotion,
  onSelect,
  listboxId,
  ariaLabel,
  layout,
}: LocaleMenuProps) {
  return (
    <div
      id={listboxId}
      role="listbox"
      aria-label={ariaLabel}
      className={cn(
        "overflow-hidden rounded-[1.2rem] bg-card ring-1 ring-border/55",
        "shadow-[0_20px_48px_-32px_rgba(31,42,31,0.38)]",
        layout === "drawer" ? "w-full" : "w-[13rem]",
      )}
    >
      {routing.locales.map((code, index) => {
        const active = code === locale;
        const isLast = index === routing.locales.length - 1;

        return (
          <motion.button
            key={code}
            type="button"
            role="option"
            aria-selected={active}
            aria-label={localeNames[code]}
            onClick={() => onSelect(code)}
            initial={reduceMotion ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.24,
              delay: reduceMotion ? 0 : index * 0.05,
              ease: MOTION_EASE,
            }}
            className={cn(
              "group relative flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-3.5 text-left transition-[background-color] duration-300",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta/45 focus-visible:ring-inset",
              !isLast && "border-b border-border/40",
              active
                ? "bg-[color-mix(in_oklch,var(--secondary)_38%,var(--card))]"
                : "[@media(hover:hover)]:hover:bg-secondary/18",
              active &&
                "before:absolute before:inset-y-2.5 before:left-0 before:w-0.5 before:rounded-full before:bg-cta",
            )}
          >
            <span className="min-w-0 pl-1">
              <span
                className={cn(
                  "font-heading block text-[1.02rem] leading-tight tracking-tight transition-colors duration-300",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground/58 [@media(hover:hover)]:group-hover:text-cta",
                )}
              >
                {localeNames[code]}
              </span>
            </span>

            <span className="flex shrink-0 items-center gap-2.5">
              <span
                className={cn(
                  "text-[0.62rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300",
                  active ? "text-cta" : "text-muted-foreground/45",
                )}
              >
                {localeLabels[code]}
              </span>
              <LocaleFlagIcon
                locale={code}
                className={cn(
                  "size-[1.15rem] transition-[transform,opacity] duration-300",
                  active ? "opacity-100" : "opacity-55 [@media(hover:hover)]:group-hover:scale-105 [@media(hover:hover)]:group-hover:opacity-90",
                )}
              />
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

export function LocaleSwitcher({
  className,
  layout = "header",
  triggerClassName,
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

  const menuProps: LocaleMenuProps = {
    locale,
    reduceMotion,
    onSelect: selectLocale,
    ariaLabel: t("language"),
    layout,
  };

  if (layout === "drawer") {
    return (
      <div className={cn("w-full", className)}>
        <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          {t("language")}
        </p>
        <LocaleMenuList {...menuProps} />
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
          "inline-flex min-h-10 cursor-pointer items-center gap-1.5 rounded-md px-1.5 py-2",
          "text-foreground/72 transition-colors hover:text-cta",
          open && "text-cta",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          triggerClassName,
        )}
      >
        <LocaleFlagIcon locale={locale} className="size-5" />
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em]">
          {localeLabels[locale]}
        </span>
        <ChevronDown
          className={cn(
            "size-3.5 shrink-0 opacity-70 transition-[transform,opacity] duration-200",
            open && "rotate-180 opacity-100",
          )}
          aria-hidden
        />
        <span className="sr-only">{t("selectLanguage")}</span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.24, ease: MOTION_EASE }}
            className="absolute right-0 top-[calc(100%+0.45rem)] z-[1400] origin-top-right"
          >
            <LocaleMenuList {...menuProps} listboxId={listboxId} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
