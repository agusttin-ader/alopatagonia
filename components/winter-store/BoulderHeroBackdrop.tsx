import { AppImage } from "@/components/media/AppImage";

import type { GalleryImage } from "@/lib/constants";
import { cn } from "@/lib/utils";

type BoulderHeroBackdropProps = {
  image: GalleryImage;
  className?: string;
  sizes?: string;
  priority?: boolean;
  shade?: number;
};

/** Fondo estático para `/invierno` — una sola foto por visita, sin carrusel. */
export function BoulderHeroBackdrop({
  image,
  className,
  sizes = "100vw",
  priority = false,
  shade = 0.52,
}: BoulderHeroBackdropProps) {
  return (
    <div className={cn("relative size-full overflow-hidden", className)}>
      <AppImage
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        qualityPreset="hero"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: shade }}
        aria-hidden
      />
    </div>
  );
}
