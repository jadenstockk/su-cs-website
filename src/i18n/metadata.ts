import type { Metadata } from "next";

type MetadataMessages = Record<string, string>;

const metadataCache = new Map<string, MetadataMessages>();

/**
 * Reads the Metadata namespace directly from the common.json file
 * for the given locale. This bypasses the next-intl request context
 * which isn't reliably available in child page generateMetadata functions.
 */
async function getMetadataMessages(locale: string): Promise<MetadataMessages> {
  if (metadataCache.has(locale)) {
    return metadataCache.get(locale)!;
  }

  const mod = await import(`./messages/${locale}/common.json`);
  const messages = mod.default.Metadata as MetadataMessages;
  metadataCache.set(locale, messages);
  return messages;
}

type PageMetadataKey =
  | "home"
  | "contact"
  | "programmes"
  | "research"
  | "ugModules"
  | "ugGuide"
  | "ugProspective"
  | "pgModules"
  | "pgProspective"
  | "pgHonours"
  | "pgMasters"
  | "pgPhd";

const titleKeys: Record<PageMetadataKey, string> = {
  home: "homeTitle",
  contact: "contactTitle",
  programmes: "programmesTitle",
  research: "researchTitle",
  ugModules: "ugModulesTitle",
  ugGuide: "ugGuideTitle",
  ugProspective: "ugProspectiveTitle",
  pgModules: "pgModulesTitle",
  pgProspective: "pgProspectiveTitle",
  pgHonours: "pgHonoursTitle",
  pgMasters: "pgMastersTitle",
  pgPhd: "pgPhdTitle",
};

const descKeys: Record<PageMetadataKey, string> = {
  home: "homeDescription",
  contact: "contactDescription",
  programmes: "programmesDescription",
  research: "researchDescription",
  ugModules: "ugModulesDescription",
  ugGuide: "ugGuideDescription",
  ugProspective: "ugProspectiveDescription",
  pgModules: "pgModulesDescription",
  pgProspective: "pgProspectiveDescription",
  pgHonours: "pgHonoursDescription",
  pgMasters: "pgMastersDescription",
  pgPhd: "pgPhdDescription",
};

const locales = ["en", "af", "xh"] as const;

/**
 * Generates page-level metadata with localised title, description, and hreflang alternates.
 */
export async function getPageMetadata(
  locale: string,
  page: PageMetadataKey,
  path: string,
): Promise<Metadata> {
  const m = await getMetadataMessages(locale);

  const pageTitle = m[titleKeys[page]];

  return {
    title: page === "home" ? { absolute: m.title } : pageTitle,
    description: m[descKeys[page]],
    alternates: {
      canonical: `/${locale}${path}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
    },
  };
}
