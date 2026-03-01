import { Brain, CircuitBoard, Network, ShieldCheck, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ContentContainer } from "@/components/content-container";
import { FadeIn } from "@/components/fade-in";
import { GlassPanel } from "@/components/glass-panel";
import { BreadcrumbNav } from "@/components/programmes/breadcrumb-nav";
import { PageHero } from "@/components/programmes/page-hero";

interface ResearchGroup {
  id: string;
  icon: React.ReactNode;
  titleKey: string;
  descriptionKeys: string[];
  membersKey: string;
}

export async function ResearchPage() {
  const t = await getTranslations("Research");
  const bt = await getTranslations("Breadcrumb");

  const groups: ResearchGroup[] = [
    {
      id: "automata",
      icon: <CircuitBoard className="h-6 w-6" />,
      titleKey: "automataTitle",
      descriptionKeys: ["automataDesc1", "automataDesc2"],
      membersKey: "automataMembers",
    },
    {
      id: "sev",
      icon: <ShieldCheck className="h-6 w-6" />,
      titleKey: "sevTitle",
      descriptionKeys: ["sevDesc"],
      membersKey: "sevMembers",
    },
    {
      id: "mlai",
      icon: <Brain className="h-6 w-6" />,
      titleKey: "mlaiTitle",
      descriptionKeys: ["mlaiDesc"],
      membersKey: "mlaiMembers",
    },
    {
      id: "telkom",
      icon: <Network className="h-6 w-6" />,
      titleKey: "telkomTitle",
      descriptionKeys: ["telkomDesc"],
      membersKey: "telkomMembers",
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
              { label: bt("research") },
            ]}
          />
        }
      />

      <ContentContainer className="pb-24">
        {/* Intro */}
        <FadeIn>
          <p className="text-base leading-relaxed text-white/60 max-w-3xl mb-16">
            {t("intro")}
          </p>
        </FadeIn>

        {/* Research groups */}
        <div className="flex flex-col gap-12">
          {groups.map((group, i) => {
            const members: string[] = t.raw(group.membersKey);

            return (
              <FadeIn key={group.id} delay={i * 0.08}>
                <GlassPanel
                  variant="default"
                  rounded="xl"
                  blur="lg"
                  className="p-6 sm:p-8"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="shrink-0 rounded-lg bg-white/5 border border-white/10 p-3 text-white/50">
                      {group.icon}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white pt-1">
                      {t(group.titleKey)}
                    </h2>
                  </div>

                  {/* Description paragraphs */}
                  <div className="space-y-4 mb-8">
                    {group.descriptionKeys.map((key) => (
                      <p
                        key={key}
                        className="text-sm leading-relaxed text-white/60"
                      >
                        {t(key)}
                      </p>
                    ))}
                  </div>

                  {/* Members */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="h-4 w-4 text-white/40" />
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">
                        {t("currentMembers")}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {members.map((member) => (
                        <span
                          key={member}
                          className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70"
                        >
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassPanel>
              </FadeIn>
            );
          })}
        </div>
      </ContentContainer>
    </>
  );
}
