import { getPageMetadata } from "@/i18n/metadata";
import type { Metadata } from "next";
import { ProgrammesWizard } from "./programmes-wizard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "programmes", "/programmes");
}

export default function Page() {
  return <ProgrammesWizard />;
}
