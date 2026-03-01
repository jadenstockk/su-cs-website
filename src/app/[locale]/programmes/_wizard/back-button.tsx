import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  onClick: () => void;
  label: string;
}

export function BackButton({ onClick, label }: BackButtonProps) {
  return (
    <div className="mt-6 flex justify-center">
      <button
        type="button"
        onClick={onClick}
        className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white/50 transition-colors hover:bg-white/10 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        {label}
      </button>
    </div>
  );
}
