"use client";

import type { ComponentPropsWithoutRef, MouseEvent } from "react";

import { trackWhatsAppClick } from "@/lib/analytics";

type WhatsAppLinkProps = ComponentPropsWithoutRef<"a">;

/**
 * Link externo a WhatsApp que cuenta el clic en GA4 (`whatsapp_click`).
 * Compatible con server components (solo este wrapper es client).
 */
export function WhatsAppLink({
  onClick,
  target = "_blank",
  rel = "noopener noreferrer",
  ...props
}: WhatsAppLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented) {
      trackWhatsAppClick();
    }
  };

  return <a {...props} target={target} rel={rel} onClick={handleClick} />;
}
