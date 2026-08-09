import { ArrowUpRight } from "lucide-react";
import type { MouseEventHandler } from "react";

import { Link } from "@/i18n/navigation";
import { isInternalAppHref } from "@/lib/i18n/internal-href";
import { cn } from "@/lib/utils";

type MagazinePillCtaProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  /** `surface` = pill claro (hero). `cta` = ámbar conversión. `inverse` = bosque sobre fondo claro. */
  tone?: "surface" | "cta" | "inverse";
  target?: string;
  rel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const TONE_CLASS = {
  surface:
    "bg-card text-foreground shadow-[0_16px_40px_-24px_rgba(0,0,0,0.45)] ring-black/10",
  cta: "bg-cta text-cta-foreground shadow-[0_16px_40px_-20px_rgba(212,132,58,0.55)] ring-cta/25",
  inverse:
    "bg-footer-lake text-footer-lake-foreground shadow-[0_16px_40px_-24px_rgba(0,0,0,0.35)] ring-white/10",
} as const;

const ICON_TONE_CLASS = {
  surface: "bg-foreground text-background",
  cta: "bg-cta-foreground/18 text-cta-foreground",
  inverse: "bg-white/14 text-footer-lake-foreground",
} as const;

function MagazinePillCtaContent({
  children,
  tone,
}: Pick<MagazinePillCtaProps, "children" | "tone">) {
  return (
    <>
      <span className="min-w-0 truncate">{children}</span>
      <span
        className={cn(
          "inline-flex size-10 shrink-0 items-center justify-center rounded-full",
          ICON_TONE_CLASS[tone ?? "surface"],
        )}
        aria-hidden
      >
        <ArrowUpRight className="size-5" />
      </span>
    </>
  );
}

export function MagazinePillCta({
  href,
  children,
  className,
  tone = "surface",
  target,
  rel,
  onClick,
}: MagazinePillCtaProps) {
  const pillClassName = cn(
    "motion-cta flex h-14 w-full items-center justify-between gap-3 rounded-full pl-5 pr-2 text-[0.98rem] font-semibold ring-1 transition",
    TONE_CLASS[tone],
    className,
  );

  if (isInternalAppHref(href)) {
    return (
      <Link href={href} className={pillClassName} onClick={onClick}>
        <MagazinePillCtaContent tone={tone}>{children}</MagazinePillCtaContent>
      </Link>
    );
  }

  return (
    <a href={href} target={target} rel={rel} className={pillClassName} onClick={onClick}>
      <MagazinePillCtaContent tone={tone}>{children}</MagazinePillCtaContent>
    </a>
  );
}
