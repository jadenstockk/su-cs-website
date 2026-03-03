import { ContentContainer } from "@/components/content-container";
import { GlassPanel } from "@/components/glass-panel";
import { BreadcrumbNav } from "@/components/programmes/breadcrumb-nav";
import { ImagePlaceholder } from "@/components/programmes/image-placeholder";
import { PageHero } from "@/components/programmes/page-hero";
import { Link } from "@/i18n/navigation";
import { ArrowRight, CheckCircle2, GraduationCap, MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function UgProspectivePage() {
  const t = await getTranslations("UgProspective");
  const bt = await getTranslations("Breadcrumb");

  const reasons: string[] = t.raw("whyCSReasons");

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
              { label: bt("prospective") },
            ]}
          />
        }
      />

      <ContentContainer className="pb-24">
        {/* What is CS */}
        <div className="grid gap-8 lg:grid-cols-2 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {t("whatIsCSTitle")}
            </h2>
            <p className="text-sm leading-relaxed text-white/60">
              {t("whatIsCSText")}
            </p>
          </div>
          <ImagePlaceholder aspectRatio="video">
            <Image
              src={"/assets/images/scenes/danie-craven2.webp"}
              className="object-cover"
              fill
              alt={t("imageAlt")}
            />
          </ImagePlaceholder>
        </div>

        {/* Why CS */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            <span className="inline-flex items-center gap-2">
              {t("whyCSTitle")}
            </span>
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason) => (
              <GlassPanel
                key={reason}
                variant="default"
                rounded="xl"
                blur="lg"
                className="flex items-start gap-3 p-4"
              >
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-white/80">{reason}</span>
              </GlassPanel>
            ))}
          </div>
        </section>

        {/* Why Stellenbosch — two cards */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">
            {t("whyStellenboschTitle")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <GlassPanel
              variant="default"
              rounded="xl"
              blur="lg"
              className="p-6"
            >
              <GraduationCap className="h-5 w-5 text-white/50 mb-3" />
              <h3 className="text-base font-semibold text-white mb-2">
                Academic Excellence
              </h3>
              <p className="text-sm text-white/55 leading-relaxed">
                {t("whyStellenboschAcademic")}
              </p>
            </GlassPanel>
            <GlassPanel
              variant="default"
              rounded="xl"
              blur="lg"
              className="p-6"
            >
              <MapPin className="h-5 w-5 text-white/50 mb-3" />
              <h3 className="text-base font-semibold text-white mb-2">
                Vibrant Community
              </h3>
              <p className="text-sm text-white/55 leading-relaxed">
                {t("whyStellenboschCommunity")}
              </p>
            </GlassPanel>
          </div>
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

        {/* Admissions */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            {t("admissionsTitle")}
          </h2>
          <p className="text-sm leading-relaxed text-white/60 mb-6">
            {t("admissionsText")}
          </p>
          <a
            href={"https://www.su.ac.za/apply/undergrad"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
          >
            {t("applyNow")} <ArrowRight className="h-4 w-4" />
          </a>
        </section>

        {/* After graduation */}
        <section className="mb-16">
          <GlassPanel
            variant="dark"
            rounded="xl"
            blur="lg"
            className="p-6 border-white/10"
          >
            <h3 className="text-base font-semibold text-white mb-2">
              {t("afterGradTitle")}
            </h3>
            <p className="text-sm text-white/50 leading-relaxed mb-3">
              {t("afterGradText")}
            </p>
            <Link
              href="/programmes/undergraduate/guide"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              View Programme Guide <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </GlassPanel>
        </section>
      </ContentContainer>
    </>
  );
}
