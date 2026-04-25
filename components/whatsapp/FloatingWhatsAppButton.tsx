import { WHATSAPP_MESSAGES, getWhatsAppUrl } from "@/lib/constants";

export function FloatingWhatsAppButton() {
  const whatsappUrl = getWhatsAppUrl(WHATSAPP_MESSAGES.primary);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar por WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-xl transition-[transform,background-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:scale-[1.04] hover:bg-[#1fb85a] hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25d366]/60 focus-visible:ring-offset-2 motion-reduce:transition-none sm:bottom-7 sm:right-7"
    >
      <span className="sr-only">WhatsApp</span>
      <svg
        viewBox="0 0 24 24"
        className="size-7"
        fill="currentColor"
        aria-hidden
      >
        <path d="M19.11 4.93A9.88 9.88 0 0 0 12.03 2C6.58 2 2.14 6.43 2.14 11.89c0 1.74.46 3.44 1.33 4.94L2 22l5.29-1.39a9.85 9.85 0 0 0 4.72 1.2h.01c5.45 0 9.89-4.43 9.89-9.9a9.81 9.81 0 0 0-2.8-6.98ZM12.02 20.1h-.01a8.14 8.14 0 0 1-4.15-1.14l-.3-.18-3.14.82.84-3.06-.2-.31a8.2 8.2 0 0 1-1.27-4.33c0-4.51 3.68-8.18 8.22-8.18a8.15 8.15 0 0 1 5.8 2.39 8.08 8.08 0 0 1 2.4 5.8c0 4.51-3.69 8.19-8.19 8.19Zm4.48-6.14c-.25-.13-1.46-.72-1.68-.8-.22-.08-.38-.12-.54.13-.16.25-.62.8-.76.96-.14.16-.28.18-.53.06-.25-.13-1.04-.38-1.99-1.22-.74-.65-1.24-1.45-1.38-1.7-.14-.25-.01-.39.11-.51.11-.11.25-.28.37-.42.12-.14.16-.25.24-.41.08-.16.04-.31-.02-.44-.06-.13-.54-1.3-.74-1.78-.2-.48-.4-.4-.54-.4h-.46c-.16 0-.41.06-.63.31-.22.25-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.46-.6 1.67-1.17.21-.57.21-1.05.15-1.17-.06-.12-.22-.19-.47-.32Z" />
      </svg>
    </a>
  );
}
