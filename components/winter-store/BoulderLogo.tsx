import { AppImage } from "@/components/media/AppImage";

import { getWinterStoreUrl } from "@/lib/constants";
import { IMAGE_SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

const BOULDER_LOGO = {
  src: "/images/boulder-indumentaria/boulder-logo-white.png",
  alt: "Boulder — indumentaria outdoor",
  width: 194,
  height: 96,
} as const;

type BoulderLogoProps = {
  className?: string;
  priority?: boolean;
  /** Si es false, solo renderiza la imagen (sin link externo). */
  linked?: boolean;
};

export function BoulderLogo({ className, priority, linked = true }: BoulderLogoProps) {
  const image = (
    <AppImage
      src={BOULDER_LOGO.src}
      alt={BOULDER_LOGO.alt}
      width={BOULDER_LOGO.width}
      height={BOULDER_LOGO.height}
      priority={priority}
      withBlur={false}
      sizes={IMAGE_SIZES.logo}
      className={cn("h-10 w-auto sm:h-11", className)}
    />
  );

  if (!linked) return image;

  return (
    <a
      href={getWinterStoreUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 items-center rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      aria-label="Boulder — ir a la tienda"
    >
      {image}
    </a>
  );
}
