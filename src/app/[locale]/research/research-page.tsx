"use client";

import { ContentContainer } from "@/components/content-container";
import { Footer } from "@/components/footer";
import { GlassPanel } from "@/components/glass-panel";
import { BreadcrumbNav } from "@/components/programmes/breadcrumb-nav";
import { PageHero } from "@/components/programmes/page-hero";
import {
  ArrowUpRight,
  Brain,
  CircuitBoard,
  Network,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";

interface ResearchGroup {
  id: string;
  icon: React.ReactNode;
  titleKey: string;
  descriptionKeys: string[];
  membersKey: string;
  links: { labelKey: string; href: string }[];
}

export function ResearchPage() {
  const t = useTranslations("Research");
  const bt = useTranslations("Breadcrumb");

  const groups: ResearchGroup[] = [
    {
      id: "automata",
      icon: <CircuitBoard className="h-6 w-6" />,
      titleKey: "automataTitle",
      descriptionKeys: ["automataDesc1", "automataDesc2"],
      membersKey: "automataMembers",
      links: [
        {
          labelKey: "automataLink1",
          href: "https://www.cs.sun.ac.za/research/theory-of-computation/",
        },
        {
          labelKey: "automataLink2",
          href: "https://www.cs.sun.ac.za/research/regex/",
        },
      ],
    },
    {
      id: "sev",
      icon: <ShieldCheck className="h-6 w-6" />,
      titleKey: "sevTitle",
      descriptionKeys: ["sevDesc"],
      membersKey: "sevMembers",
      links: [
        { labelKey: "sevLink1", href: "https://coastal.cs.sun.ac.za/" },
        { labelKey: "sevLink2", href: "https://esbmc.org/" },
        { labelKey: "sevLink3", href: "https://github.com/omcri/cseq" },
      ],
    },
    {
      id: "mlai",
      icon: <Brain className="h-6 w-6" />,
      titleKey: "mlaiTitle",
      descriptionKeys: ["mlaiDesc"],
      membersKey: "mlaiMembers",
      links: [],
    },
    {
      id: "telkom",
      icon: <Network className="h-6 w-6" />,
      titleKey: "telkomTitle",
      descriptionKeys: ["telkomDesc"],
      membersKey: "telkomMembers",
      links: [],
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
        <p className="text-base leading-relaxed text-white/60 max-w-3xl mb-16">
          {t("intro")}
        </p>

        {/* Research groups */}
        <div className="flex flex-col gap-12">
          {groups.map((group) => {
            const members: string[] = t.raw(group.membersKey);

            return (
              <GlassPanel
                key={group.id}
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

                {/* Links */}
                {group.links.length > 0 && (
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                    {group.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                      >
                        {t(link.labelKey)}
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    ))}
                  </div>
                )}
              </GlassPanel>
            );
          })}
        </div>
      </ContentContainer>

      <Footer />
    </>
  );
}
