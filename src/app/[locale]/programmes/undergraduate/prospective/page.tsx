import { getPageMetadata } from "@/i18n/metadata";
import type { Metadata } from "next";
import { UgProspectivePage } from "./ug-prospective-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(
    locale,
    "ugProspective",
    "/programmes/undergraduate/prospective",
  );
}

export default function Page() {
  return <UgProspectivePage />;
}
