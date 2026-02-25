"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const localeLabels: Record<string, string> = {
  en: "EN",
  af: "AF",
  xh: "XH",
};

const localeNames: Record<string, string> = {
  en: "English",
  af: "Afrikaans",
  xh: "isiXhosa",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function switchLocale(nextLocale: string) {
    setOpen(false);
    router.replace(
      // @ts-expect-error -- pathname is valid
      { pathname, params },
      { locale: nextLocale },
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group relative flex items-center justify-center gap-1 rounded-full p-2 text-white/60 transition-all duration-200 hover:bg-white/10 hover:text-white"
        aria-label="Switch language"
      >
        <Globe className="h-4.5 w-4.5" />
        <span className="text-xs font-medium">{localeLabels[locale]}</span>
      </button>

      {/* Dropdown */}
      <div
        className={cn(
          "absolute right-0 top-full z-50 mt-2 min-w-35 overflow-hidden rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl transition-all duration-200",
          open
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0",
        )}
      >
        {routing.locales.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => switchLocale(l)}
            className={cn(
              "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-white/10",
              l === locale
                ? "font-semibold text-white"
                : "text-white/70 hover:text-white",
            )}
          >
            <span className="w-6 text-xs font-bold uppercase text-white/40">
              {localeLabels[l]}
            </span>
            <span>{localeNames[l]}</span>
            {l === locale && (
              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
