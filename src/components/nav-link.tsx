"use client";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}

/**
 * Styled navigation link with hover effect. Use inside the Navbar.
 */
export function NavLink({ href, children, className, active }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "relative text-sm font-medium text-white/80 transition-colors duration-200 hover:text-white",
        "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white/60 after:transition-all after:duration-300 hover:after:w-full",
        active && "text-white after:w-full",
        className,
      )}
    >
      {children}
    </Link>
  );
}
