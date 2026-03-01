import { getPageMetadata } from "@/i18n/metadata";
import type { Metadata } from "next";
import { PgPhdPage } from "./pg-phd-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "pgPhd", "/programmes/postgraduate/phd");
}

export default function Page() {
  return <PgPhdPage />;
}
