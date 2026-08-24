import { AppImage } from "@/components/media/AppImage";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const DEV_LOGO_WIDTH = 256;
const DEV_LOGO_HEIGHT = 202;

type FooterDevCreditProps = {
  label: string;
  name: string;
  ariaLabel: string;
  className?: string;
};

export function FooterDevCredit({
  label,
  name,
  ariaLabel,
  className,
}: FooterDevCreditProps) {
  const { developer } = SITE;

  return (
    <a
      href={developer.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(
        "group inline-flex items-center gap-2.5 text-xs text-white/65 transition-colors duration-300 hover:text-white/78 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--footer-lake)]",
        className,
      )}
    >
      <AppImage
        src={developer.logo}
        alt=""
        width={DEV_LOGO_WIDTH}
        height={DEV_LOGO_HEIGHT}
        quality={95}
        withBlur={false}
        loadingPulse={false}
        sizes="32px"
        className="h-7 w-auto shrink-0 object-contain drop-shadow-[0_0_1.5px_rgba(255,255,255,0.85)] transition-opacity duration-300 group-hover:opacity-100 sm:h-8"
      />
      <span>
        {label}{" "}
        <span className="font-medium text-white/85 transition-colors duration-300 group-hover:text-white">
          {name}
        </span>
      </span>
    </a>
  );
}
