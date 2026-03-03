import { ContentContainer } from "@/components/content-container";
import { GlassPanel } from "@/components/glass-panel";
import { BreadcrumbNav } from "@/components/programmes/breadcrumb-nav";
import { ImagePlaceholder } from "@/components/programmes/image-placeholder";
import { PageHero } from "@/components/programmes/page-hero";
import { Link } from "@/i18n/navigation";
import { ArrowRight, BookOpen, CheckCircle2, Code } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function PgHonoursPage() {
  const t = await getTranslations("PgHonours");
  const bt = await getTranslations("Breadcrumb");

  const highlights: string[] = t.raw("highlights");

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
              { label: bt("honours") },
            ]}
          />
        }
      />

      <ContentContainer className="pb-24">
        {/* Overview with image */}
        <div className="grid gap-8 lg:grid-cols-2 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {t("overviewTitle")}
            </h2>
            <p className="text-sm leading-relaxed text-white/60">
              {t("overviewText")}
            </p>
          </div>
          <ImagePlaceholder aspectRatio="video">
            <Image
              src={"/assets/images/scenes/comp-sci-lecture2.webp"}
              className="object-cover"
              fill
              alt={t("imageAlt")}
            />
          </ImagePlaceholder>
        </div>

        {/* Curriculum — project + electives */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            {t("curriculumTitle")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <GlassPanel
              variant="default"
              rounded="xl"
              blur="lg"
              className="p-6"
            >
              <Code className="h-5 w-5 text-white/50 mb-3" />
              <h3 className="text-base font-semibold text-white mb-2">
                {t("projectTitle")}
              </h3>
              <p className="text-sm text-white/55 leading-relaxed">
                {t("projectText")}
              </p>
            </GlassPanel>
            <GlassPanel
              variant="default"
              rounded="xl"
              blur="lg"
              className="p-6"
            >
              <BookOpen className="h-5 w-5 text-white/50 mb-3" />
              <h3 className="text-base font-semibold text-white mb-2">
                {t("electivesTitle")}
              </h3>
              <p className="text-sm text-white/55 leading-relaxed mb-2">
                {t("electivesText")}
              </p>
              <p className="text-xs text-white/40">{t("maxExternal")}</p>
            </GlassPanel>
          </div>
        </section>

        {/* Highlights */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            {t("highlightsTitle")}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {highlights.map((h) => (
              <GlassPanel
                key={h}
                variant="default"
                rounded="xl"
                blur="lg"
                className="flex items-start gap-3 p-4"
              >
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-white/80">{h}</span>
              </GlassPanel>
            ))}
          </div>
        </section>

        {/* Image break */}
        <ImagePlaceholder className="mb-16" aspectRatio="wide">
          <Image
            src={"/assets/images/scenes/students-talking.webp"}
            className="object-cover"
            fill
            alt={t("imageAlt")}
          />
        </ImagePlaceholder>

        {/* Quick links */}
        <GlassPanel
          variant="dark"
          rounded="xl"
          blur="lg"
          className="p-6 border-white/10"
        >
          <h3 className="text-base font-semibold text-white mb-3">
            Next Steps
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              {
                label: "View Modules",
                href: "/programmes/postgraduate/modules",
              },
              {
                label: "How to Apply",
                href: "/programmes/postgraduate/prospective",
              },
              {
                label: "Masters Programme",
                href: "/programmes/postgraduate/masters",
              },
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
