import { getPageMetadata } from "@/i18n/metadata";
import type { Metadata } from "next";
import { PgMastersPage } from "./pg-masters-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(
    locale,
    "pgMasters",
    "/programmes/postgraduate/masters",
  );
}

export default function Page() {
  return <PgMastersPage />;
}
