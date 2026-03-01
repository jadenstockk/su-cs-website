import { getPageMetadata } from "@/i18n/metadata";
import type { Metadata } from "next";
import { ResearchPage } from "./research-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "research", "/research");
}

export default function Page() {
  return <ResearchPage />;
}
