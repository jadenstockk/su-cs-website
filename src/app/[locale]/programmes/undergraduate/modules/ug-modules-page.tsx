import { ContentContainer } from "@/components/content-container";
import { GlassPanel } from "@/components/glass-panel";
import { BreadcrumbNav } from "@/components/programmes/breadcrumb-nav";
import { ImagePlaceholder } from "@/components/programmes/image-placeholder";
import { ModuleCard } from "@/components/programmes/module-card";
import { PageHero } from "@/components/programmes/page-hero";
import type { Module } from "@/lib/types";

import { getTranslations } from "next-intl/server";
import Image from "next/image";

function semesterLabel(s: string, t: (k: string) => string) {
  if (s === "semester_1") return t("semester1");
  if (s === "semester_2") return t("semester2");
  return t("yearLong");
}

export async function UgModulesPage({
  yearGroupedModules,
}: {
  yearGroupedModules: { label: string; modules: Module[] }[];
}) {
  const t = await getTranslations("UgModules");
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
              { label: bt("undergraduate") },
              { label: bt("modules") },
            ]}
          />
        }
      />

      <ContentContainer className="pb-24">
        {/* Image placeholder */}
        <ImagePlaceholder className="mb-12" aspectRatio="wide">
          <Image
            src={"/assets/images/scenes/comp-sci-lecture3.jpg"}
            className="object-cover"
            fill
            alt={t("imageAlt")}
          />
        </ImagePlaceholder>

        {/* Module groups */}
        <div className="space-y-14">
          {yearGroupedModules.map((group) => (
            <section key={group.label}>
              <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-white/10" />
                <span className="shrink-0">{group.label}</span>
                <span className="h-px flex-1 bg-white/10" />
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {group.modules.map((m) => (
                  <ModuleCard
                    key={m.code}
                    module={m}
                    semesterLabel={semesterLabel(m.semester, t)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Core curriculum note */}
        <GlassPanel
          variant="dark"
          rounded="xl"
          blur="lg"
          className="mt-14 p-6 border-white/10"
        >
          <p className="text-sm text-pretty text-center text-white/80 leading-relaxed">
            {t("curriculum")}
          </p>
        </GlassPanel>
      </ContentContainer>
    </>
  );
}
