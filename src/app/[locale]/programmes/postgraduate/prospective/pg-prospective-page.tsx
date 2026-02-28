"use client";

import { ContentContainer } from "@/components/content-container";
import { Footer } from "@/components/footer";
import { GlassPanel } from "@/components/glass-panel";
import { BreadcrumbNav } from "@/components/programmes/breadcrumb-nav";
import { ImagePlaceholder } from "@/components/programmes/image-placeholder";
import { InfoCard } from "@/components/programmes/info-card";
import { PageHero } from "@/components/programmes/page-hero";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  DollarSign,
  Globe,
} from "lucide-react";
import { useTranslations } from "next-intl";

export function PgProspectivePage() {
  const t = useTranslations("PgProspective");
  const bt = useTranslations("Breadcrumb");

  const honoursReqs: string[] = t.raw("honoursReqs");
  const applySteps: string[] = t.raw("howToApplySteps");

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
              { label: bt("prospective") },
            ]}
          />
        }
      />

      <ContentContainer className="pb-24">
        {/* Entry requirements */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            {t("entryReqTitle")}
          </h2>

          {/* Honours */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">
              {t("honoursReqTitle")}
            </h3>
            <div className="space-y-2">
              {honoursReqs.map((req) => (
                <div key={req} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-white/60">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Masters & PhD in cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard title={t("mastersReqTitle")}>
              <p>{t("mastersReqs")}</p>
            </InfoCard>
            <InfoCard title={t("phdReqTitle")}>
              <p>{t("phdReqs")}</p>
            </InfoCard>
          </div>
        </section>

        {/* Image break */}
        <ImagePlaceholder
          alt={t("imageAlt")}
          className="mb-16"
          aspectRatio="wide"
        />

        {/* How to apply */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            <span className="inline-flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-white/50" />
              {t("howToApplyTitle")}
            </span>
          </h2>
          <div className="space-y-4">
            {applySteps.map((step, i) => (
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
          <div className="mt-6">
            <a
              href="https://www.sun.ac.za/english/Pages/default.aspx"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              {t("applyNow")} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Part-time & International + Funding */}
        <div className="grid gap-4 sm:grid-cols-2 mb-16">
          <InfoCard
            title={t("partTimeTitle")}
            icon={<Globe className="h-5 w-5" />}
          >
            <p>{t("partTimeText")}</p>
          </InfoCard>
          <InfoCard
            title={t("fundingTitle")}
            icon={<DollarSign className="h-5 w-5" />}
          >
            <p>{t("fundingText")}</p>
          </InfoCard>
        </div>

        {/* Quick links */}
        <GlassPanel
          variant="dark"
          rounded="xl"
          blur="lg"
          className="p-6 border-white/10"
        >
          <h3 className="text-base font-semibold text-white mb-3">
            Explore Postgraduate Programmes
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Honours", href: "/programmes/postgraduate/honours" },
              { label: "Masters", href: "/programmes/postgraduate/masters" },
              { label: "PhD", href: "/programmes/postgraduate/phd" },
              { label: "Modules", href: "/programmes/postgraduate/modules" },
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

      <Footer />
    </>
  );
}
