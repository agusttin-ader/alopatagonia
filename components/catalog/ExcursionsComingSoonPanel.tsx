"use client";

import { useTranslations } from "next-intl";

type ExcursionsComingSoonPanelProps = {
  destinationName: string;
};

export function ExcursionsComingSoonPanel({ destinationName }: ExcursionsComingSoonPanelProps) {
  const t = useTranslations("catalog");

  return (
    <div className="rounded-2xl border border-border/70 bg-card/60 px-6 py-8 shadow-sm sm:px-8 sm:py-10">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary/85">
        {t("excursionsComingSoon.eyebrow")}
      </p>
      <h3 className="font-heading mt-3 text-2xl font-medium tracking-tight text-foreground sm:text-[1.65rem]">
        {t("excursionsComingSoon.title")}
      </h3>
      <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-foreground/78 sm:text-base">
        {t("excursionsComingSoon.body", { destination: destinationName })}
      </p>
    </div>
  );
}
