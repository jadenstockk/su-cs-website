import { getPageMetadata } from "@/i18n/metadata";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PgGuidePage } from "./pg-guide-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "pgGuide", "/programmes/postgraduate/guide");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PgGuidePage />;
}
