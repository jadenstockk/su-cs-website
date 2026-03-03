import { ContentContainer } from "@/components/content-container";
import { GlassPanel } from "@/components/glass-panel";
import { BreadcrumbNav } from "@/components/programmes/breadcrumb-nav";
import { ImagePlaceholder } from "@/components/programmes/image-placeholder";
import { InfoCard } from "@/components/programmes/info-card";
import { PageHero } from "@/components/programmes/page-hero";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  FlaskConical,
  GraduationCap,
  Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const programmes = [
  {
    titleKey: "honoursTitle",
    descKey: "honoursDesc",
    durationKey: "honoursDuration",
    icon: Award,
    href: "/programmes/postgraduate/honours",
  },
  {
    titleKey: "mastersTitle",
    descKey: "mastersDesc",
    durationKey: "mastersDuration",
    icon: FlaskConical,
    href: "/programmes/postgraduate/masters",
  },
  {
    titleKey: "phdTitle",
    descKey: "phdDesc",
    durationKey: "phdDuration",
    icon: GraduationCap,
    href: "/programmes/postgraduate/phd",
  },
] as const;

const pathways = [
  { titleKey: "pathwayResearch", descKey: "pathwayResearchDesc" },
  { titleKey: "pathwayIndustry", descKey: "pathwayIndustryDesc" },
  { titleKey: "pathwayAcademia", descKey: "pathwayAcademiaDesc" },
] as const;

const strengths = [
  { titleKey: "strengthExpert", descKey: "strengthExpertDesc", icon: Users },
  {
    titleKey: "strengthResearch",
    descKey: "strengthResearchDesc",
    icon: FlaskConical,
  },
  { titleKey: "strengthAI", descKey: "strengthAIDesc", icon: Brain },
] as const;

export async function PgGuidePage() {
  const t = await getTranslations("PgGuide");
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
              {t("overviewText2")}
            </p>
          </div>
          <ImagePlaceholder aspectRatio="video">
            <Image
              src={"/assets/images/scenes/comp-sci-lecture.webp"}
              className="object-cover"
              fill
              alt={t("imageAlt")}
            />
          </ImagePlaceholder>
        </div>

        {/* Programme options */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">
            {t("programmesTitle")}
          </h2>
          <p className="text-sm text-white/50 mb-6">
            {t("programmesSubtitle")}
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {programmes.map((prog) => {
              const Icon = prog.icon;
              return (
                <Link key={prog.titleKey} href={prog.href} className="group">
                  <GlassPanel
                    variant="default"
                    rounded="xl"
                    blur="lg"
                    className="p-6 h-full transition-colors group-hover:bg-white/6"
                  >
                    <Icon className="h-6 w-6 text-white/40 mb-3" />
                    <h3 className="text-base font-semibold text-white mb-1">
                      {t(prog.titleKey)}
                    </h3>
                    <span className="text-xs text-white/40 mb-2 block">
                      {t(prog.durationKey)}
                    </span>
                    <p className="text-sm text-white/55 leading-relaxed mb-3">
                      {t(prog.descKey)}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                      Learn more{" "}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </GlassPanel>
                </Link>
              );
            })}
          </div>
        </section>

        {/* How postgrad works — steps */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            {t("howItWorksTitle")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {(
              [
                { titleKey: "step1Title", descKey: "step1Desc" },
                { titleKey: "step2Title", descKey: "step2Desc" },
                { titleKey: "step3Title", descKey: "step3Desc" },
              ] as const
            ).map((step, i) => (
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

        {/* Department strengths */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-2">
            {t("whyUsTitle")}
          </h2>
          <p className="text-sm text-white/50 mb-6">{t("whyUsSubtitle")}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {strengths.map((s) => {
              const Icon = s.icon;
              return (
                <InfoCard
                  key={s.titleKey}
                  title={t(s.titleKey)}
                  icon={<Icon className="h-5 w-5" />}
                >
                  <p>{t(s.descKey)}</p>
                </InfoCard>
              );
            })}
          </div>
        </section>

        {/* Career pathways */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            {t("pathwaysTitle")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {pathways.map((pw) => (
              <GlassPanel
                key={pw.titleKey}
                variant="default"
                rounded="xl"
                blur="lg"
                className="p-5"
              >
                <h3 className="text-sm font-semibold text-white mb-2">
                  {t(pw.titleKey)}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  {t(pw.descKey)}
                </p>
              </GlassPanel>
            ))}
          </div>
        </section>

        {/* Structured MSc callout */}
        <section className="mb-16">
          <GlassPanel
            variant="dark"
            rounded="xl"
            blur="lg"
            className="p-6 border-white/10"
          >
            <div className="flex items-start gap-3">
              <Brain className="h-5 w-5 text-white/50 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {t("mlaiTitle")}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed mb-3">
                  {t("mlaiText")}
                </p>
                <a
                  href="https://mlai.sun.ac.za"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  Visit mlai.sun.ac.za <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </GlassPanel>
        </section>

        {/* Module catalogue + prospective link */}
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
                  {t("modulesTitle")}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed mb-3">
                  {t("modulesText")}
                </p>
                <Link
                  href="/programmes/postgraduate/modules"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  View all modules <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </GlassPanel>
        </section>

        {/* Quick links */}
        <GlassPanel
          variant="dark"
          rounded="xl"
          blur="lg"
          className="p-6 border-white/10"
        >
          <h3 className="text-base font-semibold text-white mb-3">
            {t("exploreTitle")}
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              {
                label: "Prospective Students",
                href: "/programmes/postgraduate/prospective",
              },
              {
                label: "Honours",
                href: "/programmes/postgraduate/honours",
              },
              { label: "Masters", href: "/programmes/postgraduate/masters" },
              { label: "PhD", href: "/programmes/postgraduate/phd" },
              { label: "Modules", href: "/programmes/postgraduate/modules" },
              { label: "Research Groups", href: "/research" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label} <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </GlassPanel>
      </ContentContainer>
    </>
  );
}
