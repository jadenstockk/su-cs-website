import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface HeroVideoProps {
  children?: ReactNode;
  className?: string;
  overlayOpacity?: number;
  src?: string;
  poster?: string;
}

export function HeroVideo({
  children,
  className,
  overlayOpacity = 50,
  src = "/assets/videos/su-cs-hero.mp4",
  poster,
}: HeroVideoProps) {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={poster}
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={src} type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity / 100 }}
      />

      <div className="z-10 flex relative">{children}</div>
    </div>
  );
}
