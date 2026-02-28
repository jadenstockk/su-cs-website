"use client";

import { ContentContainer } from "@/components/content-container";
import { Footer } from "@/components/footer";
import { GlassPanel } from "@/components/glass-panel";
import { BreadcrumbNav } from "@/components/programmes/breadcrumb-nav";
import { ImagePlaceholder } from "@/components/programmes/image-placeholder";
import { PageHero } from "@/components/programmes/page-hero";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Briefcase, FileText, Search } from "lucide-react";
import { useTranslations } from "next-intl";

export function PgMastersPage() {
  const t = useTranslations("PgMasters");
  const bt = useTranslations("Breadcrumb");

  const steps: string[] = t.raw("howToStartSteps");

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
              { label: bt("masters") },
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
          <ImagePlaceholder alt={t("imageAlt")} aspectRatio="video" />
        </div>

        {/* Structure */}
        <section className="mb-16">
          <GlassPanel variant="default" rounded="xl" blur="lg" className="p-6">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-white/50 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {t("structureTitle")}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed">
                  {t("structureText")}
                </p>
              </div>
            </div>
          </GlassPanel>
        </section>

        {/* Getting started steps */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            <span className="inline-flex items-center gap-2">
              <Search className="h-5 w-5 text-white/50" />
              {t("howToStartTitle")}
            </span>
          </h2>
          <div className="space-y-3">
            {steps.map((step, i) => (
              <GlassPanel
                key={step}
                variant="default"
                rounded="xl"
                blur="lg"
                className="flex items-start gap-4 p-4"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white/70 shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-white/70 pt-0.5">{step}</span>
              </GlassPanel>
            ))}
          </div>
        </section>

        {/* Image break */}
        <ImagePlaceholder
          alt={t("imageAlt")}
          className="mb-16"
          aspectRatio="wide"
        />

        {/* Career */}
        <section className="mb-16">
          <GlassPanel
            variant="dark"
            rounded="xl"
            blur="lg"
            className="p-6 border-white/10"
          >
            <div className="flex items-start gap-3">
              <Briefcase className="h-5 w-5 text-white/50 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {t("careerTitle")}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {t("careerText")}
                </p>
              </div>
            </div>
          </GlassPanel>
        </section>

        {/* Quick links */}
        <div className="flex flex-wrap gap-3">
          {[
            {
              label: "How to Apply",
              href: "/programmes/postgraduate/prospective",
            },
            { label: "PhD Programme", href: "/programmes/postgraduate/phd" },
            {
              label: "View Modules",
              href: "/programmes/postgraduate/modules",
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
      </ContentContainer>

      <Footer />
    </>
  );
}
