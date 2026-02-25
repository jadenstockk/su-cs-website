import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoPlaceholderProps {
  width?: number;
  height?: number;
  className?: string;
}

export function Logo({
  width = 115,
  height = 42,
  className,
}: LogoPlaceholderProps) {
  return (
    <Image
      className={cn(className)}
      style={{ width, height }}
      alt={"Stellenbosch University Logo"}
      width={width}
      height={height}
      src="/assets/images/su-horizontal-goldwhite.svg"
    />
  );
}
