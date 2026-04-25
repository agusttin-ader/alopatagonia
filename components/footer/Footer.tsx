import { Share2 } from "lucide-react";

import { SITE, WHATSAPP_MESSAGES, getWhatsAppUrl } from "@/lib/constants";

export function Footer() {
  const whatsappUrl = getWhatsAppUrl(WHATSAPP_MESSAGES.secondary);

  return (
    <footer className="border-t border-border bg-background px-4 py-12 sm:px-8 lg:px-14 2xl:px-20">
      <div className="mx-auto flex max-w-7xl 2xl:max-w-[90rem] flex-col gap-8 sm:flex-row sm:items-center sm:justify-between 2xl:py-2">
        <div>
          <p className="font-heading text-lg font-medium text-foreground 2xl:text-xl">
            {SITE.name}
          </p>
          <p className="mt-1 text-sm text-muted-foreground 2xl:text-base">{SITE.tagline}</p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:items-end 2xl:text-base">
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-medium text-foreground underline-offset-4 hover:underline"
          >
            <Share2 className="size-4" aria-hidden />
            Instagram
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="hover:text-foreground"
          >
            {SITE.email}
          </a>
          <p>{SITE.phoneDisplay}</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary hover:underline"
          >
            WhatsApp
          </a>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl 2xl:max-w-[90rem] text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
      </p>
    </footer>
  );
}
