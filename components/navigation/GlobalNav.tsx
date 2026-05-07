"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { SECTION_IDS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const HOME_LINKS = [
  { label: "Sobre nosotros", href: `#${SECTION_IDS.signature}`, id: SECTION_IDS.signature },
  { label: "Testimonios", href: `#${SECTION_IDS.testimonials}`, id: SECTION_IDS.testimonials },
  { label: "Servicios", href: `#${SECTION_IDS.services}`, id: SECTION_IDS.services },
  { label: "Tu viaje", href: `#${SECTION_IDS.planner}`, id: SECTION_IDS.planner },
  { label: "Invierno", href: `#${SECTION_IDS.winterShop}`, id: SECTION_IDS.winterShop },
] as const;

export function GlobalNav() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const menuPanelId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

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
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      {
        rootMargin: "-40% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.7],
      },
    );

    HOME_LINKS.forEach((link) => {
      const section = document.getElementById(link.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = useMemo(() => {
    if (isHome) return HOME_LINKS;
    return [
      { label: "Inicio", href: "/", id: "home" },
      { label: "Tienda Invierno", href: "/invierno", id: "invierno" },
      { label: "Tu viaje", href: `/#${SECTION_IDS.planner}`, id: "planner" },
    ];
  }, [isHome]);

  const scrollSectionIntoView = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    section.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "center",
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
    : { duration: 0.36, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };
  const iconLineTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.34, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

  useEffect(() => {
    if (!isHome) return;
    const hash = window.location.hash;
    if (!hash) return;

    const sectionId = decodeURIComponent(hash.replace("#", ""));
    const timer = window.setTimeout(() => {
      scrollSectionIntoView(sectionId);
    }, 120);

    return () => window.clearTimeout(timer);
  }, [isHome, reduceMotion]);

  return (
    <motion.nav
      className="fixed inset-x-0 top-0 z-[1200]"
      initial={reduceMotion ? undefined : { y: -14, opacity: 0 }}
      animate={reduceMotion ? undefined : { y: 0, opacity: 1 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={cn(
          "relative border-b px-4 py-3 md:hidden",
          scrolled
            ? "border-border/70 bg-[color-mix(in_oklch,var(--background)_96%,white)] shadow-[0_8px_22px_-18px_rgba(34,39,14,0.35)]"
            : "border-border/55 bg-[color-mix(in_oklch,var(--background)_98%,white)] shadow-[0_6px_18px_-16px_rgba(34,39,14,0.3)]",
        )}
        animate={{
          paddingTop: scrolled ? "0.58rem" : "0.75rem",
          paddingBottom: scrolled ? "0.58rem" : "0.75rem",
        }}
        transition={headerTransition}
      >
        <div className="mx-auto flex h-11 max-w-7xl items-center justify-between">
          <Link href="/" className="font-heading text-[1.12rem] font-semibold tracking-[0.02em] text-foreground">
            {SITE.name}
          </Link>
          <Button
            ref={menuButtonRef}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-controls={menuPanelId}
            aria-expanded={mobileOpen}
            size="icon"
            variant="ghost"
            className="min-h-11 min-w-11"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <span className="relative block size-5">
              <motion.span
                className="absolute left-0 top-1/2 h-0.5 w-5 origin-center rounded-full bg-foreground"
                animate={mobileOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                transition={iconLineTransition}
              />
              <motion.span
                className="absolute left-0 top-1/2 h-0.5 w-5 origin-center rounded-full bg-foreground"
                animate={mobileOpen ? { opacity: 0, x: 4 } : { opacity: 1, x: 0 }}
                transition={iconLineTransition}
              />
              <motion.span
                className="absolute left-0 top-1/2 h-0.5 w-5 origin-center rounded-full bg-foreground"
                animate={mobileOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                transition={iconLineTransition}
              />
            </span>
          </Button>
        </div>
      </motion.div>

      <motion.div
        className="hidden px-4 sm:px-8 lg:px-14 2xl:px-20 md:block"
        animate={{ paddingTop: scrolled ? "0.65rem" : "1rem" }}
        transition={headerTransition}
      >
        <motion.div
          className={cn(
            "relative mx-auto flex max-w-[80rem] items-center justify-between overflow-hidden rounded-2xl border px-6 ring-1 md:px-8 2xl:max-w-[96rem]",
            scrolled
              ? "h-13 border-white/25 bg-[rgba(24,33,28,0.74)] shadow-[0_24px_42px_-24px_rgba(8,12,10,0.68)] ring-white/18 backdrop-blur-xl"
              : "h-15 border-white/20 bg-[rgba(24,33,28,0.68)] shadow-[0_22px_38px_-24px_rgba(8,12,10,0.62)] ring-white/14 backdrop-blur-xl",
          )}
          transition={headerTransition}
        >
          <div className="pointer-events-none absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/45 to-transparent" />
          <Link href="/" className="font-heading text-[1.02rem] font-semibold tracking-[0.03em] text-white">
            {SITE.name}
          </Link>

          <div className="hidden items-center gap-1.5 md:flex">
            {links.map((link) => {
              const isActive = isHome && link.id === activeSection;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={(event) => onNavLinkClick(event, link.href, link.id)}
                  className={cn(
                    "relative inline-flex items-center px-3.5 py-2 text-[0.98rem] text-white/78 transition-colors duration-200 hover:text-white focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-0 after:pointer-events-none after:absolute after:bottom-[3px] after:left-2 after:right-2 after:h-[2px] after:origin-left after:scale-x-0 after:rounded-full after:bg-white after:opacity-0 after:transition-[transform,opacity] after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:after:scale-x-100 hover:after:opacity-100",
                    isActive && "text-white after:scale-x-100 after:opacity-100",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {mobileOpen ? (
          <div className="fixed inset-0 z-[1300] md:hidden">
            <motion.button
              type="button"
              aria-label="Cerrar menú"
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
              aria-label="Navegación principal"
              className="fixed inset-0 h-dvh w-screen bg-[color-mix(in_oklch,var(--background)_98%,white)] shadow-[0_22px_60px_-36px_rgba(34,39,14,0.55)]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex h-full flex-col px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
                <div className="mb-7 flex items-center justify-between">
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="font-heading text-[1.36rem] font-semibold tracking-[0.015em] text-foreground"
                  >
                    {SITE.name}
                  </Link>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Cerrar menú"
                    className="min-h-11 min-w-11"
                    onClick={() => {
                      setMobileOpen(false);
                      menuButtonRef.current?.focus();
                    }}
                  >
                    <span className="relative block size-5">
                      <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rotate-45 rounded-full bg-foreground" />
                      <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 -rotate-45 rounded-full bg-foreground" />
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
                        : { staggerChildren: 0.07, delayChildren: 0.08 },
                    },
                  }}
                >
                  {links.map((link, index) => (
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
                            : { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
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
                        className="block rounded-xl px-4 py-4 text-[1.24rem] font-semibold leading-tight text-foreground transition-all duration-200 hover:bg-secondary/65 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
}
