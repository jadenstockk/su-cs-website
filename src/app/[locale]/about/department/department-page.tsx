import { ContentContainer } from "@/components/content-container";
import { FadeIn } from "@/components/fade-in";
import { GlassPanel } from "@/components/glass-panel";
import { ProgrammesWizardTrigger } from "@/components/programmes-wizard-trigger";
import { BreadcrumbNav } from "@/components/programmes/breadcrumb-nav";
import { PageHero } from "@/components/programmes/page-hero";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  BookOpen,
  FlaskConical,
  GraduationCap,
  MapPin,
  Target,
  Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function DepartmentPage() {
  const t = await getTranslations("DepartmentPage");
  const bt = await getTranslations("Breadcrumb");

  const sections = [
    {
      icon: BookOpen,
      title: t("historyTitle"),
      content: [t("historyText1"), t("historyText2")],
    },
    {
      icon: Target,
      title: t("missionTitle"),
      content: [t("missionText")],
    },
    {
      icon: GraduationCap,
      title: t("researchTitle"),
      content: [t("researchText")],
    },
    {
      icon: MapPin,
      title: t("locationTitle"),
      content: [t("locationText")],
    },
  ];

  const exploreLinks = [
    {
      icon: Users,
      title: t("exploreMeetStaff"),
      description: t("exploreMeetStaffDesc"),
      href: "/about/staff" as const,
    },
    {
      icon: GraduationCap,
      title: t("exploreProgrammes"),
      description: t("exploreProgrammesDesc"),
      href: "/programmes" as const,
    },
    {
      icon: FlaskConical,
      title: t("exploreResearch"),
      description: t("exploreResearchDesc"),
      href: "/research" as const,
    },
  ];

  return (
    <>
      <PageHero
        title={t("title")}
        subtitle={t("subtitle")}
        breadcrumb={
          <BreadcrumbNav
            items={[
              { label: bt("home"), href: "/" },
              { label: bt("about"), href: "/about/department" },
              { label: bt("department") },
            ]}
          />
        }
      />

      {/* Hero image banner */}
      <ContentContainer className="-mt-4 mb-12">
        <FadeIn>
          <div className="relative w-full overflow-hidden rounded-2xl aspect-21/9">
            <Image
              src="/assets/images/scenes/comp-sci-lecture.webp"
              alt="Computer Science lecture hall at Stellenbosch University"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1280px"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-su-gold">
                {t("imageCaption")}
              </p>
            </div>
          </div>
        </FadeIn>
      </ContentContainer>

      <ContentContainer className="pb-12">
        <div className="grid gap-8 lg:grid-cols-2">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <FadeIn key={section.title} delay={i * 0.08}>
                <GlassPanel
                  variant="default"
                  rounded="xl"
                  blur="lg"
                  className="p-8 transition-all duration-300 hover:bg-white/15 h-full w-full"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                      <Icon className="h-5 w-5 text-white/70" />
                    </div>
                    <h2 className="text-xl font-bold text-white">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {section.content.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="text-sm leading-relaxed text-white/60"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </GlassPanel>
              </FadeIn>
            );
          })}
        </div>
      </ContentContainer>

      {/* Continue exploring section */}
      <ContentContainer className="pb-24">
        <FadeIn delay={0.1}>
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-su-gold">
              {t("exploreLabel")}
            </p>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              {t("exploreTitle")}
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {exploreLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <FadeIn key={link.href} delay={0.15 + i * 0.08}>
                <Link href={link.href} className="group block h-full">
                  <GlassPanel
                    variant="default"
                    rounded="xl"
                    blur="lg"
                    className="flex h-full flex-col justify-between p-6 transition-all duration-300 hover:bg-white/15 hover:border-su-gold/30"
                  >
                    <div>
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-su-gold/15">
                        <Icon className="h-5 w-5 text-su-gold" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-white">
                        {link.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/60">
                        {link.description}
                      </p>
                    </div>
                    <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-su-gold transition-transform group-hover:translate-x-1">
                      {t("exploreReadMore")}
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </GlassPanel>
                </Link>
              </FadeIn>
            );
          })}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-8 flex justify-center">
            <ProgrammesWizardTrigger className="cursor-pointer" />
          </div>
        </FadeIn>
      </ContentContainer>
    </>
  );
}
