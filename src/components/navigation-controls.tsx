import { cn } from "../lib/utils";

interface NavigationControlsProps {
  onBack: () => void;
  onNext: () => void;
  backDisabled?: boolean;
  nextDisabled?: boolean;
  isLast?: boolean;
}

export function NavigationControls({
  onBack,
  onNext,
  backDisabled = false,
  nextDisabled = false,
  isLast = false,
}: NavigationControlsProps) {
  return (
    <div className="flex items-center justify-between pt-6">
      <button
        type="button"
        onClick={onBack}
        disabled={backDisabled}
        className={cn(
          "px-5 py-2.5 rounded-lg text-sm font-sans transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2",
          backDisabled
            ? "text-brand-black/20 cursor-not-allowed"
            : "text-brand-black/60 hover:text-brand-black hover:bg-brand-off-white"
        )}
      >
        <span className="flex items-center gap-1.5">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="opacity-60"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Vorige
        </span>
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className={cn(
          "px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2",
          nextDisabled
            ? "bg-brand-black/5 text-brand-black/25 cursor-not-allowed"
            : "bg-brand-yellow text-brand-black hover:bg-brand-yellow/90 active:scale-[0.98]"
        )}
      >
        {isLast ? "Bekijk resultaat" : "Volgende"}
      </button>
    </div>
  );
}
