import { getPageMetadata } from "@/i18n/metadata";
import type { Metadata } from "next";
import { PgProspectivePage } from "./pg-prospective-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(
    locale,
    "pgProspective",
    "/programmes/postgraduate/prospective",
  );
}

export default function Page() {
  return <PgProspectivePage />;
}
