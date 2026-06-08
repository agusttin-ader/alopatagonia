import { AppImage } from "@/components/media/AppImage";

import type { CatalogImage } from "@/lib/catalog/types";
import { IMAGE_QUALITY_GALLERY, IMAGE_SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

type CellPlacement = {
  className: string;
  image: CatalogImage;
  priority?: boolean;
};

function buildGalleryPlacements(images: CatalogImage[]): CellPlacement[] {
  const [main, ...rest] = images;
  if (!main) return [];

  const m = "md:col-start-1 md:col-span-6 md:row-start-1 md:row-span-6";

  if (rest.length === 0) {
    return [{ className: "md:col-span-12 md:row-span-6", image: main, priority: true }];
  }

  if (rest.length === 1) {
    const [a] = rest;
    return [
      { className: m, image: main, priority: true },
      { className: "md:col-start-7 md:col-span-6 md:row-start-1 md:row-span-6", image: a! },
    ];
  }

  if (rest.length === 2) {
    const [a, b] = rest;
    return [
      { className: m, image: main, priority: true },
      { className: "md:col-start-7 md:col-span-3 md:row-start-1 md:row-span-6", image: a! },
      { className: "md:col-start-10 md:col-span-3 md:row-start-1 md:row-span-6", image: b! },
    ];
  }

  if (rest.length === 3) {
    const [a, b, c] = rest;
    return [
      { className: m, image: main, priority: true },
      { className: "md:col-start-7 md:col-span-3 md:row-start-1 md:row-span-3", image: a! },
      { className: "md:col-start-10 md:col-span-3 md:row-start-1 md:row-span-3", image: b! },
      { className: "md:col-start-7 md:col-span-6 md:row-start-4 md:row-span-3", image: c! },
    ];
  }

  if (rest.length === 4) {
    const [a, b, c, d] = rest;
    return [
      { className: m, image: main, priority: true },
      { className: "md:col-start-7 md:col-span-3 md:row-start-1 md:row-span-3", image: a! },
      { className: "md:col-start-10 md:col-span-3 md:row-start-1 md:row-span-2", image: b! },
      { className: "md:col-start-7 md:col-span-3 md:row-start-4 md:row-span-3", image: c! },
      { className: "md:col-start-10 md:col-span-3 md:row-start-3 md:row-span-4", image: d! },
    ];
  }

  const [a, b, c, d, e] = rest;
  return [
    { className: m, image: main, priority: true },
    { className: "md:col-start-7 md:col-span-3 md:row-start-1 md:row-span-3", image: a! },
    { className: "md:col-start-10 md:col-span-3 md:row-start-1 md:row-span-2", image: b! },
    { className: "md:col-start-7 md:col-span-3 md:row-start-4 md:row-span-3", image: c! },
    { className: "md:col-start-10 md:col-span-3 md:row-start-3 md:row-span-2", image: d! },
    { className: "md:col-start-10 md:col-span-3 md:row-start-5 md:row-span-2", image: e! },
  ];
}

type CatalogItemGalleryProps = {
  images: CatalogImage[];
  className?: string;
  onImageClick?: (index: number) => void;
};

export function CatalogItemGallery({
  images,
  className,
  onImageClick,
}: CatalogItemGalleryProps) {
  const placements = buildGalleryPlacements(images);
  if (placements.length === 0) return null;

  const isSingle = placements.length === 1;
  const isInteractive = Boolean(onImageClick);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl lg:rounded-3xl",
        isSingle && "min-h-0",
      )}
    >
      <div
        className={cn(
          "grid grid-cols-12 grid-rows-6 gap-1.5 md:gap-2.5 lg:gap-3",
          isSingle
            ? "min-h-0"
            : "h-[clamp(420px,52vh,560px)] md:h-[clamp(480px,58vh,680px)] lg:h-[clamp(520px,62vh,760px)] xl:h-[clamp(560px,65vh,820px)]",
          className,
        )}
      >
        {placements.map((cell, index) => {
          const sharedClassName = cn(
            "relative min-h-0 overflow-hidden bg-muted/40",
            cell.className,
            isSingle &&
              "col-span-12 row-span-6 aspect-[4/3] md:aspect-auto md:h-[clamp(420px,55vh,680px)] lg:h-[clamp(480px,58vh,760px)]",
            isInteractive &&
              "cursor-zoom-in transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 group",
          );

        const imageNode = (
          <AppImage
            src={cell.image.src}
            alt={cell.image.alt}
            fill
            priority={cell.priority}
            quality={IMAGE_QUALITY_GALLERY}
            className={cn(
              "object-cover motion-safe:transition motion-safe:duration-300",
              isInteractive && "group-hover:scale-[1.015]",
            )}
            sizes={
              cell.priority ? IMAGE_SIZES.catalogItemGallery : IMAGE_SIZES.catalogItemThumb
            }
          />
        );

        if (isInteractive) {
          return (
            <button
              key={`${cell.image.src}-${index}`}
              type="button"
              onClick={() => onImageClick?.(index)}
              aria-label={`Ver foto ${index + 1} ampliada`}
              className={sharedClassName}
            >
              {imageNode}
            </button>
          );
        }

        return (
          <div key={`${cell.image.src}-${index}`} className={sharedClassName}>
            {imageNode}
          </div>
        );
      })}
      </div>
    </div>
  );
}
