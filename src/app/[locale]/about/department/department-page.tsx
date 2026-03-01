import { ContentContainer } from "@/components/content-container";
import { GlassPanel } from "@/components/glass-panel";
import { BreadcrumbNav } from "@/components/programmes/breadcrumb-nav";
import { PageHero } from "@/components/programmes/page-hero";
import { BookOpen, GraduationCap, MapPin, Target } from "lucide-react";
import { getTranslations } from "next-intl/server";

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

      <ContentContainer className="pb-24">
        <div className="grid gap-8 lg:grid-cols-2">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <GlassPanel
                key={section.title}
                variant="default"
                rounded="xl"
                blur="lg"
                className="p-8 transition-all duration-300 hover:bg-white/15"
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
            );
          })}
        </div>
      </ContentContainer>
    </>
  );
}
