import { HeroBackground } from "./hero-background";
import { HeroClient } from "./hero-client";

const HERO_OVERLAY = [
  "linear-gradient(to bottom, rgba(34,38,1,0.42), rgba(34,38,1,0.14), rgba(34,38,1,0.54))",
  "linear-gradient(to top right, rgba(217,212,186,0.1), transparent 45%, rgba(113,115,54,0.1))",
  "radial-gradient(circle at 50% 18%, rgba(218,209,156,0.22) 0%, rgba(218,209,156,0.06) 42%, transparent 68%)",
].join(",");

export function Hero() {
  return (
    <header
      id="inicio"
      className="relative isolate min-h-[100dvh] overflow-hidden bg-[#222601]"
    >
      <HeroBackground />
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{ background: HERO_OVERLAY }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 z-[4] h-28 w-[195%] -translate-x-1/2 rounded-t-[100%] bg-background -bottom-20 sm:-bottom-28 sm:h-32 sm:w-[140%] md:-bottom-32 md:h-36 md:w-[145%] lg:-bottom-36 lg:h-44 lg:w-[150%] 2xl:-bottom-44 2xl:h-56 2xl:w-[165%]"
        aria-hidden
      />
      <HeroClient />
    </header>
  );
}
