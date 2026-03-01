"use client";

import { GlassPanel } from "@/components/glass-panel";
import { User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { Student } from "./students-data";

export function StudentRow({
  student,
  labels,
}: {
  student: Student;
  labels: { supervisor: string; researchTopic: string };
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <GlassPanel
      variant="default"
      rounded="xl"
      blur="lg"
      className="p-5 transition-all duration-300 hover:bg-white/15"
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white/10">
          {student.image && !imgError ? (
            <Image
              src={student.image}
              alt={student.name}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <User className="h-6 w-6 text-white/30" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-white">{student.name}</h3>
          <div className="mt-1.5 space-y-1 text-xs text-white/50">
            <p>
              <span className="font-medium text-white/60">
                {labels.supervisor}:
              </span>{" "}
              {student.supervisor}
            </p>
            <p>
              <span className="font-medium text-white/60">
                {labels.researchTopic}:
              </span>{" "}
              {student.researchTopic}
            </p>
          </div>
        </div>
      </div>
    </GlassPanel>
  );
}
