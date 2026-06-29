"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { useEffect, useId, useMemo, useRef, useState } from "react";

import { SiteLogo } from "@/components/brand/SiteLogo";
import { LocaleSwitcher } from "@/components/navigation/LocaleSwitcher";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { SITE } from "@/lib/constants";
import { MOBILE_MAGAZINE_G_ENABLED } from "@/lib/mobile-magazine-g";
import {
  NAV_DESKTOP_LINKS,
  NAV_PLANNER_LINK,
  getMobileNavLinks,
} from "@/lib/nav-links";
import { cn } from "@/lib/utils";

const HOME_SECTION_IDS = {
  inicio: "inicio",
} as const;

const DESKTOP_LINK_CLASS =
  "motion-link-underline motion-cta relative inline-flex min-h-11 cursor-pointer select-none items-center justify-center rounded-md px-2.5 py-2 text-[0.92rem] font-medium whitespace-nowrap text-foreground/72 hover:text-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cta/45 focus-visible:ring-offset-0 lg:px-3 lg:text-[0.94rem]";

const MOTION_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const HEADER_TRANSITION = { duration: 0.34, ease: MOTION_EASE };
const ICON_LINE_TRANSITION = { duration: 0.28, ease: MOTION_EASE };
const DRAWER_TRANSITION = { duration: 0.42, ease: MOTION_EASE };

export function GlobalNav() {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const reduceMotion = useReducedMotion();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const menuPanelId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    firstMobileLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
      if (event.key === "Tab" && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'button,[href],[tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (active === last || !active)) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const updateIsDesktop = () => setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
    updateIsDesktop();
    window.addEventListener("resize", updateIsDesktop);
    return () => window.removeEventListener("resize", updateIsDesktop);
  }, []);

  useEffect(() => {
    let rafId = 0;
    const updateScrolled = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;
      const shouldIgnoreDirection = Math.abs(delta) < 6;

      setScrolled(currentScrollY > 16);

      if (mobileOpen) {
        setNavHidden(false);
      } else if (currentScrollY <= 24) {
        setNavHidden(false);
      } else if (!shouldIgnoreDirection && delta > 0 && currentScrollY > 96) {
        setNavHidden(true);
      } else if (!shouldIgnoreDirection && delta < 0) {
        setNavHidden(false);
      }

      lastScrollYRef.current = currentScrollY;
    };
    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        updateScrolled();
      });
    };

    updateScrolled();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [mobileOpen]);

  const mobileLinks = useMemo(() => getMobileNavLinks(isHome), [isHome]);

  const scrollSectionIntoView = (sectionId: string) => {
    if (sectionId === HOME_SECTION_IDS.inicio) {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      return;
    }

    const section = document.getElementById(sectionId);
    if (!section) return;

    section.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const onNavLinkClick = (event: MouseEvent<HTMLAnchorElement>, href: string, sectionId: string) => {
    if (!isHome || !href.startsWith("#")) return;

    event.preventDefault();
    scrollSectionIntoView(sectionId);
    window.history.replaceState(null, "", href);
    setMobileOpen(false);
  };

  const headerTransition = reduceMotion
    ? { duration: 0 }
    : HEADER_TRANSITION;
  const iconLineTransition = reduceMotion
    ? { duration: 0 }
    : ICON_LINE_TRANSITION;
  const navVisibilityTransition = reduceMotion
    ? { duration: 0 }
    : isDesktop
      ? { duration: 0.48, ease: MOTION_EASE }
      : { duration: 0.3, ease: MOTION_EASE };

  useEffect(() => {
    if (!isHome) return;

    // Keep deep links (#seccion) intact for shareable URLs.
    if (!window.location.hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
    }

    // Restore normal browser scroll restoration after forcing the top position once.
    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, [isHome]);

  const mobileHeroHeader =
    MOBILE_MAGAZINE_G_ENABLED && isHome && !scrolled && !mobileOpen;

  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-[1200]"
      initial={reduceMotion ? undefined : { y: -14, opacity: 0 }}
      animate={
        reduceMotion
          ? undefined
          : { y: navHidden ? "-105%" : "0%", opacity: navHidden ? 0.98 : 1 }
      }
      transition={navVisibilityTransition}
    >
      <div
        className={cn(
          "relative transition-[padding,box-shadow,border-color,background-color] duration-300 ease-out md:hidden",
          MOBILE_MAGAZINE_G_ENABLED
            ? cn(
                "px-4 pb-3 pt-[calc(env(safe-area-inset-top)+0.75rem)]",
                mobileHeroHeader
                  ? "border-b border-transparent bg-transparent shadow-none"
                  : cn(
                      "border-b border-border/75 bg-background",
                      scrolled &&
                        "pb-[0.58rem] pt-[calc(env(safe-area-inset-top)+0.58rem)] shadow-[0_8px_20px_-18px_rgba(0,0,0,0.35)]",
                    ),
              )
            : cn(
                "border-b border-border/75 bg-background px-4 pb-3 pt-[calc(env(safe-area-inset-top)+0.75rem)]",
                scrolled &&
                  "border-border/80 pb-[0.58rem] pt-[calc(env(safe-area-inset-top)+0.58rem)] shadow-[0_8px_20px_-18px_rgba(0,0,0,0.35)]",
              ),
        )}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between">
          <SiteLogo
            linked
            priority
            showWordmark
            homeLabel={t("home")}
            variant={
              MOBILE_MAGAZINE_G_ENABLED && mobileHeroHeader && !mobileOpen
                ? "onDark"
                : "onLight"
            }
            className="h-11 min-w-0 shrink sm:h-12"
          />
          <Button
            ref={menuButtonRef}
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            aria-controls={menuPanelId}
            aria-expanded={mobileOpen}
            size="icon"
            variant="ghost"
            className={cn(
              "min-h-12 min-w-12",
              MOBILE_MAGAZINE_G_ENABLED &&
                mobileHeroHeader &&
                !mobileOpen &&
                "text-white hover:bg-white/12 hover:text-white",
            )}
            onClick={() => {
              setNavHidden(false);
              setMobileOpen((prev) => !prev);
            }}
          >
            <span className="relative block size-6">
              <motion.span
                className={cn(
                  "absolute left-0 top-1/2 h-0.5 w-6 origin-center rounded-full bg-foreground",
                  MOBILE_MAGAZINE_G_ENABLED &&
                    mobileHeroHeader &&
                    !mobileOpen &&
                    "bg-white",
                )}
                animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -7 }}
                transition={iconLineTransition}
              />
              <motion.span
                className={cn(
                  "absolute left-0 top-1/2 h-0.5 w-6 origin-center rounded-full bg-foreground",
                  MOBILE_MAGAZINE_G_ENABLED &&
                    mobileHeroHeader &&
                    !mobileOpen &&
                    "bg-white",
                )}
                animate={mobileOpen ? { opacity: 0, x: 4 } : { opacity: 1, x: 0 }}
                transition={iconLineTransition}
              />
              <motion.span
                className={cn(
                  "absolute left-0 top-1/2 h-0.5 w-6 origin-center rounded-full bg-foreground",
                  MOBILE_MAGAZINE_G_ENABLED &&
                    mobileHeroHeader &&
                    !mobileOpen &&
                    "bg-white",
                )}
                animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 7 }}
                transition={iconLineTransition}
              />
            </span>
          </Button>
        </div>
      </div>

      <motion.div className="hidden md:block" transition={headerTransition}>
        <motion.div
          className={cn(
            "relative flex h-20 items-center gap-6 border-b border-border/75 bg-background px-4 transition-[height,box-shadow,border-color] duration-300 ease-out sm:px-8 lg:px-14 2xl:px-20",
            scrolled &&
              "h-18 border-border/80 shadow-[0_10px_24px_-22px_rgba(0,0,0,0.5)]",
          )}
        >
          <SiteLogo linked priority showWordmark homeLabel={t("home")} className="shrink-0" />

          <div className="ml-auto hidden min-w-0 items-center gap-2 md:flex lg:gap-3">
            {NAV_DESKTOP_LINKS.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={DESKTOP_LINK_CLASS}
              >
                {t(link.labelKey)}
              </Link>
            ))}
            <Link
              href={NAV_PLANNER_LINK.href}
              className={cn(
                buttonVariants({ variant: "marketing", size: "sm" }),
                "motion-cta ml-1.5 h-10 rounded-full px-4 text-[0.88rem] font-semibold whitespace-nowrap lg:ml-2 lg:px-5 lg:text-[0.9rem]",
              )}
            >
              {t(NAV_PLANNER_LINK.labelKey)}
            </Link>
            <LocaleSwitcher className="ml-1 shrink-0" />
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {mobileOpen ? (
          <div className="fixed inset-0 z-[1300] md:hidden">
            <motion.button
              type="button"
              aria-label={t("closeMenu")}
              className="absolute inset-0 bg-black/36"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.24 }}
            />
            <motion.div
              id={menuPanelId}
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label={t("mainNav")}
              className="fixed inset-0 h-dvh w-full max-w-[100dvw] bg-[color-mix(in_oklch,var(--background)_98%,white)] shadow-[0_22px_60px_-36px_rgba(34,39,14,0.55)]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={reduceMotion ? { duration: 0 } : DRAWER_TRANSITION}
            >
              <div className="flex h-full flex-col px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
                <div className="mb-6 flex items-center justify-between">
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55 focus-visible:ring-offset-2"
                    aria-label={SITE.name}
                  >
                    <SiteLogo linked={false} showWordmark homeLabel={t("home")} className="h-12" />
                  </Link>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={t("closeMenu")}
                    className="min-h-12 min-w-12"
                    onClick={() => {
                      setMobileOpen(false);
                      menuButtonRef.current?.focus();
                    }}
                  >
                    <span className="relative block size-6">
                      <span className="absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 rotate-45 rounded-full bg-foreground" />
                      <span className="absolute left-0 top-1/2 h-0.5 w-6 -translate-y-1/2 -rotate-45 rounded-full bg-foreground" />
                    </span>
                  </Button>
                </div>
                <motion.div
                  className="flex flex-1 flex-col gap-2.5 overflow-y-auto pr-1"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: reduceMotion
                        ? { staggerChildren: 0 }
                        : { staggerChildren: 0.07, delayChildren: 0.06 },
                    },
                  }}
                >
                  {mobileLinks.map((link, index) => (
                    <motion.div
                      key={link.id}
                      variants={{
                        hidden: { opacity: reduceMotion ? 1 : 0, x: reduceMotion ? 0 : 14, scale: reduceMotion ? 1 : 0.985 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          scale: 1,
                          transition: reduceMotion
                            ? { duration: 0 }
                            : { duration: 0.26, ease: MOTION_EASE },
                        },
                      }}
                    >
                      <Link
                        ref={index === 0 ? firstMobileLinkRef : undefined}
                        href={link.href}
                        onClick={(event) => {
                          onNavLinkClick(event, link.href, link.id);
                          if (!isHome || !link.href.startsWith("#")) {
                            setMobileOpen(false);
                          }
                        }}
                        className="motion-cta block rounded-xl px-4 py-4 text-[1.32rem] font-semibold leading-tight text-foreground hover:bg-secondary/65 hover:text-cta hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2"
                      >
                        {t(link.labelKey)}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
                <div className="mt-6 border-t border-border/60 pt-5">
                  <LocaleSwitcher layout="drawer" />
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
}
