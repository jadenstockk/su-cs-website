import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { StaffPage } from "./staff-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("aboutStaffTitle"),
    description: t("aboutStaffDescription"),
    alternates: {
      canonical: `/${locale}/about/staff`,
      languages: {
        en: "/en/about/staff",
        af: "/af/about/staff",
        xh: "/xh/about/staff",
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
  return <StaffPage />;
}
