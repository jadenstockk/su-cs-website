"use client";

import { ContentContainer } from "@/components/content-container";
import { GlassCard } from "@/components/glass-card";
import { GlassPanel } from "@/components/glass-panel";
import { Logo } from "@/components/logo";
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

/* ─── Features Grid ─── */

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
    <section id="about" className={cn("py-24 sm:py-32", className)}>
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

/* ─── Stats Bar ─── */

const statKeys = [
  { value: "yearsValue", label: "yearsLabel" },
  { value: "alumniValue", label: "alumniLabel" },
  { value: "facultyValue", label: "facultyLabel" },
  { value: "researchValue", label: "researchLabel" },
] as const;

export function StatsSection({ className }: { className?: string }) {
  const t = useTranslations("Stats");

  return (
    <section className={cn("py-16", className)}>
      <ContentContainer>
        <GlassPanel
          variant="dark"
          rounded="xl"
          blur="xl"
          className="px-6 py-10 sm:px-12"
        >
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {statKeys.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1 text-center"
              >
                <span className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  {t(s.value)}
                </span>
                <span className="text-sm font-medium text-white/50">
                  {t(s.label)}
                </span>
              </div>
            ))}
          </div>
        </GlassPanel>
      </ContentContainer>
    </section>
  );
}

/* ─── Programmes Preview ─── */

const programmeKeys = [
  { title: "bscTitle", description: "bscDescription" },
  { title: "honsTitle", description: "honsDescription" },
  { title: "mscTitle", description: "mscDescription" },
] as const;

export function ProgrammesSection({ className }: { className?: string }) {
  const t = useTranslations("Programmes");

  return (
    <section id="programmes" className={cn("py-24 sm:py-32", className)}>
      <ContentContainer>
        <SectionHeading
          title={t("title")}
          subtitle={t("subtitle")}
          className="mb-14"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programmeKeys.map((p) => (
            <GlassCard
              key={p.title}
              title={t(p.title)}
              description={t(p.description)}
            >
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {t("learnMore")} &rarr;
              </a>
            </GlassCard>
          ))}
        </div>
      </ContentContainer>
    </section>
  );
}

/* ─── CTA / Contact Section ─── */

export function ContactSection({ className }: { className?: string }) {
  const t = useTranslations("Contact");

  return (
    <section id="contact" className={cn("py-24 sm:py-32", className)}>
      <ContentContainer size="md">
        <GlassPanel
          variant="dark"
          rounded="xl"
          blur="xl"
          className="px-8 py-14 text-center sm:px-16"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-base leading-relaxed text-white/60 sm:text-lg">
            {t("description")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:csinfo@sun.ac.za"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-white/90 hover:shadow-lg hover:shadow-white/10"
            >
              {t("emailUs")}
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15"
            >
              {t("visitCampus")}
            </a>
          </div>
        </GlassPanel>
      </ContentContainer>
    </section>
  );
}

/* ─── Footer ─── */

export function Footer({ className }: { className?: string }) {
  const t = useTranslations("Footer");

  return (
    <footer className={cn("border-t border-white/10 py-10", className)}>
      <ContentContainer>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-4">
            <Logo width={90} height={32} />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white/80">
                {t("computerScience")}
              </span>
              <span className="text-xs text-white/40">
                {t("stellenboschUniversity")}
              </span>
            </div>
          </div>
          <p className="text-xs text-white/30">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </ContentContainer>
    </footer>
  );
}
