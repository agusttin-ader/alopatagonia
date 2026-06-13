import { getRequestConfig } from "next-intl/server";

import { routing, type AppLocale } from "./routing";

async function loadMessages(locale: AppLocale) {
  const base = (await import(`../messages/${locale}.json`)).default;

  if (locale === "es") return base;

  try {
    const accommodationItems = (await import(`../messages/accommodations/${locale}.json`)).default;
    return {
      ...base,
      accommodations: {
        ...base.accommodations,
        items: {
          ...(base.accommodations?.items ?? {}),
          ...(accommodationItems.items ?? {}),
        },
      },
    };
  } catch {
    return base;
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as AppLocale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: await loadMessages(locale as AppLocale),
  };
});
