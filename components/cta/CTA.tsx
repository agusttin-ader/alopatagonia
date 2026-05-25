import { buttonVariants } from "@/components/ui/button";
import { SECTION_IDS, WHATSAPP_MESSAGES, getWhatsAppUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { CtaTrailMapClient } from "@/components/cta/CtaTrailMapClient";

export function CTA() {
  const whatsappUrl = getWhatsAppUrl(WHATSAPP_MESSAGES.primary);

  return (
    <section
      id={SECTION_IDS.cta}
      className="relative z-0 scroll-mt-24 min-h-[44dvh] px-0 pb-0 sm:min-h-[62dvh]"
      aria-labelledby="cta-heading"
    >
      <div className="relative flex min-h-[44dvh] w-full items-start justify-center overflow-hidden rounded-none bg-background px-6 pb-14 pt-10 text-center ring-1 ring-border/70 sm:min-h-[62dvh] sm:px-10 sm:pb-24 sm:pt-16 2xl:px-20">
        <CtaTrailMapClient />
        <div className="relative z-10 mx-auto w-full max-w-4xl">
          <h2
            id="cta-heading"
            className="font-heading text-3xl font-medium tracking-tight text-brand-forest sm:text-4xl 2xl:text-5xl"
          >
            ¿Alguna duda antes de escribirnos?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-foreground/82 2xl:max-w-2xl 2xl:text-xl">
            Contanos fechas y destino por WhatsApp. Te respondemos con un plan claro.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "marketing", size: "lg" }),
              "motion-cta mt-8 inline-flex h-12 rounded-full px-10 text-base font-semibold 2xl:h-14 2xl:px-12 2xl:text-lg",
            )}
          >
            Escribir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
