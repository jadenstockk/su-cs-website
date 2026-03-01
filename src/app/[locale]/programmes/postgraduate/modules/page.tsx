import { getPageMetadata } from "@/i18n/metadata";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PgModulesPage } from "./pg-modules-page";

interface PgModuleData {
  code: string;
  name: string;
  description: string;
  lecturer?: string;
}

interface PgGroupData {
  type: string;
  modules: PgModuleData[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPageMetadata(
    locale,
    "pgModules",
    "/programmes/postgraduate/modules",
  );
}

export default async function Page() {
  const t = await getTranslations();

  const data = t.raw("PgModulesData") as { groups: PgGroupData[] };

  const semesterGroups = data.groups.map((g) => ({
    type: g.type,
    modules: g.modules.map((m) => ({
      code: m.code,
      name: m.name,
      description: m.description,
      semester: g.type as "semester_1" | "semester_2" | "year",
      year: 4,
      type: "postgraduate" as const,
      lecturer: m.lecturer ? { name: m.lecturer } : undefined,
    })),
  }));

  return <PgModulesPage semesterGroupedModules={semesterGroups} />;
}
