import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { StudentsPage } from "./students-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("aboutStudentsTitle"),
    description: t("aboutStudentsDescription"),
    alternates: {
      canonical: `/${locale}/about/students`,
      languages: {
        en: "/en/about/students",
        af: "/af/about/students",
        xh: "/xh/about/students",
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
  return <StudentsPage />;
}
