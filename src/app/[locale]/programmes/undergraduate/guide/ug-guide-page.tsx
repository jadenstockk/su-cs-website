import { ContentContainer } from "@/components/content-container";
import { GlassPanel } from "@/components/glass-panel";
import { BreadcrumbNav } from "@/components/programmes/breadcrumb-nav";
import { ImagePlaceholder } from "@/components/programmes/image-placeholder";
import { InfoCard } from "@/components/programmes/info-card";
import { PageHero } from "@/components/programmes/page-hero";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  BookOpen,
  Cpu,
  Database,
  Dna,
  Globe,
  Monitor,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const focalAreas = [
  { titleKey: "generalCS", descKey: "generalCSDesc", icon: Monitor },
  { titleKey: "computerSystems", descKey: "computerSystemsDesc", icon: Cpu },
  { titleKey: "dataScience", descKey: "dataScienceDesc", icon: Database },
  { titleKey: "genetics", descKey: "geneticsDesc", icon: Dna },
  { titleKey: "geoInfo", descKey: "geoInfoDesc", icon: Globe },
] as const;

const steps = [
  { titleKey: "chooseDegree", descKey: "chooseDegreeDesc" },
  { titleKey: "chooseProgramme", descKey: "chooseProgrammeDesc" },
  { titleKey: "chooseFocalArea", descKey: "chooseFocalAreaDesc" },
] as const;

export async function UgGuidePage() {
  const t = await getTranslations("UgGuide");
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
              { label: bt("guide") },
            ]}
          />
        }
      />

      <ContentContainer className="pb-24">
        {/* Overview section with image */}
        <div className="grid gap-8 lg:grid-cols-2 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {t("overviewTitle")}
            </h2>
            <p className="text-sm leading-relaxed text-white/60 mb-4">
              {t("overviewText")}
            </p>
            <p className="text-sm leading-relaxed text-white/60">
              With the appropriate electives it can also lead to an honours
              programme in Computer Science or to an honours programme in
              another subject.
            </p>
          </div>
          <ImagePlaceholder aspectRatio="video">
            <Image
              src={"/assets/images/scenes/math-lecture2.webp"}
              className="object-cover"
              fill
              alt={t("imageAlt")}
            />
          </ImagePlaceholder>
        </div>

        {/* Degree structure */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            {t("degreeStructureTitle")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {steps.map((step, i) => (
              <GlassPanel
                key={step.titleKey}
                variant="default"
                rounded="xl"
                blur="lg"
                className="p-5 flex flex-col items-center text-center"
              >
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg font-bold text-white/80">
                  {i + 1}
                </span>
                <h3 className="text-sm font-semibold text-white mb-1">
                  {t(step.titleKey)}
                </h3>
                <p className="text-xs text-white/50">{t(step.descKey)}</p>
              </GlassPanel>
            ))}
          </div>
        </section>

        {/* Focal areas */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">
            {t("focalAreasTitle")}
          </h2>
          <p className="text-sm text-white/50 mb-6">
            {t("focalAreasSubtitle")}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {focalAreas.map((fa) => {
              const Icon = fa.icon;
              return (
                <InfoCard
                  key={fa.titleKey}
                  title={t(fa.titleKey)}
                  icon={<Icon className="h-5 w-5" />}
                >
                  <p>{t(fa.descKey)}</p>
                </InfoCard>
              );
            })}
          </div>
        </section>

        {/* Core curriculum */}
        <section className="mb-16">
          <GlassPanel
            variant="dark"
            rounded="xl"
            blur="lg"
            className="p-6 border-white/10"
          >
            <div className="flex items-start gap-3">
              <BookOpen className="h-5 w-5 text-white/50 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {t("curriculumTitle")}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed mb-3">
                  {t("curriculumText")}
                </p>
                <Link
                  href="/programmes/undergraduate/modules"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  View all modules <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </GlassPanel>
        </section>
      </ContentContainer>
    </>
  );
}
