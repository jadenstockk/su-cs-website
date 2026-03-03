"use client";

import { ContentContainer } from "@/components/content-container";
import { SectionHeading } from "@/components/section-heading";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const staff = [
  {
    name: "Brink van der Merwe",
    title: "Professor",
    photo: "/assets/images/staff/abvdm.jpg",
    focus: "Automata Theory · Descriptional Complexity · Formal Languages",
    profileHref: "/about/staff",
  },
  {
    name: "Steve Kroon",
    title: "Associate Professor",
    photo: "/assets/images/staff/kroon.jpg",
    focus: "Machine Learning · Reinforcement Learning · Decision Theory",
    profileHref: "/about/staff",
  },
  {
    name: "Lynette van Zijl",
    title: "Professor",
    photo: "/assets/images/staff/lvzijl.jpg",
    focus: "Automata & Grammars · NLP · Grammar Correction",
    profileHref: "/about/staff",
  },
  {
    name: "Willem Visser",
    title: "Professor",
    photo: "/assets/images/staff/visserw.jpg",
    focus: "Software Verification · Model Checking · Testing",
    profileHref: "/about/staff",
  },
  {
    name: "Bernd Fischer",
    title: "Professor",
    photo: "/assets/images/staff/bfischer.jpg",
    focus: "Software Engineering · Program Analysis · Code Generation",
    profileHref: "/about/staff",
  },
  {
    name: "Trienko Grobler",
    title: "Associate Professor",
    photo: "/assets/images/staff/tlgrobler.jpg",
    focus: "Machine Learning · Remote Sensing · Interferometry",
    profileHref: "/about/staff",
  },
  {
    name: "Maria Keet",
    title: "Professor",
    photo: "/assets/images/staff/mkeet.png",
    focus: "Knowledge Representation · Ontologies · Logic",
    profileHref: "/about/staff",
  },
  {
    name: "Cornelia Inggs",
    title: "Senior Lecturer",
    photo: "/assets/images/staff/cinggs.jpg",
    focus: "Software Engineering · Systems · Verification",
    profileHref: "/about/staff",
  },
] as const;

export function AcademicStaffPreview({ className }: { className?: string }) {
  const t = useTranslations("AcademicStaff");

  return (
    <section className={cn("py-24 sm:py-32", className)}>
      <ContentContainer>
        <div className="mb-14 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading title={t("title")} subtitle={t("subtitle")} />
          <Link
            href="/about/staff"
            className="shrink-0 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-white/30"
          >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-3 grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 h-full">
          {staff.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="h-full"
            >
              <Link href={member.profileHref} className="group block h-full">
                <div className="relative overflow-hidden h-full rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/8 hover:shadow-xl hover:shadow-black/20">
                  {/* Photo */}
                  <div className="relative aspect-4/3 overflow-hidden bg-white/5">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
                  </div>

                  {/* Info */}
                  <div className="p-2.5 sm:p-4">
                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-su-gold/80 truncate">
                      {member.title}
                    </p>
                    <h3 className="mt-0.5 text-xs sm:text-sm font-bold text-white leading-snug">
                      {member.name}
                    </h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </ContentContainer>
    </section>
  );
}
