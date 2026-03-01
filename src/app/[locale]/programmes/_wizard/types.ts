import type React from "react";

/* ------------------------------------------------------------------ */
/*  Wizard domain types                                                */
/* ------------------------------------------------------------------ */

export type Level = "undergraduate" | "postgraduate";
export type PgProgramme = "honours" | "masters" | "phd";
export type Situation = "prospective" | "current" | "international";

export interface WizardState {
  step: number;
  level: Level | null;
  pgProgramme: PgProgramme | null;
  situation: Situation | null;
}

export interface ResultCard {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  primary?: boolean;
  badge?: string;
}

export interface QuickFact {
  icon: React.ReactNode;
  label: string;
  value: string;
}
