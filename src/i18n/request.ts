import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure the locale is valid
  if (!locale || !routing.locales.includes(locale as "en" | "af" | "xh")) {
    locale = routing.defaultLocale;
  }

  // Split translations across multiple files for maintainability.
  // To add a new translation file, just import it here and spread it below.
  const [common, ug, pg, research, about] = await Promise.all([
    import(`./messages/${locale}/common.json`),
    import(`./messages/${locale}/ug.json`),
    import(`./messages/${locale}/pg.json`),
    import(`./messages/${locale}/research.json`),
    import(`./messages/${locale}/about.json`),
  ]);

  return {
    locale,
    messages: {
      ...common.default,
      ...ug.default,
      ...pg.default,
      ...research.default,
      ...about.default,
    },
  };
});
