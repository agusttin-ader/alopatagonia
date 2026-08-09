/** Evento GA4 para clics en CTAs que abren WhatsApp. */
export const WHATSAPP_CLICK_EVENT = "whatsapp_click";

/** Registra un clic hacia WhatsApp (total en GA4 → Eventos → whatsapp_click). */
export function trackWhatsAppClick(): void {
  if (typeof window === "undefined") return;
  window.gtag?.("event", WHATSAPP_CLICK_EVENT);
}
