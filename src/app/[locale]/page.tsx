import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { CodeShowcaseSection } from "@/components/home/code-showcase";
import { HeroSection } from "@/components/home/hero-section";
import { ProgrammeJourneySection } from "@/components/home/programme-journey";
import { getPageMetadata } from "@/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "home", "");
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <HeroSection />
      <ProgrammeJourneySection />

      <CodeShowcaseSection />
    </>
  );
}
