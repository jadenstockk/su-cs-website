import { getPageMetadata } from "@/i18n/metadata";
import type { Metadata } from "next";
import { ContactPage } from "./contact-page";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "contact", "/contact");
}

export default function Page() {
  return <ContactPage />;
}
