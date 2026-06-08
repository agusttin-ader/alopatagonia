import { DestinationIndexCard } from "@/components/catalog/DestinationIndexCard";
import { getDestinationsByZone } from "@/lib/catalog/destination-zones";

export function DestinationsIndex() {
  const zones = getDestinationsByZone();

  return (
    <div className="mt-10 space-y-16 lg:space-y-20">
      {zones.map((zone) => (
        <section key={zone.id} aria-labelledby={`${zone.id}-heading`}>
          <div className="border-b border-border/70 pb-5">
            <h2
              id={`${zone.id}-heading`}
              className="font-heading text-2xl font-medium tracking-tight sm:text-3xl"
            >
              {zone.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {zone.description}
            </p>
          </div>

          <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {zone.destinations.map((destination) => (
              <DestinationIndexCard key={destination.slug} destination={destination} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
