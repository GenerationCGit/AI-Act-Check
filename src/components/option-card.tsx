import { cn } from "../lib/utils";

interface OptionCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  type?: "single" | "multi";
}

export function OptionCard({
  label,
  selected,
  onClick,
  type = "single",
}: OptionCardProps) {
  return (
    <button
      type="button"
      role={type === "multi" ? "checkbox" : "radio"}
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        "w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200",
        "font-sans text-[15px] leading-snug",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2",
        "hover:border-brand-yellow/60",
        selected
          ? "border-brand-yellow bg-brand-yellow/8 text-brand-black"
          : "border-brand-black/10 bg-white text-brand-black/80 hover:bg-brand-off-white/50"
      )}
    >
      <span className="flex items-center gap-3">
        <span
          className={cn(
            "flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-200 flex items-center justify-center",
            type === "multi" && "rounded-md",
            selected
              ? "border-brand-yellow bg-brand-yellow"
              : "border-brand-black/20 bg-white"
          )}
        >
          {selected && (
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="text-brand-black"
            >
              <path
                d="M2.5 6L5 8.5L9.5 3.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>
        {label}
      </span>
    </button>
  );
}
