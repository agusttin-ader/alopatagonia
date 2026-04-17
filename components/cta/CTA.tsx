import { CtaTrailMap } from "@/components/cta/cta-trail-map";
import { buttonVariants } from "@/components/ui/button";
import { SECTION_IDS, getWhatsAppUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function CTA() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <section
      id={SECTION_IDS.cta}
      className="scroll-mt-6 px-6 pb-20 sm:px-10 lg:px-16"
      aria-labelledby="cta-heading"
    >
      <div className="relative mx-auto min-h-[220px] max-w-6xl overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center shadow-xl ring-1 ring-black/10 sm:min-h-[240px] sm:px-12 sm:py-20">
        <CtaTrailMap />
        <div className="relative z-10">
          <h2
            id="cta-heading"
            className="font-heading text-3xl font-medium tracking-tight text-primary-foreground sm:text-4xl"
          >
            Planificá tu viaje hoy
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/90">
            Contanos fechas y destinos soñados: respondemos con una propuesta
            acorde a tu presupuesto y tiempo.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "mt-10 inline-flex h-12 rounded-full px-10 text-base font-semibold shadow-lg",
            )}
          >
            Hablar ahora
          </a>
        </div>
      </div>
    </section>
  );
}
