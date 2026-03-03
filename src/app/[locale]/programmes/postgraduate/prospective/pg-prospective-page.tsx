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
  CheckCircle2,
  ClipboardList,
  DollarSign,
  Globe,
  GraduationCap,
  Mail,
  Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function PgProspectivePage() {
  const t = await getTranslations("PgProspective");
  const bt = await getTranslations("Breadcrumb");

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
        {/* Intro section with image */}
        <div className="grid gap-8 lg:grid-cols-2 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {t("introTitle")}
            </h2>
            <p className="text-sm leading-relaxed text-white/60">
              {t("introText")}
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

        {/* Entry requirements */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-3">
            {t("entryReqTitle")}
          </h2>
          <p className="text-sm text-white/50 mb-6">{t("entryReqIntro")}</p>

          {/* Honours requirements in a panel */}
          <GlassPanel
            variant="default"
            rounded="xl"
            blur="lg"
            className="p-6 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-5 w-5 text-white/50" />
              <h3 className="text-lg font-semibold text-white">
                {t("honoursReqTitle")}
              </h3>
            </div>
            <div className="space-y-2.5">
              {honoursReqs.map((req) => (
                <div key={req} className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-white/65">{req}</span>
                </div>
              ))}
            </div>
          </GlassPanel>

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

        {/* Module prerequisites */}
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
                  {t("prereqTitle")}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed mb-3">
                  {t("prereqText")}
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

        {/* Image break */}
        <ImagePlaceholder className="mb-16" aspectRatio="wide">
          <Image
            src={"/assets/images/scenes/dream-walk.webp"}
            className="object-cover object-bottom"
            fill
            alt={t("imageAlt")}
          />
        </ImagePlaceholder>

        {/* How to apply */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            <span className="inline-flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-white/50" />
              {t("howToApplyTitle")}
            </span>
          </h2>
          <div className="space-y-3">
            {applySteps.map((step, i) => (
              <GlassPanel
                key={step}
                variant="default"
                rounded="xl"
                blur="lg"
                className="flex items-start gap-4 p-4"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white/70 shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-white/70 pt-1">{step}</span>
              </GlassPanel>
            ))}
          </div>
          <div className="mt-6">
            <a
              href="https://www.su.ac.za/en/apply/pg-studies"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
            >
              {t("applyNow")} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Part-time, International, Funding — 3 cards */}
        <div className="grid gap-4 sm:grid-cols-3 mb-16">
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
          <InfoCard title={t("demiTitle")} icon={<Users className="h-5 w-5" />}>
            <p>{t("demiText")}</p>
          </InfoCard>
        </div>

        {/* Contact / Questions */}
        <section className="mb-16">
          <GlassPanel variant="default" rounded="xl" blur="lg" className="p-6">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-white/50 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {t("questionsTitle")}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed mb-3">
                  {t("questionsText")}
                </p>
                <a
                  href={`mailto:${t("questionsEmail")}`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  {t("questionsEmail")} <ArrowRight className="h-3.5 w-3.5" />
                </a>
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
                label: "Programme Guide",
                href: "/programmes/postgraduate/guide",
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
