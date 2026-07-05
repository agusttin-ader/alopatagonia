import type { getTranslations } from "next-intl/server";

import { EXCURSIONES_HUB_FAQ, type SeoFaqItem } from "@/lib/seo-destinations";

type Translator = Awaited<ReturnType<typeof getTranslations>>;

export function getLocalizedExcursionesHubFaq(t: Translator, locale: string): SeoFaqItem[] {
  if (locale === "es") return [...EXCURSIONES_HUB_FAQ];

  return t.raw("faq") as SeoFaqItem[];
}
