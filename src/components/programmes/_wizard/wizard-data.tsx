import {
  BookOpen,
  Briefcase,
  Calendar,
  Clock,
  GraduationCap,
  Mail,
  Trophy,
  Users,
} from "lucide-react";
import type { PgProgramme, QuickFact, ResultCard, Situation } from "./types";

/* ------------------------------------------------------------------ */
/*  Quick facts                                                        */
/* ------------------------------------------------------------------ */

export function getQuickFacts(
  isUg: boolean,
  pgProgramme: PgProgramme | null,
  t: (key: string) => string,
): QuickFact[] {
  if (isUg) {
    return [
      {
        icon: <Clock className="h-4 w-4" />,
        label: t("factDuration"),
        value: t("ugDurationValue"),
      },
      {
        icon: <GraduationCap className="h-4 w-4" />,
        label: t("factQualification"),
        value: t("ugQualificationValue"),
      },
      {
        icon: <Calendar className="h-4 w-4" />,
        label: t("factIntake"),
        value: t("ugIntakeValue"),
      },
    ];
  }

  const pgFacts: Record<PgProgramme, QuickFact[]> = {
    honours: [
      {
        icon: <Clock className="h-4 w-4" />,
        label: t("factDuration"),
        value: t("honsDurationValue"),
      },
      {
        icon: <GraduationCap className="h-4 w-4" />,
        label: t("factQualification"),
        value: t("honsQualificationValue"),
      },
      {
        icon: <BookOpen className="h-4 w-4" />,
        label: t("factStructure"),
        value: t("honsStructureValue"),
      },
    ],
    masters: [
      {
        icon: <Clock className="h-4 w-4" />,
        label: t("factDuration"),
        value: t("mscDurationValue"),
      },
      {
        icon: <GraduationCap className="h-4 w-4" />,
        label: t("factQualification"),
        value: t("mscQualificationValue"),
      },
      {
        icon: <Briefcase className="h-4 w-4" />,
        label: t("factMode"),
        value: t("mscModeValue"),
      },
    ],
    phd: [
      {
        icon: <Clock className="h-4 w-4" />,
        label: t("factDuration"),
        value: t("phdDurationValue"),
      },
      {
        icon: <GraduationCap className="h-4 w-4" />,
        label: t("factQualification"),
        value: t("phdQualificationValue"),
      },
      {
        icon: <Briefcase className="h-4 w-4" />,
        label: t("factMode"),
        value: t("phdModeValue"),
      },
    ],
  };

  return pgFacts[pgProgramme ?? "honours"];
}

/* ------------------------------------------------------------------ */
/*  Personalized tips                                                  */
/* ------------------------------------------------------------------ */

export function getPersonalizedTip(
  situation: Situation | null,
  isUg: boolean,
  pgProgramme: PgProgramme | null,
  t: (key: string) => string,
): string | null {
  if (!situation) return null;

  if (isUg) {
    const tipMap: Record<Situation, string> = {
      prospective: t("tipUgProspective"),
      current: t("tipUgCurrent"),
      international: t("tipUgInternational"),
    };
    return tipMap[situation];
  }

  const programme = pgProgramme ?? "honours";
  const tipMap: Record<Situation, Record<PgProgramme, string>> = {
    prospective: {
      honours: t("tipPgProspectiveHons"),
      masters: t("tipPgProspectiveMsc"),
      phd: t("tipPgProspectivePhd"),
    },
    current: {
      honours: t("tipPgCurrentHons"),
      masters: t("tipPgCurrentMsc"),
      phd: t("tipPgCurrentPhd"),
    },
    international: {
      honours: t("tipPgInternationalHons"),
      masters: t("tipPgInternationalMsc"),
      phd: t("tipPgInternationalPhd"),
    },
  };

  return tipMap[situation][programme];
}

/* ------------------------------------------------------------------ */
/*  Result cards                                                       */
/* ------------------------------------------------------------------ */

export function getResultCards(
  situation: Situation | null,
  isUg: boolean,
  pgProgramme: PgProgramme | null,
  t: (key: string, values?: Record<string, string>) => string,
): ResultCard[] {
  if (isUg) {
    const cards: ResultCard[] = [
      {
        title: t("ugProspective"),
        description: t("ugProspectiveDesc"),
        href: "/programmes/undergraduate/prospective",
        icon: <Users className="h-5 w-5" />,
        primary: situation === "prospective" || situation === "international",
        badge:
          situation === "prospective" || situation === "international"
            ? t("recommendedBadge")
            : undefined,
      },
      {
        title: t("ugGuide"),
        description: t("ugGuideDesc"),
        href: "/programmes/undergraduate/guide",
        icon: <BookOpen className="h-5 w-5" />,
        primary: situation === "current",
        badge: situation === "current" ? t("recommendedBadge") : undefined,
      },
      {
        title: t("ugModules"),
        description: t("ugModulesDesc"),
        href: "/programmes/undergraduate/modules",
        icon: <GraduationCap className="h-5 w-5" />,
      },
      {
        title: t("contactDept"),
        description: t("contactDeptDesc"),
        href: "/contact",
        icon: <Mail className="h-5 w-5" />,
      },
    ];

    return cards.sort((a, b) => (b.primary ? 1 : 0) - (a.primary ? 1 : 0));
  }

  // Postgraduate
  const pgMap: Record<PgProgramme, string> = {
    honours: "/programmes/postgraduate/honours",
    masters: "/programmes/postgraduate/masters",
    phd: "/programmes/postgraduate/phd",
  };

  const pgLabel: Record<PgProgramme, string> = {
    honours: "Honours",
    masters: "Masters",
    phd: "PhD",
  };

  const programme = pgProgramme ?? "honours";

  return [
    {
      title: t("pgProgramme", { programme: pgLabel[programme] }),
      description: t("pgProgrammeDesc", { programme: pgLabel[programme] }),
      href: pgMap[programme],
      icon: <Trophy className="h-5 w-5" />,
      primary: true,
      badge: t("recommendedBadge"),
    },
    {
      title: t("pgProspective"),
      description: t("pgProspectiveDesc"),
      href: "/programmes/postgraduate/prospective",
      icon: <Users className="h-5 w-5" />,
      primary: situation === "prospective" || situation === "international",
      badge:
        situation === "prospective" || situation === "international"
          ? t("essentialBadge")
          : undefined,
    },
    {
      title: t("pgModules"),
      description: t("pgModulesDesc"),
      href: "/programmes/postgraduate/modules",
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      title: t("contactDept"),
      description: t("contactDeptDesc"),
      href: "/contact",
      icon: <Mail className="h-5 w-5" />,
    },
  ];
}
