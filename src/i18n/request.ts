import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure the locale is valid
  if (!locale || !routing.locales.includes(locale as "en" | "af" | "xh")) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./languages/${locale}.json`)).default,
  };
});
