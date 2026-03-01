import { Suspense } from "react";
import NotFoundContent from "./not-found-content";

export default function NotFoundPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-svh items-center justify-center bg-background">
          <span className="text-[10rem] font-extrabold leading-none tracking-tighter bg-gradient-to-b from-white/20 to-white/[0.03] bg-clip-text text-transparent">
            404
          </span>
        </main>
      }
    >
      <NotFoundContent />
    </Suspense>
  );
}
