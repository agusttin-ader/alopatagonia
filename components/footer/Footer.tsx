import { Share2 } from "lucide-react";

import { SITE, getWhatsAppUrl } from "@/lib/constants";

export function Footer() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <footer className="border-t border-border bg-background px-6 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-heading text-lg font-medium text-foreground">
            {SITE.name}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{SITE.tagline}</p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:items-end">
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
      <p className="mx-auto mt-10 max-w-6xl text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados.
      </p>
    </footer>
  );
}
