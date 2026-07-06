import { getTranslations } from "next-intl/server";

import { AboutUsRotatingBackground } from "@/components/about/AboutUsRotatingImage";
import { SiteLogo } from "@/components/brand/SiteLogo";
import { buttonVariants } from "@/components/ui/button";
import { SECTION_IDS, getWhatsAppUrl } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ABOUT_OVERLAY = [
  "linear-gradient(to bottom, rgba(14,17,6,0.74), rgba(14,17,6,0.52) 38%, rgba(14,17,6,0.62) 68%, rgba(14,17,6,0.82))",
  "radial-gradient(circle at 50% 28%, rgba(218,209,156,0.1) 0%, transparent 55%)",
].join(",");

export async function AboutUsSection() {
  const t = await getTranslations("aboutUs");
  const paragraphs = t.raw("paragraphs") as string[];
  const whatsappUrl = getWhatsAppUrl(t("whatsappMessage"));

  return (
    <section
      id={SECTION_IDS.aboutUs}
      className="relative isolate scroll-mt-24 overflow-hidden"
      aria-labelledby="about-us-heading"
    >
      <AboutUsRotatingBackground />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: ABOUT_OVERLAY }}
        aria-hidden
      />

      <div className="relative z-[2] mx-auto flex min-h-[min(72vh,720px)] w-full max-w-3xl flex-col items-center justify-center px-4 py-16 text-center sm:min-h-[min(80vh,820px)] sm:px-8 sm:py-24 lg:max-w-4xl lg:px-12 lg:py-28">
        <SiteLogo
          linked={false}
          variant="onDark"
          className="h-[clamp(3.75rem,10vw,5.75rem)] w-auto drop-shadow-[0_10px_32px_rgba(0,0,0,0.5)]"
        />

        <p className="mt-7 text-sm font-medium uppercase tracking-[0.18em] text-white/82 sm:text-[0.9375rem] [text-shadow:0_1px_4px_rgba(0,0,0,0.45)]">
          {t("eyebrow")}
        </p>
        <h2
          id="about-us-heading"
          className="font-heading mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl lg:text-[2.75rem] [text-shadow:0_2px_12px_rgba(0,0,0,0.42)]"
        >
          {t("title")}
        </h2>

        <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-white/92 sm:mt-9 sm:space-y-6 sm:text-lg lg:text-[1.125rem] lg:leading-[1.65] [text-shadow:0_1px_6px_rgba(0,0,0,0.38)]">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <p className="font-heading mt-8 max-w-xl text-xl font-medium text-white sm:mt-10 sm:text-2xl [text-shadow:0_1px_8px_rgba(0,0,0,0.42)]">
          {t("closing")}
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "marketing", size: "lg" }),
            "motion-cta mt-10 inline-flex h-12 rounded-full px-8 text-base font-semibold sm:mt-12 2xl:h-14 2xl:px-10 2xl:text-lg",
          )}
        >
          {t("cta")}
        </a>
      </div>
    </section>
  );
}
