"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { type ReactNode, useEffect, useRef, useState } from "react";

interface HeroVideoProps {
  children?: ReactNode;
  className?: string;
  overlayOpacity?: number;
  mobileOverlayOpacity?: number;
  src?: string;
  poster?: string;
  posterAlt?: string;
}

export function HeroVideo({
  children,
  className,
  overlayOpacity = 50,
  mobileOverlayOpacity,
  src = "/assets/videos/su-cs-hero.mp4",
  poster,
  posterAlt = "",
}: HeroVideoProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    let isMounted = true;
    let objectUrl: string;

    fetch(src)
      .then((res) => res.blob())
      .then((blob) => {
        if (!isMounted) return;
        objectUrl = URL.createObjectURL(blob);
        setVideoUrl(objectUrl);
      })
      .catch((err) => console.error("Failed to load video:", err));

    return () => {
      isMounted = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src]);

  // Start video manually when enough is buffered
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.play().catch(() => {
        // Safari sometimes requires user interaction; keep trying
        setTimeout(tryPlay, 50);
      });
    };

    if (videoUrl) {
      video.preload = "auto";
      tryPlay();
    }
  }, [videoUrl]);

  const handleEnded = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  const effectiveOpacity =
    (isMobile && mobileOverlayOpacity !== undefined
      ? mobileOverlayOpacity
      : overlayOpacity) / 100;

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {/* Poster shown immediately while video loads */}
      {poster && (
        <img
          src={poster}
          alt={posterAlt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover -z-10"
        />
      )}

      {/* Video */}
      {videoUrl && (
        <video
          ref={videoRef}
          muted
          playsInline
          loop
          aria-label={posterAlt}
          // biome-ignore lint/a11y/noUnknownAttribute: Safari-specific attribute
          webkit-playsinline="true"
          x-webkit-airplay="deny"
          src={videoUrl}
          onEnded={handleEnded}
          className="absolute inset-0 h-full w-full object-cover z-0"
        />
      )}

      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: `rgba(0, 0, 0, ${effectiveOpacity})` }}
      />

      <div className="z-20 flex relative">{children}</div>
    </div>
  );
}
