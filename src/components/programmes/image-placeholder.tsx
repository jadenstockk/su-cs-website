import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ImagePlaceholderProps {
  className?: string;
  children?: ReactNode;
  aspectRatio?: "video" | "square" | "wide";
}

const aspectMap = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
} as const;

/**
 * Placeholder for images — renders a styled gradient box with alt text.
 * Replace the inner content with an actual <Image /> when assets are available.
 */
export function ImagePlaceholder({
  className,
  children,
  aspectRatio = "video",
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02]",
        aspectMap[aspectRatio],
        className,
      )}
    >
      {children ?? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs text-white/20 font-medium">
            Image placeholder
          </span>
        </div>
      )}
    </div>
  );
}
