"use client";

import { ContentContainer } from "@/components/content-container";
import { GlassPanel } from "@/components/glass-panel";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { NavLink } from "@/components/nav-link";
import { TerminalDialog } from "@/components/terminal-dialog";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Menu, Terminal, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

interface NavbarProps {
  className?: string;
}

/**
 * Sticky glassmorphic floating navbar with logo, department title, navigation links,
 * a terminal icon (opens macOS-style terminal dialog) and a language switcher.
 */
export function Navbar({ className }: NavbarProps) {
  const t = useTranslations("Navbar");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: t("programmes"), href: "#programmes" },
    { label: t("research"), href: "#research" },
    { label: t("contactUs"), href: "#contact" },
    { label: t("aboutUs"), href: "#about" },
  ];

  // Track scroll to enhance glass effect when sticky
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 z-50 w-full py-3 transition-all duration-200",
          className,
        )}
      >
        <ContentContainer>
          <GlassPanel
            variant="dark"
            rounded="xl"
            blur="xl"
            className={cn(
              "border-white/10 px-6 py-4 transition-all duration-300 sm:px-8 md:!rounded-full",
              scrolled
                ? "bg-[rgba(90,38,59,0.85)] shadow-xl shadow-black/20"
                : "bg-[rgba(90,38,59,0.8)]",
            )}
          >
            <div className="flex items-center justify-between gap-4 md:gap-6">
              {/* Logo and title */}
              <Link href="/" className="shrink-0">
                <div className="flex items-center gap-4">
                  <Logo width={115} height={42} />
                  <div className="h-8 w-px bg-white/20" />
                  <div className="hidden sm:flex sm:flex-col">
                    <span className="text-lg font-semibold leading-tight text-white">
                      {t("computerScience")}
                    </span>
                    <span className="text-xs font-medium text-white/60">
                      {t("facultyOfScience")}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Right side: nav links + icons + mobile hamburger */}
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Desktop nav links */}
                <div className="hidden items-center gap-5 md:flex">
                  {navItems.map((item) => (
                    <NavLink key={item.href} href={item.href}>
                      {item.label}
                    </NavLink>
                  ))}
                </div>

                {/* Divider between nav links and icons (desktop) */}
                <div className="mx-2 hidden h-5 w-px bg-white/15 md:block" />

                {/* Terminal icon */}
                <button
                  type="button"
                  onClick={() => setTerminalOpen(true)}
                  className="group relative flex items-center justify-center rounded-full p-2 text-white/60 transition-all duration-200 hover:bg-white/10 hover:text-white"
                  aria-label={t("openTerminal")}
                >
                  <Terminal className="h-4.5 w-4.5" />
                  <span className="pointer-events-none absolute -bottom-8 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[10px] text-white/80 opacity-0 transition-opacity group-hover:opacity-100 sm:block">
                    {t("terminal")}
                  </span>
                </button>

                {/* Language switcher */}
                <LanguageSwitcher />

                {/* Mobile hamburger */}
                <button
                  type="button"
                  className="flex items-center justify-center rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white md:hidden"
                  onClick={() => setMobileOpen((v) => !v)}
                  aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
                >
                  {mobileOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Mobile menu */}
            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out md:hidden",
                mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
              )}
            >
              <div className="mt-4 border-t border-white/10 pt-5 pb-2">
                {/* Department name on small screens */}
                <div className="mb-4 flex flex-col sm:hidden">
                  <span className="text-lg font-semibold leading-tight text-white">
                    {t("computerScience")}
                  </span>
                  <span className="text-xs font-medium text-white/60">
                    {t("facultyOfScience")}
                  </span>
                </div>

                {/* Nav links */}
                <div className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-white/80 transition-colors duration-150 hover:bg-white/10 hover:text-white active:bg-white/15"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </GlassPanel>
        </ContentContainer>
      </nav>

      {/* Terminal dialog */}
      <TerminalDialog open={terminalOpen} onOpenChange={setTerminalOpen} />
    </>
  );
}
