"use client";

import { ContentContainer } from "@/components/content-container";
import { Logo } from "@/components/logo";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export function Footer({ className }: { className?: string }) {
  const [year, setYear] = useState<number | null>(null);
  const t = useTranslations("Footer");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const quickLinks = [
    { label: t("home"), href: "/" },
    { label: t("programmes"), href: "/programmes/undergraduate/guide" },
    { label: t("research"), href: "/research" },
    { label: t("contactUs"), href: "/contact" },
  ];

  const programmeLinks = [
    { label: t("ugProgrammes"), href: "/programmes/undergraduate/guide" },
    { label: t("pgHonours"), href: "/programmes/postgraduate/honours" },
    { label: t("pgMasters"), href: "/programmes/postgraduate/masters" },
    { label: t("pgPhd"), href: "/programmes/postgraduate/phd" },
  ];

  const universityLinks = [
    {
      label: t("suWebsite"),
      href: "https://www.su.ac.za",
      external: true,
    },
    {
      label: t("facultyOfScience"),
      href: "https://www.su.ac.za/en/faculties/science",
      external: true,
    },
    {
      label: t("suLibrary"),
      href: "https://su.ac.za/library",
      external: true,
    },
    {
      label: t("suApply"),
      href: "https://www.su.ac.za/apply",
      external: true,
    },
  ];

  return (
    <footer className={cn("border-t border-white/10", className)}>
      {/* Main footer content */}
      <ContentContainer>
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <Logo
                className="w-20 h-7.25 sm:w-24 sm:h-8.75"
                width={96}
                height={35}
              />
              <div className="h-8 w-px bg-white/20" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold leading-tight text-white">
                  {t("computerScience")}
                </span>
                <span className="text-[10px] font-medium text-white/50">
                  {t("facultyOfScience")}
                </span>
              </div>
            </div>
            <p className="text-xs max-w-sm text-balance leading-relaxed text-white/50 mb-5">
              {t("tagline")}
            </p>
            <div className="flex flex-col gap-2.5 text-sm text-white/50">
              <a
                href="mailto:secretary@cs.sun.ac.za."
                className="flex items-center gap-2 transition-colors hover:text-white/80"
              >
                <Mail className="h-3.5 w-3.5 shrink-0" />
                secretary@cs.sun.ac.za.
              </a>
              <a
                href="tel:+27218084232"
                className="flex items-center gap-2 transition-colors hover:text-white/80"
              >
                <Phone className="h-3.5 w-3.5 shrink-0" />
                +27 21 808 4232
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                {t("address")}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
              {t("quickLinksTitle")}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white/80"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programmes */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
              {t("programmesTitle")}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {programmeLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-white/80"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* University Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/80">
              {t("universityTitle")}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {universityLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white/80"
                  >
                    {link.label}
                    <ExternalLink className="h-3 w-3 shrink-0 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ContentContainer>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <ContentContainer>
          <div className="flex flex-col items-center  py-6">
            <p className="text-xs text-white/30 text-center">
              {t("copyright", { year: year ?? 2026 })}
            </p>
          </div>
        </ContentContainer>
      </div>
    </footer>
  );
}
