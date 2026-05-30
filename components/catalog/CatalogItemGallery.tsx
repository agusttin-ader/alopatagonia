import Image from "next/image";

import type { CatalogImage } from "@/lib/catalog/types";
import { IMAGE_QUALITY_GALLERY, IMAGE_SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

type CellPlacement = {
  className: string;
  image: CatalogImage;
  priority?: boolean;
};

/** Layout tipo vitrina: foto principal izquierda + mosaico derecho (hasta 6 fotos). */
function buildGalleryPlacements(images: CatalogImage[]): CellPlacement[] {
  const [main, ...rest] = images;
  if (!main) return [];

  if (rest.length === 0) {
    return [{ className: "col-span-12 row-span-6", image: main, priority: true }];
  }

  if (rest.length === 1) {
    return [
      { className: "col-span-7 row-span-6", image: main, priority: true },
      { className: "col-span-5 row-span-6", image: rest[0]! },
    ];
  }

  if (rest.length === 2) {
    return [
      { className: "col-span-7 row-span-6", image: main, priority: true },
      { className: "col-span-5 row-span-3", image: rest[0]! },
      { className: "col-span-5 row-span-3", image: rest[1]! },
    ];
  }

  if (rest.length === 3) {
    return [
      { className: "col-span-5 row-span-6", image: main, priority: true },
      { className: "col-span-3 row-span-3", image: rest[0]! },
      { className: "col-span-3 row-span-3", image: rest[1]! },
      { className: "col-span-4 row-span-6", image: rest[2]! },
    ];
  }

  if (rest.length === 4) {
    return [
      { className: "col-span-5 row-span-6", image: main, priority: true },
      { className: "col-span-3 row-span-3", image: rest[0]! },
      { className: "col-span-3 row-span-3", image: rest[1]! },
      { className: "col-span-4 row-span-3", image: rest[2]! },
      { className: "col-span-4 row-span-3", image: rest[3]! },
    ];
  }

  // 5 secundarias: columna media (2) + columna derecha (3), estilo vitrina
  const [a, b, c, d, e] = rest;
  return [
    { className: "col-span-5 row-span-6", image: main, priority: true },
    { className: "col-span-3 row-span-3", image: a! },
    { className: "col-span-3 row-span-3", image: b! },
    { className: "col-span-4 row-span-2", image: c! },
    { className: "col-span-4 row-span-2", image: d! },
    { className: "col-span-4 row-span-2", image: e! },
  ];
}

type CatalogItemGalleryProps = {
  images: CatalogImage[];
  className?: string;
};

export function CatalogItemGallery({ images, className }: CatalogItemGalleryProps) {
  const placements = buildGalleryPlacements(images);
  if (placements.length === 0) return null;

  const isSingle = placements.length === 1;

  return (
    <div
      className={cn(
        "grid grid-cols-12 gap-2 sm:gap-2.5",
        isSingle ? "min-h-0" : "min-h-[280px] sm:min-h-[360px] lg:min-h-[420px]",
        isSingle ? "grid-rows-1" : "grid-rows-6",
        className,
      )}
    >
      {placements.map((cell, index) => (
        <div
          key={`${cell.image.src}-${index}`}
          className={cn(
            "relative overflow-hidden rounded-xl bg-muted sm:rounded-2xl",
            cell.className,
            isSingle && "aspect-[16/10]",
          )}
        >
          <Image
            src={cell.image.src}
            alt={cell.image.alt}
            fill
            priority={cell.priority}
            quality={IMAGE_QUALITY_GALLERY}
            className="object-cover motion-safe:transition motion-safe:duration-300 [@media(hover:hover)]:hover:scale-[1.02]"
            sizes={
              cell.priority ? IMAGE_SIZES.catalogItemGallery : IMAGE_SIZES.catalogItemThumb
            }
          />
        </div>
      ))}
    </div>
  );
}
