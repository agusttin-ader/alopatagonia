import Image from "next/image";
import Link from "next/link";

import { CatalogItemShowcase } from "@/components/catalog/CatalogItemShowcase";
import { buttonVariants } from "@/components/ui/button";
import {
  buildCarRentalWhatsAppMessage,
} from "@/lib/catalog/placeholders";
import type { CatalogItem, DestinationCatalog } from "@/lib/catalog/types";
import { getWhatsAppUrl } from "@/lib/constants";
import { IMAGE_QUALITY_GALLERY, IMAGE_SIZES } from "@/lib/image-config";
import { cn } from "@/lib/utils";

function accommodationBadge(item: CatalogItem) {
  if (item.type === "cabana") return "Cabaña";
  if (item.type === "departamento") return "Departamento";
  return "Hostel";
}

export function DestinationDetail({ destination }: { destination: DestinationCatalog }) {
  const carWhatsApp = getWhatsAppUrl(buildCarRentalWhatsAppMessage(destination.name));

  return (
    <>
      <section className="relative min-h-[40vh] overflow-hidden px-4 pb-10 pt-28 sm:px-8 sm:pt-32 lg:px-14 2xl:px-20">
        <Image
          src={destination.heroImage}
          alt={destination.name}
          fill
          priority
          quality={IMAGE_QUALITY_GALLERY}
          className="object-cover"
          sizes={IMAGE_SIZES.viewport}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30" />
        <div className="relative mx-auto max-w-7xl 2xl:max-w-[90rem]">
          <nav className="mb-4 text-sm text-white/85">
            <Link href="/" className="hover:text-white">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <Link href="/destinos" className="hover:text-white">
              Destinos
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{destination.name}</span>
          </nav>
          <p className="text-sm font-medium text-white/90">{destination.region}</p>
          <h1 className="font-heading mt-2 max-w-3xl text-3xl font-medium tracking-tight text-white sm:text-4xl">
            {destination.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/92 sm:text-lg">
            {destination.intro}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 sm:px-8 lg:px-14 2xl:max-w-[90rem] 2xl:py-14">
        <section aria-labelledby="alojamientos-heading">
          <h2
            id="alojamientos-heading"
            className="font-heading text-2xl font-medium tracking-tight sm:text-3xl"
          >
            Alojamientos
          </h2>
          <div className="mt-8 flex flex-col gap-10">
            {destination.accommodations.map((item) => (
              <CatalogItemShowcase
                key={item.id}
                item={item}
                destinationName={destination.name}
                badge={accommodationBadge(item)}
              />
            ))}
          </div>
        </section>

        <section aria-labelledby="excursiones-heading">
          <h2
            id="excursiones-heading"
            className="font-heading text-2xl font-medium tracking-tight sm:text-3xl"
          >
            Excursiones
          </h2>
          <div className="mt-8 flex flex-col gap-10">
            {destination.excursions.map((item) => (
              <CatalogItemShowcase
                key={item.id}
                item={item}
                destinationName={destination.name}
                badge="Excursión"
              />
            ))}
          </div>
        </section>

        <section
          aria-labelledby="auto-heading"
          className="rounded-2xl border border-border/80 bg-muted/30 p-6 sm:p-8"
        >
          <h2
            id="auto-heading"
            className="font-heading text-2xl font-medium tracking-tight sm:text-3xl"
          >
            Alquiler de auto
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {destination.carRental.description}
          </p>
          <p className="mt-2 text-sm font-medium">
            Operador:{" "}
            <span className="font-normal text-muted-foreground">
              {destination.carRental.operatorName}
            </span>
          </p>
          <a
            href={carWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "marketing", size: "lg" }), "mt-6 inline-flex")}
          >
            Consultar auto
          </a>
        </section>
      </div>
    </>
  );
}
