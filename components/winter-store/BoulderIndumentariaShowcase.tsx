import { BoulderIndumentariaRotator } from "@/components/winter-store/BoulderIndumentariaRotator";
import { BoulderLogo } from "@/components/winter-store/BoulderLogo";
import type { GalleryImage } from "@/lib/constants";
import { IMAGE_SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

type BoulderIndumentariaShowcaseProps = {
  className?: string;
  images?: readonly GalleryImage[];
  sizes?: string;
  priority?: boolean;
  slideSeconds?: number;
  fadeSeconds?: number;
  /** Intensidad del sombreado sobre la foto (0–1). */
  shade?: number;
  logoClassName?: string;
  logoLinked?: boolean;
  /** Solo home: logo centrado sobre la foto. */
  showLogo?: boolean;
};

export function BoulderIndumentariaShowcase({
  className,
  images,
  sizes = IMAGE_SIZES.winterSection,
  priority = false,
  slideSeconds = 10,
  fadeSeconds = 1.75,
  shade = 0.34,
  logoClassName,
  logoLinked = true,
  showLogo = true,
}: BoulderIndumentariaShowcaseProps) {
  return (
    <div className={cn("relative size-full overflow-hidden", className)}>
      <BoulderIndumentariaRotator
        images={images}
        sizes={sizes}
        priority={priority}
        slideSeconds={slideSeconds}
        fadeSeconds={fadeSeconds}
      />
      <div
        className="absolute inset-0 z-[1] bg-black"
        style={{ opacity: shade }}
        aria-hidden
      />
      {showLogo ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <BoulderLogo
            priority={priority}
            linked={logoLinked}
            className={cn(
              "h-7 w-auto drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)] sm:h-8",
              logoClassName,
            )}
          />
        </div>
      ) : null}
    </div>
  );
}
