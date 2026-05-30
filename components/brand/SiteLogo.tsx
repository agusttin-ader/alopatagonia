import Image from "next/image";
import Link from "next/link";

import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const LOGO_WIDTH = 591;
const LOGO_HEIGHT = 586;

export type SiteLogoVariant = "onLight" | "onDark";

type SiteLogoProps = {
  /** `onLight` = fondo claro (logo oscuro). `onDark` = fondo oscuro (logo claro). */
  variant?: SiteLogoVariant;
  className?: string;
  /** Si es false, solo renderiza la imagen (útil dentro de otro Link). */
  linked?: boolean;
  priority?: boolean;
  /** Muestra el nombre del sitio al lado del isotipo. */
  showWordmark?: boolean;
};

export function SiteLogo({
  variant = "onLight",
  className,
  linked = true,
  priority,
  showWordmark = false,
}: SiteLogoProps) {
  const src = variant === "onDark" ? SITE.logo : SITE.logoOnLight;

  const image = (
    <Image
      src={src}
      alt={showWordmark ? "" : SITE.name}
      aria-hidden={showWordmark || undefined}
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority={priority}
      className={cn("h-12 w-auto sm:h-14", className)}
    />
  );

  const content = showWordmark ? (
    <>
      {image}
      <span
        className={cn(
          "font-heading text-xl font-semibold tracking-tight sm:text-2xl",
          variant === "onDark" ? "text-white" : "text-foreground",
        )}
      >
        {SITE.name}
      </span>
    </>
  ) : (
    image
  );

  if (!linked) {
    return showWordmark ? (
      <span className="inline-flex items-center gap-3">{content}</span>
    ) : (
      image
    );
  }

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        variant === "onDark"
          ? "focus-visible:ring-white/65 focus-visible:ring-offset-transparent"
          : "focus-visible:ring-primary/55",
      )}
      aria-label={`${SITE.name} — Inicio`}
    >
      {content}
    </Link>
  );
}
