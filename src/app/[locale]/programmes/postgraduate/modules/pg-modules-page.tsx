import { ContentContainer } from "@/components/content-container";
import { BreadcrumbNav } from "@/components/programmes/breadcrumb-nav";
import { ImagePlaceholder } from "@/components/programmes/image-placeholder";
import { ModuleCard } from "@/components/programmes/module-card";
import { PageHero } from "@/components/programmes/page-hero";
import type { Module } from "@/lib/types";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

function semesterLabel(type: string, t: (k: string) => string) {
  if (type === "semester_1") return t("semester1");
  if (type === "semester_2") return t("semester2");
  return t("yearLong");
}

export async function PgModulesPage({
  semesterGroupedModules,
}: {
  semesterGroupedModules: { type: string; modules: Module[] }[];
}) {
  const t = await getTranslations("PgModules");
  const bt = await getTranslations("Breadcrumb");

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumb={
          <BreadcrumbNav
            items={[
              { label: bt("home"), href: "/" },
              { label: bt("programmes") },
              { label: bt("postgraduate") },
              { label: bt("modules") },
            ]}
          />
        }
      />

      <ContentContainer className="pb-24">
        <ImagePlaceholder className="mb-12" aspectRatio="wide">
          <Image
            src={"/assets/images/scenes/library.webp"}
            className="object-cover"
            fill
            alt={t("imageAlt")}
          />
        </ImagePlaceholder>

        <div className="space-y-14">
          {semesterGroupedModules.map((section) => (
            <section key={section.type}>
              <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-white/10" />
                <span className="shrink-0">
                  {section.type === "year"
                    ? t("yearLong")
                    : section.type === "semester_1"
                      ? t("semester1")
                      : t("semester2")}
                </span>
                <span className="h-px flex-1 bg-white/10" />
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {section.modules.map((m) => (
                  <ModuleCard
                    key={m.code + m.name}
                    module={m}
                    semesterLabel={semesterLabel(m.semester, t)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </ContentContainer>
    </>
  );
}
