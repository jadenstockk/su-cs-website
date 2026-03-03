import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  current: number;
}

export function StepIndicator({ steps, current }: StepIndicatorProps) {
  const progress = steps.length > 1 ? current / (steps.length - 1) : 0;

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Step dots & labels */}
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {steps.map((label, i) => {
          const isActive = i === current;
          const isComplete = i < current;
          return (
            <div key={label} className="flex items-center gap-2 sm:gap-3">
              {i > 0 && (
                <div
                  className={cn(
                    "h-px w-6 sm:w-10 transition-colors duration-300",
                    isComplete ? "bg-white/40" : "bg-white/10",
                  )}
                />
              )}
              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300",
                    isActive && "bg-white text-black scale-110",
                    isComplete && "bg-white/30 text-white",
                    !isActive && !isComplete && "bg-white/10 text-white/30",
                  )}
                >
                  {isComplete ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    i + 1
                  )}
                </span>
                <span
                  className={cn(
                    "hidden text-xs font-medium sm:block transition-colors duration-300",
                    isActive ? "text-white" : "text-white/30",
                  )}
                >
                  {label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
