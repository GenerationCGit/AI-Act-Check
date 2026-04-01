import { motion, AnimatePresence } from "framer-motion";
import type { Question, Answer } from "../lib/types";
import { OptionCard } from "./option-card";
import { ProgressBar } from "./progress-bar";
import { NavigationControls } from "./navigation-controls";

interface QuestionCardProps {
  question: Question;
  stepIndex: number;
  totalSteps: number;
  answer: Answer | undefined;
  onAnswer: (answer: Answer) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function QuestionCard({
  question,
  stepIndex,
  totalSteps,
  answer,
  onAnswer,
  onNext,
  onBack,
  isFirst,
  isLast,
}: QuestionCardProps) {
  const isSingle = question.type === "single";
  const currentAnswer = answer ?? (isSingle ? "" : []);

  const hasAnswer = isSingle
    ? typeof currentAnswer === "string" && currentAnswer !== ""
    : Array.isArray(currentAnswer) && currentAnswer.length > 0;

  function handleOptionClick(optionId: string) {
    if (isSingle) {
      onAnswer(optionId);
    } else {
      const current = Array.isArray(currentAnswer) ? currentAnswer : [];
      if (optionId === "none") {
        onAnswer(["none"]);
        return;
      }
      const withoutNone = current.filter((id) => id !== "none");
      if (withoutNone.includes(optionId)) {
        onAnswer(withoutNone.filter((id) => id !== optionId));
      } else {
        onAnswer([...withoutNone, optionId]);
      }
    }
  }

  function isSelected(optionId: string): boolean {
    if (isSingle) return currentAnswer === optionId;
    return Array.isArray(currentAnswer) && currentAnswer.includes(optionId);
  }

  return (
    <div>
      <div className="mb-6">
        <span className="font-mono text-xs text-brand-black/40 uppercase tracking-wider">
          Vraag {stepIndex + 1} / {totalSteps}
        </span>
      </div>

      <ProgressBar current={stepIndex} total={totalSteps} />

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <h2 className="font-sans font-semibold text-xl md:text-2xl tracking-heading text-brand-black mt-6 mb-2 leading-snug">
            {question.title}
          </h2>

          {question.helperText && (
            <p className="font-sans text-sm text-brand-black/45 mb-6">
              {question.helperText}
            </p>
          )}

          <div className="flex flex-col gap-2.5 mt-6" role="group" aria-label={question.title}>
            {question.options.map((option) => (
              <OptionCard
                key={option.id}
                label={option.label}
                selected={isSelected(option.id)}
                onClick={() => handleOptionClick(option.id)}
                type={question.type}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <NavigationControls
        onBack={onBack}
        onNext={onNext}
        backDisabled={isFirst}
        nextDisabled={!hasAnswer}
        isLast={isLast}
      />
    </div>
  );
}
