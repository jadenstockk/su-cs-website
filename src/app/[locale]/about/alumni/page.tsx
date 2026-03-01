import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AlumniPage } from "./alumni-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("aboutAlumniTitle"),
    description: t("aboutAlumniDescription"),
    alternates: {
      canonical: `/${locale}/about/alumni`,
      languages: {
        en: "/en/about/alumni",
        af: "/af/about/alumni",
        xh: "/xh/about/alumni",
      },
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AlumniPage />;
}
