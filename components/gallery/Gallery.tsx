import { GalleryMosaic } from "@/components/gallery/gallery-mosaic";
import { Reveal } from "@/components/motion/reveal";
import { GALLERY_IMAGES, SECTION_IDS } from "@/lib/constants";

export function Gallery() {
  return (
    <section
      id={SECTION_IDS.gallery}
      className="scroll-mt-6 bg-background px-6 py-20 sm:px-10 lg:px-16"
      aria-labelledby="galeria-heading"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Galería
          </p>
          <h2
            id="galeria-heading"
            className="font-heading mt-3 text-3xl font-medium tracking-tight text-foreground sm:text-4xl"
          >
            Un poco de lo que nos rodea
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Escenas del sur —lagos, hielo, senderos y cielos— en la misma línea
            que compartimos día a día en redes. Demo con material propio.
          </p>
          <p className="mt-2 text-sm text-muted-foreground/90">
            Hacé clic en una foto para ampliarla.
          </p>
        </Reveal>

        <GalleryMosaic images={GALLERY_IMAGES} />
      </div>
    </section>
  );
}
