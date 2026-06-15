import { AppImage } from "@/components/media/AppImage";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/** Lockup recortado sin márgenes (`logo-marca-agus-lockup.png`). */
const DESIGNER_LOGO_WIDTH = 1038;
const DESIGNER_LOGO_HEIGHT = 325;

type FooterDesignerCreditProps = {
  label: string;
  ariaLabel: string;
  align?: "start" | "center";
  className?: string;
};

export function FooterDesignerCredit({
  label,
  ariaLabel,
  align = "start",
  className,
}: FooterDesignerCreditProps) {
  const { designer } = SITE;
  const isCentered = align === "center";

  return (
    <a
      href={designer.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(
        "group inline-flex max-w-full flex-col gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--footer-lake)]",
        isCentered ? "items-center" : "items-start",
        className,
      )}
    >
      <span className="shrink-0 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-white/45 transition-colors duration-300 group-hover:text-white/68">
        {label}
      </span>
      <AppImage
        src={designer.logoLockup}
        alt={designer.name}
        width={DESIGNER_LOGO_WIDTH}
        height={DESIGNER_LOGO_HEIGHT}
        quality={95}
        withBlur={false}
        loadingPulse={false}
        unoptimized
        sizes="(max-width: 640px) 200px, 240px"
        className={cn(
          "h-10 w-auto max-w-[14.5rem] object-contain opacity-92 transition-opacity duration-300 group-hover:opacity-100 sm:h-11 sm:max-w-[16rem]",
          isCentered ? "object-center" : "object-left",
        )}
      />
    </a>
  );
}
