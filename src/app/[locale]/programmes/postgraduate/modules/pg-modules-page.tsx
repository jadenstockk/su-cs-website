"use client";

import { ContentContainer } from "@/components/content-container";
import { Footer } from "@/components/footer";
import { GlassPanel } from "@/components/glass-panel";
import { BreadcrumbNav } from "@/components/programmes/breadcrumb-nav";
import { ImagePlaceholder } from "@/components/programmes/image-placeholder";
import { PageHero } from "@/components/programmes/page-hero";
import { useTranslations } from "next-intl";

interface PgModule {
  code: string;
  name: string;
  lecturer?: string;
  description: string;
}

const yearModules: PgModule[] = [
  {
    code: "CS 771",
    name: "Honours Project in Computer Science",
    description:
      "A large software construction or research problem on which the student works independently, under the supervision of a staff member.",
  },
];

const sem1Modules: PgModule[] = [
  {
    code: "CS 712",
    name: "Advanced Algorithms",
    lecturer: "Willem Bester",
    description:
      "Advanced topics in algorithm design and analysis — linear programming, approximation, randomised, probabilistic, and parallel algorithms.",
  },
  {
    code: "CS 716",
    name: "Vulnerability Discovery and Exploitation",
    lecturer: "Fabian Yamaguchi",
    description:
      "Discovering and exploiting software vulnerabilities, static and dynamic program analysis for automating discovery.",
  },
  {
    code: "CS 746",
    name: "Ontology Engineering",
    lecturer: "Maria Keet",
    description:
      "Knowledge representation languages, automated reasoning, and methods for ontology development and maintenance.",
  },
  {
    code: "CS 771",
    name: "Computing and Society",
    lecturer: "William Tucker",
    description:
      "Human-centred computing, social development theories, critical analysis of case studies, methods, ethics, and community engagement.",
  },
  {
    code: "CS 791",
    name: "Artificial Intelligence",
    lecturer: "Andries Engelbrecht",
    description:
      "Meta-heuristics, swarm intelligence, evolutionary computation, hyper-heuristics, and fitness landscape analysis.",
  },
  {
    code: "CS 795",
    name: "Functional Programming",
    lecturer: "Brink van der Merwe",
    description: "Introduction to the functional programming paradigm.",
  },
  {
    code: "CS 742",
    name: "Machine Learning A",
    lecturer: "Steve Kroon",
    description:
      "Prominent ML concepts, feature extraction, dimensionality reduction, probabilistic modelling, and parameter estimation.",
  },
  {
    code: "CS 711",
    name: "Computer Networks",
    lecturer: "William Tucker",
    description:
      "Internet architecture and protocols, resource allocation, congestion control, network security, and applications.",
  },
  {
    code: "CS 714",
    name: "Concurrent Programming I",
    lecturer: "Cornelia Inggs",
    description:
      "Concurrency theory, design, implementation and verification of concurrent systems, distributed and parallel programming.",
  },
];

const sem2Modules: PgModule[] = [
  {
    code: "CS 741",
    name: "Machine Learning",
    lecturer: "Andries Engelbrecht",
    description: "Selected advanced topics in machine learning.",
  },
  {
    code: "CS 745",
    name: "Software Construction — Compilers",
    lecturer: "Bernd Fischer",
    description:
      "Compiler construction and related software engineering topics.",
  },
  {
    code: "CS 771",
    name: "Principles of Data Science",
    lecturer: "Marcel Dunaiski",
    description:
      "Data science pipeline — information retrieval, data wrangling, EDA, hypothesis testing, regression, visualisations, and data ethics.",
  },
  {
    code: "CS 791",
    name: "Space Science Algorithms",
    lecturer: "Trienko Grobler",
    description:
      "Algorithms and techniques in Space Science, with applications.",
  },
  {
    code: "CS 743",
    name: "Cognitive Robotics",
    lecturer: "Gavin Rens",
    description:
      "Logic and knowledge representation, Prolog, deterministic planning, dynamic Bayesian networks, ProbLog, MDPs, and reinforcement learning.",
  },
  {
    code: "CS 796",
    name: "Software Testing and Analysis",
    lecturer: "Cornelia Inggs, Bernd Fischer, Willem Visser",
    description: "Various techniques for software quality management.",
  },
  {
    code: "CS 711",
    name: "Automata Theory & Applications",
    lecturer: "Brink van der Merwe",
    description:
      "The Chomsky hierarchy of languages in relation to computability — a first introduction to theoretical computer science.",
  },
];

function ModuleCard({ m }: { m: PgModule }) {
  return (
    <GlassPanel
      variant="default"
      rounded="xl"
      blur="lg"
      className="p-4 hover:bg-white/15 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <span className="text-xs font-mono font-bold text-white/50">
          {m.code}
        </span>
      </div>
      <h4 className="text-sm font-semibold text-white/90 mb-1">{m.name}</h4>
      {m.lecturer && (
        <p className="text-[11px] text-white/40 mb-1.5">{m.lecturer}</p>
      )}
      <p className="text-xs leading-relaxed text-white/50">{m.description}</p>
    </GlassPanel>
  );
}

export function PgModulesPage() {
  const t = useTranslations("PgModules");
  const bt = useTranslations("Breadcrumb");

  const sections = [
    { label: t("yearLong"), modules: yearModules },
    { label: t("semester1"), modules: sem1Modules },
    { label: t("semester2"), modules: sem2Modules },
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
              { label: bt("programmes") },
              { label: bt("postgraduate") },
              { label: bt("modules") },
            ]}
          />
        }
      />

      <ContentContainer className="pb-24">
        <ImagePlaceholder
          alt={t("imageAlt")}
          className="mb-12"
          aspectRatio="wide"
        />

        <div className="space-y-14">
          {sections.map((section) => (
            <section key={section.label}>
              <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-white/10" />
                <span className="shrink-0">{section.label}</span>
                <span className="h-px flex-1 bg-white/10" />
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {section.modules.map((m) => (
                  <ModuleCard key={m.code + m.name} m={m} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <GlassPanel
          variant="dark"
          rounded="xl"
          blur="lg"
          className="mt-14 p-6 border-white/10"
        >
          <p className="text-sm text-white/50 leading-relaxed">
            Not all modules are necessarily offered each year. At most two
            modules may be taken from related departments with permission. The
            final list of modules for each year is confirmed at the start of the
            academic year.
          </p>
        </GlassPanel>
      </ContentContainer>

      <Footer />
    </>
  );
}
