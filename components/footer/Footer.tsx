"use client";

import { Share2 } from "lucide-react";
import Link from "next/link";

import { SiteLogo } from "@/components/brand/SiteLogo";
import { Reveal } from "@/components/motion/reveal";
import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative z-30 -mt-12 sm:-mt-20">
      <div className="h-22 w-full overflow-hidden sm:h-24" aria-hidden>
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="var(--footer-lake)"
            d="M0,50 C170,20 330,86 530,62 C730,38 900,88 1105,60 C1260,38 1360,74 1440,66 L1440,120 L0,120 Z"
          />
        </svg>
      </div>
      <div className="bg-[var(--footer-lake)] px-4 pb-9 pt-8 sm:px-8 lg:px-14 2xl:px-20">
        <Reveal variant="up" className="mx-auto grid max-w-7xl gap-8 text-[var(--footer-lake-foreground)] md:grid-cols-3 2xl:max-w-[90rem]">
          <div className="space-y-4">
            <SiteLogo variant="onDark" className="h-11 sm:h-12" />
            <p className="max-w-sm text-[0.92rem] leading-relaxed text-white/88">
              {SITE.about}
            </p>
            <p className="text-[0.9rem] text-white/78">{SITE.location}</p>
          </div>

          <div className="space-y-2.5 text-[0.92rem] text-white/88">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-white">
              Consultas
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="block hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Email: {SITE.email}
            </a>
            {SITE.phoneDisplay ? (
              <p>Teléfono: {SITE.phoneDisplay}</p>
            ) : null}
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              <Share2 className="size-4" aria-hidden />
              Instagram: @{SITE.instagramHandle}
            </a>
          </div>

          <div className="space-y-2.5 text-[0.92rem] text-white/88">
            <p className="text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-white">
              Legales
            </p>
            <Link
              href="/invierno"
              className="block hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              Tienda de invierno
            </Link>
          </div>
        </Reveal>

        <Reveal variant="fade" delay={0.08} className="mx-auto mt-7 max-w-7xl border-t border-white/14 pt-4 text-[0.72rem] text-white/62 2xl:max-w-[90rem]">
          © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
        </Reveal>
      </div>
    </footer>
  );
}
