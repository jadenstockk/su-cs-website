import { getPageMetadata } from "@/i18n/metadata";
import type { Metadata } from "next";
import { UgGuidePage } from "./ug-guide-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "ugGuide", "/programmes/undergraduate/guide");
}

export default function Page() {
  return <UgGuidePage />;
}
