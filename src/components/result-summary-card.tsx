import { motion } from "framer-motion";
import type { RiskCategory } from "../lib/types";
import { cn } from "../lib/utils";

interface ResultSummaryCardProps {
  badge: string;
  headline: string;
  description: string;
  category: RiskCategory;
  companyName?: string;
}

const categoryStyles: Record<RiskCategory, { badge: string; border: string }> = {
  low: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    border: "border-emerald-100",
  },
  medium: {
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    border: "border-amber-100",
  },
  high: {
    badge: "bg-red-50 text-red-700 border-red-200",
    border: "border-red-100",
  },
  prohibited: {
    badge: "bg-red-100 text-red-800 border-red-300",
    border: "border-red-200",
  },
};

export function ResultSummaryCard({
  badge,
  headline,
  description,
  category,
  companyName,
}: ResultSummaryCardProps) {
  const styles = categoryStyles[category];

  // Personalize description with company name when available
  const personalizedDescription =
    companyName && companyName.trim()
      ? description.replace(
          "dit AI-systeem",
          `het AI-systeem van ${companyName.trim()}`
        ).replace(
          "deze AI-toepassing",
          `de AI-toepassing van ${companyName.trim()}`
        ).replace(
          "deze toepassing",
          `de toepassing van ${companyName.trim()}`
        )
      : description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "rounded-2xl border-2 bg-white p-6 md:p-10 text-center",
        styles.border
      )}
    >
      <span
        className={cn(
          "inline-block font-mono text-xs uppercase tracking-wider px-3 py-1 rounded-full border mb-5",
          styles.badge
        )}
      >
        {badge}
      </span>

      <h2 className="font-sans font-semibold text-2xl md:text-3xl tracking-heading text-brand-black mb-3 leading-tight">
        {headline}
      </h2>

      <p className="font-sans text-base text-brand-black/60 max-w-[480px] mx-auto leading-relaxed">
        {personalizedDescription}
      </p>
    </motion.div>
  );
}
