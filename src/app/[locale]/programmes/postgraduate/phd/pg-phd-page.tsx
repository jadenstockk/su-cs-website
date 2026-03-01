import { ContentContainer } from "@/components/content-container";
import { GlassPanel } from "@/components/glass-panel";
import { BreadcrumbNav } from "@/components/programmes/breadcrumb-nav";
import { ImagePlaceholder } from "@/components/programmes/image-placeholder";
import { InfoCard } from "@/components/programmes/info-card";
import { PageHero } from "@/components/programmes/page-hero";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Beaker, FileText, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function PgPhdPage() {
  const t = await getTranslations("PgPhd");
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
              { label: bt("phd") },
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
              src={"/assets/images/scenes/students.jpg"}
              className="object-cover"
              fill
              alt={t("imageAlt")}
            />
          </ImagePlaceholder>
        </div>

        {/* Cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          <InfoCard
            title={t("requirementsTitle")}
            icon={<FileText className="h-5 w-5" />}
          >
            <p>{t("requirementsText")}</p>
          </InfoCard>
          <InfoCard
            title={t("researchTitle")}
            icon={<Beaker className="h-5 w-5" />}
          >
            <p>{t("researchText")}</p>
          </InfoCard>
          <InfoCard
            title={t("supervisorTitle")}
            icon={<Users className="h-5 w-5" />}
          >
            <p>{t("supervisorText")}</p>
          </InfoCard>
        </div>

        {/* Image break */}
        <ImagePlaceholder className="mb-16" aspectRatio="wide">
          <Image
            src={"/assets/images/scenes/students.jpg"}
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
            Explore More
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              {
                label: "How to Apply",
                href: "/programmes/postgraduate/prospective",
              },
              {
                label: "Masters Programme",
                href: "/programmes/postgraduate/masters",
              },
              {
                label: "View Modules",
                href: "/programmes/postgraduate/modules",
              },
              {
                label: "Honours Programme",
                href: "/programmes/postgraduate/honours",
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
