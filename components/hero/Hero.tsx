import { HeroBackground } from "./hero-background";
import { HeroClient } from "./hero-client";

export function Hero() {
  return (
    <header className="relative isolate min-h-[100dvh] overflow-hidden bg-[#222601]">
      <HeroBackground />
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background: [
            "linear-gradient(to bottom, rgba(34,38,1,0.42), rgba(34,38,1,0.14), rgba(34,38,1,0.54))",
            "linear-gradient(to top right, rgba(217,212,186,0.1), transparent 45%, rgba(113,115,54,0.1))",
          ].join(","),
        }}
        aria-hidden
      />
      <HeroClient />
    </header>
  );
}
