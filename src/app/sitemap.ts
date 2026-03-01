import type { MetadataRoute } from "next";

const BASE_URL = "https://cs.sun.ac.za";

const locales = ["en", "af", "xh"] as const;

const routes = [
  "",
  "/contact",
  "/programmes",
  "/research",
  "/programmes/undergraduate/modules",
  "/programmes/undergraduate/guide",
  "/programmes/undergraduate/prospective",
  "/programmes/postgraduate/modules",
  "/programmes/postgraduate/prospective",
  "/programmes/postgraduate/honours",
  "/programmes/postgraduate/masters",
  "/programmes/postgraduate/phd",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : route === "/programmes" ? 0.9 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${route}`]),
          ),
        },
      });
    }
  }

  return entries;
}
