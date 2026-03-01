import { CodeShowcaseSection } from "@/components/home/code-showcase";
import { HeroSection } from "@/components/home/hero-section";
import { ProgrammeJourneySection } from "@/components/home/programme-journey";
import { getPageMetadata } from "@/i18n/metadata";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(locale, "home", "");
}

export default async function Home() {
  return (
    <>
      <HeroSection />
      <ProgrammeJourneySection />

      <CodeShowcaseSection />
    </>
  );
}
