"use client";

import { ContentContainer } from "@/components/content-container";
import { GlassPanel } from "@/components/glass-panel";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { TerminalDialog } from "@/components/terminal-dialog";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, Terminal, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface NavbarProps {
  className?: string;
}

interface NavSubItem {
  label: string;
  href: string;
  description: string;
}

interface NavItemSimple {
  kind: "simple";
  label: string;
  href: string;
  children: NavSubItem[];
}

interface NavSubGroup {
  heading: string;
  items: NavSubItem[];
}

interface NavItemMega {
  kind: "mega";
  label: string;
  href: string;
  groups: NavSubGroup[];
}

interface NavItemLink {
  kind: "link";
  label: string;
  href: string;
}

type NavItem = NavItemSimple | NavItemMega | NavItemLink;

/**
 * Sticky glassmorphic floating navbar with logo, department title, navigation links,
 * a terminal icon (opens macOS-style terminal dialog) and a language switcher.
 */
export function Navbar({ className }: NavbarProps) {
  const t = useTranslations("Navbar");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isMobile = useIsMobile();

  const navItems: NavItem[] = [
    {
      kind: "mega",
      label: t("programmes"),
      href: "#programmes",
      groups: [
        {
          heading: t("undergraduate"),
          items: [
            {
              label: t("ugModules"),
              href: "/programmes/undergraduate/modules",
              description: t("ugModulesDesc"),
            },
            {
              label: t("ugGuide"),
              href: "/programmes/undergraduate/guide",
              description: t("ugGuideDesc"),
            },
            {
              label: t("ugProspective"),
              href: "/programmes/undergraduate/prospective",
              description: t("ugProspectiveDesc"),
            },
          ],
        },
        {
          heading: t("postgraduate"),
          items: [
            {
              label: t("pgModules"),
              href: "/programmes/postgraduate/modules",
              description: t("pgModulesDesc"),
            },
            {
              label: t("pgProspective"),
              href: "/programmes/postgraduate/prospective",
              description: t("pgProspectiveDesc"),
            },
            {
              label: t("pgHonours"),
              href: "/programmes/postgraduate/honours",
              description: t("pgHonoursDesc"),
            },
            {
              label: t("pgMasters"),
              href: "/programmes/postgraduate/masters",
              description: t("pgMastersDesc"),
            },
            {
              label: t("pgPhd"),
              href: "/programmes/postgraduate/phd",
              description: t("pgPhdDesc"),
            },
          ],
        },
      ],
    },
    {
      kind: "link",
      label: t("research"),
      href: "/research",
    },
    {
      kind: "simple",
      label: t("aboutUs"),
      href: "#about",
      children: [
        {
          label: "Our Department",
          href: "#about",
          description: "The history and vision of SU Computer Science.",
        },
        {
          label: "Staff & Faculty",
          href: "#about",
          description: "Meet our internationally recognised researchers.",
        },
      ],
    },
    {
      kind: "simple",
      label: t("contactUs"),
      href: "#contact",
      children: [
        {
          label: "Get in Touch",
          href: "#contact",
          description: "Email us or fill in our online contact form.",
        },
        {
          label: "Visit Campus",
          href: "#contact",
          description: "Find us on the Stellenbosch University campus.",
        },
      ],
    },
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
          "fixed top-0 z-50 w-full py-3 transition-all duration-300",
          mobileOpen && "h-dvh",
          className,
        )}
      >
        <ContentContainer className={cn("transition-all duration-300 h-full")}>
          <GlassPanel
            variant="dark"
            rounded="xl"
            blur="xl"
            className={cn(
              "border-white/10 px-4 py-4 transition-all duration-300 sm:px-8 lg:rounded-full! flex flex-col",
              scrolled
                ? "bg-primary/80 shadow-xl shadow-black/20"
                : "bg-primary/80",
              mobileOpen && "h-full rounded-xl!",
            )}
          >
            <div className="flex items-center justify-between gap-4 lg:gap-6">
              {/* Logo and title */}
              <Link href="/" className="shrink-0">
                <div className="flex items-center gap-2 sm:gap-4">
                  <Logo
                    className="w-20 h-7.25 sm:w-28.75 sm:h-10.5"
                    width={115}
                    height={42}
                  />
                  <div className="h-6 sm:h-8 w-px bg-white/20" />
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-lg font-semibold leading-tight text-white">
                      {t("computerScience")}
                    </span>
                    <span className="text-[9px] sm:text-xs font-medium text-white/60">
                      {t("facultyOfScience")}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Right side: nav links + icons + mobile hamburger */}
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Desktop nav links with dropdowns */}
                {!isMobile && (
                  <NavigationMenu viewport={false} className="flex">
                    <NavigationMenuList className="gap-0">
                      {navItems.map((item) =>
                        item.kind === "link" ? (
                          <NavigationMenuItem key={item.label}>
                            <Link
                              href={item.href}
                              className={cn(
                                "inline-flex h-auto items-center rounded-md bg-transparent px-3 py-1.5 text-sm font-medium text-white/80",
                                "transition-colors hover:bg-white/10 hover:text-white",
                              )}
                            >
                              {item.label}
                            </Link>
                          </NavigationMenuItem>
                        ) : (
                          <NavigationMenuItem key={item.label}>
                            <NavigationMenuTrigger
                              className={cn(
                                "h-auto bg-transparent px-3 py-1.5 text-sm font-medium text-white/80",
                                "hover:bg-white/10 hover:text-white",
                              )}
                            >
                              {item.label}
                            </NavigationMenuTrigger>

                            {item.kind === "mega" ? (
                              <NavigationMenuContent
                                className={cn(
                                  "mt-2 rounded-xl border border-white/10",
                                  "bg-zinc-900/95 backdrop-blur-xl shadow-xl shadow-black/30",
                                  "p-4",
                                )}
                              >
                                <div className="flex gap-6 min-w-[420px]">
                                  {item.groups.map((group) => (
                                    <div
                                      key={group.heading}
                                      className="flex-1 min-w-[190px]"
                                    >
                                      <span className="mb-2 block px-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                                        {group.heading}
                                      </span>
                                      <ul className="flex flex-col gap-0.5">
                                        {group.items.map((child) => (
                                          <li key={child.href + child.label}>
                                            <NavigationMenuLink asChild>
                                              <Link
                                                href={child.href}
                                                className={cn(
                                                  "flex flex-col gap-0.5 rounded-lg px-2 py-2",
                                                  "transition-colors duration-150",
                                                  "hover:bg-white/8 focus:bg-white/8",
                                                  "group outline-none",
                                                )}
                                              >
                                                <span className="text-[13px] font-medium text-white/90 group-hover:text-white transition-colors">
                                                  {child.label}
                                                </span>
                                                <span className="text-[11px] leading-snug text-white/40 group-hover:text-white/55 transition-colors">
                                                  {child.description}
                                                </span>
                                              </Link>
                                            </NavigationMenuLink>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </NavigationMenuContent>
                            ) : (
                              <NavigationMenuContent
                                className={cn(
                                  "mt-2 min-w-55 rounded-xl border border-white/10",
                                  "bg-zinc-900/95 backdrop-blur-xl shadow-xl shadow-black/30",
                                  "p-1.5",
                                )}
                              >
                                <ul className="flex flex-col gap-0.5">
                                  {item.children.map((child) => (
                                    <li key={child.href + child.label}>
                                      <NavigationMenuLink asChild>
                                        <Link
                                          href={child.href}
                                          className={cn(
                                            "flex flex-col gap-0.5 rounded-lg px-3 py-2.5",
                                            "transition-colors duration-150",
                                            "hover:bg-white/8 focus:bg-white/8",
                                            "group outline-none",
                                          )}
                                        >
                                          <span className="text-[13px] font-medium text-white/90 group-hover:text-white transition-colors">
                                            {child.label}
                                          </span>
                                          <span className="text-[12px] leading-snug text-white/45 group-hover:text-white/60 transition-colors">
                                            {child.description}
                                          </span>
                                        </Link>
                                      </NavigationMenuLink>
                                    </li>
                                  ))}
                                </ul>
                              </NavigationMenuContent>
                            )}
                          </NavigationMenuItem>
                        ),
                      )}
                    </NavigationMenuList>
                  </NavigationMenu>
                )}

                {/* Divider between nav links and icons (desktop) */}
                {!isMobile && (
                  <div className="mx-2 h-5 w-px bg-white/15 block" />
                )}

                {/* Terminal icon (desktop only — mobile has it in the menu) */}
                {!isMobile && (
                  <Button
                    variant="glass"
                    onClick={() => setTerminalOpen(true)}
                    className="inline-flex relative"
                    aria-label={t("openTerminal")}
                  >
                    <Terminal className="h-4.5 w-4.5" />
                  </Button>
                )}

                {/* Language switcher */}
                <LanguageSwitcher />

                {/* Mobile menu toggle */}
                {isMobile && (
                  <Button
                    variant="icon"
                    onClick={() => setMobileOpen((v) => !v)}
                    aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
                  >
                    {mobileOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Mobile menu (inside GlassPanel for glassy look) */}
            {isMobile && (
              <div
                className={cn(
                  "flex-1 flex-col overflow-y-auto pt-6 pb-8 transition-all duration-300 ease-in-out",
                  mobileOpen ? "flex opacity-100" : "hidden opacity-0",
                )}
              >
                {/* Nav links */}
                <div className="flex flex-col gap-0.5">
                  {navItems.map((item) => {
                    if (item.kind === "link") {
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex w-full items-center rounded-lg px-3 py-2 text-[15px] font-medium text-white/80 transition-colors duration-150 hover:bg-white/10 hover:text-white"
                        >
                          {item.label}
                        </Link>
                      );
                    }
                    const itemKey = item.label;
                    const isExpanded = mobileExpanded === itemKey;
                    return (
                      <div key={itemKey}>
                        <button
                          type="button"
                          onClick={() =>
                            setMobileExpanded(isExpanded ? null : itemKey)
                          }
                          className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-[15px] font-medium text-white/80 transition-colors duration-150 hover:bg-white/10 hover:text-white"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 text-white/40 transition-transform duration-200",
                              isExpanded && "rotate-180",
                            )}
                          />
                        </button>
                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-200",
                            isExpanded
                              ? "max-h-[500px] opacity-100"
                              : "max-h-0 opacity-0",
                          )}
                        >
                          {item.kind === "mega" ? (
                            <div className="ml-3 mt-0.5 mb-1 flex flex-col gap-3 border-l border-white/10 pl-3">
                              {item.groups.map((group) => (
                                <div key={group.heading}>
                                  <span className="mb-1 block px-2 text-[10px] font-semibold uppercase tracking-wider text-white/35">
                                    {group.heading}
                                  </span>
                                  <div className="flex flex-col gap-0.5">
                                    {group.items.map((child) => (
                                      <Link
                                        key={child.href + child.label}
                                        href={child.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="group flex flex-col rounded-lg px-2 py-1.5 transition-colors duration-150 hover:bg-white/8"
                                      >
                                        <span className="text-[13px] font-medium text-white/80 group-hover:text-white">
                                          {child.label}
                                        </span>
                                        <span className="text-[11px] text-white/40 group-hover:text-white/60">
                                          {child.description}
                                        </span>
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="ml-3 mt-0.5 mb-1 flex flex-col gap-0.5 border-l border-white/10 pl-3">
                              {item.children.map((child) => (
                                <a
                                  key={child.href + child.label}
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="group flex flex-col rounded-lg px-2 py-1.5 transition-colors duration-150 hover:bg-white/8"
                                >
                                  <span className="text-[13px] font-medium text-white/80 group-hover:text-white">
                                    {child.label}
                                  </span>
                                  <span className="text-[12px] text-white/40 group-hover:text-white/60">
                                    {child.description}
                                  </span>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Terminal */}
                <div className="mt-auto pt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      setTerminalOpen(true);
                      setMobileOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[15px] font-medium text-white/80 transition-colors duration-150 hover:bg-white/10 hover:text-white"
                  >
                    <Terminal className="h-4.5 w-4.5" />
                    <span>{t("openTerminal")}</span>
                  </button>
                </div>
              </div>
            )}
          </GlassPanel>
        </ContentContainer>
      </nav>

      {/* Terminal dialog */}
      <TerminalDialog open={terminalOpen} onOpenChange={setTerminalOpen} />
    </>
  );
}
