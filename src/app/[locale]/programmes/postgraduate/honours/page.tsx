import { getPageMetadata } from "@/i18n/metadata";
import type { Metadata } from "next";
import { PgHonoursPage } from "./pg-honours-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(
    locale,
    "pgHonours",
    "/programmes/postgraduate/honours",
  );
}

export default function Page() {
  return <PgHonoursPage />;
}
