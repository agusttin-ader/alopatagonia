import { getTranslations } from "next-intl/server";

import { AppImage } from "@/components/media/AppImage";
import { Link } from "@/i18n/navigation";
import { IMAGE_SIZES } from "@/lib/image-config";
import { PLANNER_BANNER } from "@/lib/constants";

export async function TripPlannerPageIntro() {
  const t = await getTranslations("planner");

  return (
    <section
      className="relative flex min-h-[40vh] flex-col justify-end overflow-hidden px-4 pb-10 pt-28 sm:min-h-[44vh] sm:px-8 sm:pb-12 sm:pt-32 lg:px-14 2xl:px-20"
      aria-labelledby="planner-page-heading"
    >
      <AppImage
        src={PLANNER_BANNER.src}
        alt={t("bannerAlt")}
        fill
        priority
        qualityPreset="hero"
        className="object-cover"
        sizes={IMAGE_SIZES.viewport}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/80 via-black/45 via-55% to-black/10"
        aria-hidden
      />
      <div className="relative z-[3] mx-auto w-full max-w-7xl 2xl:max-w-[90rem]">
        <nav className="mb-4 text-sm text-white/88 [text-shadow:0_1px_4px_rgba(0,0,0,0.45)]">
          <Link href="/" className="hover:text-white">
            {t("breadcrumbHome")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-white">{t("page.title")}</span>
        </nav>
        <p className="text-sm font-medium text-white/92 [text-shadow:0_1px_4px_rgba(0,0,0,0.45)]">
          {t("page.regionLabel")}
        </p>
        <h1
          id="planner-page-heading"
          className="font-heading mt-2 max-w-3xl text-3xl font-medium tracking-tight text-white sm:text-4xl 2xl:text-5xl [text-shadow:0_2px_10px_rgba(0,0,0,0.42)]"
        >
          {t("page.title")}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/94 sm:text-lg [text-shadow:0_1px_6px_rgba(0,0,0,0.4)]">
          {t("page.description")}
        </p>
      </div>
    </section>
  );
}
