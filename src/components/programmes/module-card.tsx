"use client";

import { GlassPanel } from "@/components/glass-panel";
import type { Module } from "@/lib/types";
import { useState } from "react";

const DESC_CHAR_LIMIT = 150;

function semesterBadgeStyle(s: string) {
  if (s === "semester_1")
    return "bg-blue-500/15 text-blue-300 ring-blue-500/25";
  if (s === "semester_2")
    return "bg-emerald-500/15 text-emerald-300 ring-emerald-500/25";
  return "bg-amber-500/15 text-amber-300 ring-amber-500/25";
}

export function ModuleCard({
  module,
  semesterLabel,
}: {
  module: Module;
  semesterLabel?: string;
}) {
  const isLong = module.description.length > DESC_CHAR_LIMIT;
  const [expanded, setExpanded] = useState(false);

  const displayText =
    isLong && !expanded
      ? `${module.description.slice(0, DESC_CHAR_LIMIT).trimEnd()}…`
      : module.description;

  return (
    <GlassPanel
      variant="default"
      rounded="xl"
      blur="lg"
      className="p-6 hover:bg-white/[0.14] hover:border-white/25 transition-all duration-300"
    >
      {/* Header row: module code + semester badge */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-sm font-mono font-semibold tracking-wider text-white/50 uppercase">
          {module.code}
        </span>
        {semesterLabel && (
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${semesterBadgeStyle(module.semester)}`}
          >
            {semesterLabel}
          </span>
        )}
      </div>

      {/* Module name */}
      <h4 className="text-lg font-semibold text-white leading-snug mb-2">
        {module.name}
      </h4>

      {/* Lecturer */}
      {module.lecturer?.name && (
        <p className="text-sm text-white/50 mb-3 flex items-center gap-2">
          <svg
            className="size-4 text-white/40 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          {module.lecturer.name}
        </p>
      )}

      {/* Description */}
      <p className="text-sm leading-relaxed text-white/60">
        {displayText}
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="ml-1 text-white/70 hover:text-white font-medium transition-colors"
          >
            {expanded ? "show less" : "read more"}
          </button>
        )}
      </p>
    </GlassPanel>
  );
}
