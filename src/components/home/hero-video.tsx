import { cn } from "@/lib/utils";
import { type ReactNode, useCallback } from "react";

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
  const videoRef = useCallback((video: HTMLVideoElement | null) => {
    if (!video) return;
    // Safari/iOS sometimes ignores the muted JSX attribute,
    // so set it directly on the DOM element to satisfy autoplay policy.
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
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
