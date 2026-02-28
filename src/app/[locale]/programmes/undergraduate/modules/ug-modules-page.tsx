"use client";

import { ContentContainer } from "@/components/content-container";
import { Footer } from "@/components/footer";
import { GlassPanel } from "@/components/glass-panel";
import { BreadcrumbNav } from "@/components/programmes/breadcrumb-nav";
import { ImagePlaceholder } from "@/components/programmes/image-placeholder";
import { PageHero } from "@/components/programmes/page-hero";
import { useTranslations } from "next-intl";

interface Module {
  code: string;
  name: string;
  semester: "s1" | "s2" | "year";
  description: string;
}

const firstYearModules: Module[] = [
  {
    code: "CS114",
    name: "Introductory Computer Science 1",
    semester: "s1",
    description:
      "Introduction to basic programming, data representation, conditional execution, iteration, arrays, modular programming, recursion, and intro to OOP.",
  },
  {
    code: "CS144",
    name: "Introductory Computer Science 2",
    semester: "s2",
    description:
      "Object-oriented programming, inheritance, polymorphism, design patterns, searching and sorting algorithms, complexity theory, dynamic data structures.",
  },
  {
    code: "CS113",
    name: "Computer Science for Actuarial Studies",
    semester: "s1",
    description:
      "Programming from a financial perspective — imperative constructs, recursive approaches, arrays, and declarative models like spreadsheets.",
  },
];

const secondYearModules: Module[] = [
  {
    code: "CS214",
    name: "Data Structures and Algorithms",
    semester: "s1",
    description:
      "Classical data structures and algorithms in an OOP setup. Advanced techniques for the analysis of algorithms.",
  },
  {
    code: "CS244",
    name: "Computer Architecture",
    semester: "s2",
    description:
      "Basic computer architecture, machine and assembly language programming, assemblers, binders, loaders, and OS fundamentals.",
  },
  {
    code: "SC272",
    name: "Scientific Computing",
    semester: "year",
    description:
      "Linux, Python programming, numerical computing with NumPy, plotting, and curve fitting.",
  },
];

const thirdYearModules: Module[] = [
  {
    code: "CS314",
    name: "Concurrency",
    semester: "s1",
    description:
      "Programming techniques and principles of concurrent systems — communication, synchronisation, scheduling, and parallel/distributed architectures.",
  },
  {
    code: "CS313",
    name: "Computer Networks",
    semester: "s1",
    description:
      "Internet architecture and protocols, resource allocation, congestion control, network security, and applications.",
  },
  {
    code: "CS315",
    name: "Machine Learning",
    semester: "s1",
    description:
      "Dimension reduction, probabilistic modelling, logistic regression, Gaussian mixtures, and hidden Markov models.",
  },
  {
    code: "CS344",
    name: "Program Design",
    semester: "s2",
    description:
      "Software engineering — program specifications, reusable frameworks, testability, and development of a medium-sized system.",
  },
  {
    code: "CS343",
    name: "Databases and Web-Centric Programming",
    semester: "s2",
    description:
      "Relational databases, ORM, web applications, web services, server-side scalability, virtualisation, and cloud computing.",
  },
  {
    code: "CS345",
    name: "Computability and Automata Theory",
    semester: "s2",
    description:
      "Automata theory, formal languages, computability, complexity, Turing machines, P vs NP, and NP-completeness.",
  },
];

const fourthYearModules: Module[] = [
  {
    code: "CS411",
    name: "Computer Networks",
    semester: "s1",
    description:
      "Advanced networking — architecture, protocols, resource allocation, security, applications, and network research techniques.",
  },
  {
    code: "CS412",
    name: "Advanced Algorithms",
    semester: "s1",
    description:
      "Advanced algorithm design and analysis — linear programming, approximation, randomised, and parallel algorithms.",
  },
  {
    code: "E414",
    name: "Machine Learning",
    semester: "s1",
    description:
      "Dimension reduction techniques, maximum-likelihood estimation, logistic regression, Gaussian mixtures, and HMMs.",
  },
  {
    code: "CS441",
    name: "Machine Learning",
    semester: "s2",
    description: "Selected advanced topics in machine learning.",
  },
  {
    code: "CS471",
    name: "Data Science Research Assignment",
    semester: "s2",
    description:
      "A comprehensive project integrating knowledge from all previous modules to solve a real-world data science problem.",
  },
];

function semesterLabel(s: string, t: (k: string) => string) {
  if (s === "s1") return t("semester1");
  if (s === "s2") return t("semester2");
  return t("yearLong");
}

function semesterBadgeColor(s: string) {
  if (s === "s1") return "bg-blue-500/20 text-blue-300";
  if (s === "s2") return "bg-emerald-500/20 text-emerald-300";
  return "bg-amber-500/20 text-amber-300";
}

function ModuleList({
  modules,
  t,
}: {
  modules: Module[];
  t: (k: string) => string;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {modules.map((m) => (
        <GlassPanel
          key={m.code}
          variant="default"
          rounded="xl"
          blur="lg"
          className="p-4 hover:bg-white/15 transition-all duration-200"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <span className="text-xs font-mono font-bold text-white/50">
              {m.code}
            </span>
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${semesterBadgeColor(m.semester)}`}
            >
              {semesterLabel(m.semester, t)}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-white/90 mb-1">{m.name}</h4>
          <p className="text-xs leading-relaxed text-white/50">
            {m.description}
          </p>
        </GlassPanel>
      ))}
    </div>
  );
}

export function UgModulesPage() {
  const t = useTranslations("UgModules");
  const bt = useTranslations("Breadcrumb");

  const yearGroups = [
    { label: t("firstYear"), modules: firstYearModules },
    { label: t("secondYear"), modules: secondYearModules },
    { label: t("thirdYear"), modules: thirdYearModules },
    { label: t("fourthYear"), modules: fourthYearModules },
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
              { label: bt("undergraduate") },
              { label: bt("modules") },
            ]}
          />
        }
      />

      <ContentContainer className="pb-24">
        {/* Image placeholder */}
        <ImagePlaceholder
          alt={t("imageAlt")}
          className="mb-12"
          aspectRatio="wide"
        />

        {/* Module groups */}
        <div className="space-y-14">
          {yearGroups.map((group) => (
            <section key={group.label}>
              <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-white/10" />
                <span className="shrink-0">{group.label}</span>
                <span className="h-px flex-1 bg-white/10" />
              </h2>
              <ModuleList modules={group.modules} t={t} />
            </section>
          ))}
        </div>

        {/* Core curriculum note */}
        <GlassPanel
          variant="dark"
          rounded="xl"
          blur="lg"
          className="mt-14 p-6 border-white/10"
        >
          <h3 className="text-base font-semibold text-white mb-2">
            {t("viewCurriculum")}
          </h3>
          <p className="text-sm text-white/50 leading-relaxed">
            The CS core curriculum includes: CS 114, 144, 214, 244, 343, 344,
            and at least two of 314 / 313 / 315. Fourth-year modules are part of
            the BDatSci programme.
          </p>
        </GlassPanel>
      </ContentContainer>

      <Footer />
    </>
  );
}
