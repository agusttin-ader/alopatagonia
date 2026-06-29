import { getRequestConfig } from "next-intl/server";

import { routing, type AppLocale } from "./routing";

async function loadMessages(locale: AppLocale) {
  const base = (await import(`../messages/${locale}.json`)).default;

  if (locale === "es") return base;

  let messages = { ...base };

  try {
    const accommodationItems = (await import(`../messages/accommodations/${locale}.json`)).default;
    messages = {
      ...messages,
      accommodations: {
        ...messages.accommodations,
        items: {
          ...(messages.accommodations?.items ?? {}),
          ...(accommodationItems.items ?? {}),
        },
      },
    };
  } catch {
    // locale-specific accommodation copy optional
  }

  try {
    const excursionItems = (await import(`../messages/excursions/${locale}.json`)).default;
    messages = {
      ...messages,
      excursions: {
        ...messages.excursions,
        items: {
          ...(messages.excursions?.items ?? {}),
          ...(excursionItems.items ?? {}),
        },
      },
    };
  } catch {
    // locale-specific excursion copy optional
  }

  return messages;
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
