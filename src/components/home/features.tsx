"use client";

import { ContentContainer } from "@/components/content-container";
import { GlassCard } from "@/components/glass-card";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Code,
  FlaskConical,
  Globe,
  GraduationCap,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";

const featureIcons = [
  <BookOpen key="bookopen" className="h-7 w-7" />,
  <FlaskConical key="flask" className="h-7 w-7" />,
  <Users key="users" className="h-7 w-7" />,
  <Globe key="globe" className="h-7 w-7" />,
  <GraduationCap key="grad" className="h-7 w-7" />,
  <Code key="code" className="h-7 w-7" />,
];

const featureKeys = [
  { title: "worldClassTitle", description: "worldClassDescription" },
  { title: "researchTitle", description: "researchDescription" },
  { title: "communityTitle", description: "communityDescription" },
  { title: "globalTitle", description: "globalDescription" },
  { title: "facultyTitle", description: "facultyDescription" },
  { title: "handsOnTitle", description: "handsOnDescription" },
] as const;

export function FeaturesSection({ className }: { className?: string }) {
  const t = useTranslations("Features");

  return (
    <section
      className={cn(
        "relative z-10 py-16 -mt-5 bg-background rounded-t-4xl",
        className,
      )}
    >
      <ContentContainer>
        <SectionHeading
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
          className="mb-14 items-center"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featureKeys.map((f, i) => (
            <GlassCard
              key={f.title}
              icon={featureIcons[i]}
              title={t(f.title)}
              description={t(f.description)}
            >
              <span />
            </GlassCard>
          ))}
        </div>
      </ContentContainer>
    </section>
  );
}
