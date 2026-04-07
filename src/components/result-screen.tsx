import { motion } from "framer-motion";
import type { AssessmentResult } from "../lib/types";
import { ResultSummaryCard } from "./result-summary-card";
import { NextStepsList } from "./next-steps-list";
import { CTASection } from "./cta-section";
import { DisclaimerFooter } from "./disclaimer-footer";

interface ResultScreenProps {
  result: AssessmentResult;
  companyName?: string;
  onRestart: () => void;
  onCheckAnother: () => void;
}

export function ResultScreen({ result, companyName, onRestart, onCheckAnother }: ResultScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="space-y-8">
        <ResultSummaryCard
          badge={result.badge}
          headline={result.headline}
          description={result.description}
          category={result.category}
          companyName={companyName}
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className="rounded-2xl border border-brand-black/[0.06] bg-brand-off-white/60 p-6 md:p-8"
        >
          <h3 className="font-sans font-semibold text-lg text-brand-black mb-4 tracking-heading">
            Waarom deze uitkomst?
          </h3>
          <ul className="space-y-2.5">
            {result.reasons.map((reason, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-yellow mt-2" />
                <span className="font-sans text-[15px] text-brand-black/70 leading-relaxed">
                  {reason}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="rounded-2xl border border-brand-black/[0.06] bg-brand-off-white/60 p-6 md:p-8">
          <NextStepsList steps={result.nextSteps} />
        </div>

        <CTASection onRestart={onRestart} onCheckAnother={onCheckAnother} />

        <DisclaimerFooter />
      </div>
    </motion.div>
  );
}
