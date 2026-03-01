"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function GoBackButton({ label }: { label: string }) {
  const router = useRouter();

  return (
    <Button
      variant="glass"
      size="lg"
      onClick={() => router.back()}
      className="cursor-pointer"
    >
      {label}
    </Button>
  );
}
