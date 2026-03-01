import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { DepartmentPage } from "./department-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("aboutDepartmentTitle"),
    description: t("aboutDepartmentDescription"),
    alternates: {
      canonical: `/${locale}/about/department`,
      languages: {
        en: "/en/about/department",
        af: "/af/about/department",
        xh: "/xh/about/department",
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
  return <DepartmentPage />;
}
