import { getWhatsAppUrl } from "@/lib/constants";

import { HeroBackground } from "./hero-background";
import { HeroClient } from "./hero-client";

export function Hero() {
  const whatsappUrl = getWhatsAppUrl();

  return (
    <header className="relative isolate min-h-[100dvh] overflow-hidden bg-[#1a2f2a]">
      <HeroBackground />
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background: [
            "linear-gradient(to bottom, rgba(26,47,42,0.48), rgba(26,47,42,0.15), rgba(26,47,42,0.58))",
            "linear-gradient(to top right, rgba(47,93,80,0.14), transparent, rgba(0,0,0,0.1))",
            "linear-gradient(to top, rgba(0,0,0,0.14), transparent, transparent)",
          ].join(","),
        }}
        aria-hidden
      />
      <HeroClient whatsappUrl={whatsappUrl} />
    </header>
  );
}
