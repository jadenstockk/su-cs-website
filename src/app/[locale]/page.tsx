import { AcademicStaffPreview } from "@/components/home/academic-staff-preview";

import { FAQS } from "@/components/home/faqs";
import { HeroSection } from "@/components/home/hero-section";
import { NeedHelp } from "@/components/home/need-help";
import Postgraduate from "@/components/home/postgraduate";
import { StudentResources } from "@/components/home/student-resources";
import Undergraduate from "@/components/home/undergraduate";
import Welcome from "@/components/home/welcome";
import { getPageMetadata } from "@/i18n/metadata";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

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
      <Welcome />
      <Undergraduate />
      <Postgraduate />
      <AcademicStaffPreview />
      <StudentResources />
      <FAQS />
      <NeedHelp />
    </>
  );
}
