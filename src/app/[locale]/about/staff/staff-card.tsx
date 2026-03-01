"use client";

import { GlassPanel } from "@/components/glass-panel";
import { ExternalLink, Mail, MapPin, Phone, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { StaffMember } from "./staff-data";

export function StaffCard({
  member,
  labels,
}: {
  member: StaffMember;
  labels: { office: string; website: string; researchInterests: string };
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <GlassPanel
      variant="default"
      rounded="xl"
      blur="lg"
      className="p-5 transition-all duration-300 hover:bg-white/15 hover:shadow-lg hover:shadow-black/10"
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white/10">
          {member.image && !imgError ? (
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <User className="h-7 w-7 text-white/30" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-white truncate">
            {member.name}
          </h3>
          {member.title && (
            <p className="text-xs text-white/50 mt-0.5">{member.title}</p>
          )}

          {/* Contact details */}
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50">
            {member.office && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {labels.office}: {member.office}
              </span>
            )}
            {member.telephone && (
              <a
                href={`tel:${member.telephone.replace(/\s/g, "")}`}
                className="flex items-center gap-1 hover:text-white/70 transition-colors"
              >
                <Phone className="h-3 w-3" />
                {member.telephone}
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="flex items-center gap-1 hover:text-white/70 transition-colors"
              >
                <Mail className="h-3 w-3" />
                {member.email}
              </a>
            )}
            {member.website && (
              <a
                href={member.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white/70 transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                {labels.website}
              </a>
            )}
          </div>

          {/* Research interests */}
          {member.researchInterests && (
            <p className="mt-2 text-xs leading-relaxed text-white/40">
              <span className="font-medium text-white/55">
                {labels.researchInterests}:
              </span>{" "}
              {member.researchInterests}
            </p>
          )}
        </div>
      </div>
    </GlassPanel>
  );
}
