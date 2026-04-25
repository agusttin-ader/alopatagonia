import { CtaTrailMap } from "@/components/cta/cta-trail-map";
import { buttonVariants } from "@/components/ui/button";
import { SECTION_IDS, WHATSAPP_MESSAGES, getWhatsAppUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function CTA() {
  const whatsappUrl = getWhatsAppUrl(WHATSAPP_MESSAGES.primary);

  return (
    <section
      id={SECTION_IDS.cta}
      className="scroll-mt-6 min-h-[72dvh] px-0 pb-0"
      aria-labelledby="cta-heading"
    >
      <div className="relative flex min-h-[72dvh] w-full items-center justify-center overflow-hidden rounded-none bg-[#2D5A47] px-6 py-16 text-center shadow-xl ring-1 ring-black/10 sm:px-10 sm:py-20 2xl:px-20">
        <CtaTrailMap />
        <div className="relative z-10">
          <h2
            id="cta-heading"
            className="font-heading text-3xl font-medium tracking-tight text-primary-foreground sm:text-4xl 2xl:text-5xl"
          >
            Empeza a planear tu viaje hoy
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/90 2xl:max-w-2xl 2xl:text-xl">
            Escribinos y armamos una propuesta clara para que viajes a Patagonia
            con todo resuelto en un solo lugar.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "mt-10 inline-flex h-12 rounded-full px-10 text-base font-semibold shadow-lg 2xl:h-14 2xl:px-12 2xl:text-lg",
            )}
          >
            Hablar por WhatsApp ahora
          </a>
        </div>
      </div>
    </section>
  );
}
