import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPageMetadata } from "@/i18n/metadata";
import { UgModulesPage } from "./ug-modules-page";

interface ModuleData {
  code: string;
  name: string;
  semester: "semester_1" | "semester_2" | "year";
  description: string;
}

interface GroupData {
  label: string;
  modules: ModuleData[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(
    locale,
    "ugModules",
    "/programmes/undergraduate/modules",
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const data = t.raw("UgModulesData") as {
    groups: GroupData[];
    coreCurriculumNote: string;
  };

  const yearGroups = data.groups.map((g) => ({
    label: g.label,
    modules: g.modules.map((m) => ({
      code: m.code,
      name: m.name,
      semester: m.semester,
      description: m.description,
      year: 0,
      type: "undergraduate" as const,
    })),
  }));

  return <UgModulesPage yearGroupedModules={yearGroups} />;
}
