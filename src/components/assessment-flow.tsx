import { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import type { Answers, Answer } from "../lib/types";
import { questions } from "../data/questions";
import { getSectorHint } from "../data/sector-hints";
import { QuestionCard } from "./question-card";

interface AssessmentFlowProps {
  sector: string;
  currentStep: number;
  answers: Answers;
  onAnswer: (questionId: string, answer: Answer) => void;
  onNext: () => void;
  onBack: () => void;
}

export function AssessmentFlow({
  sector,
  currentStep,
  answers,
  onAnswer,
  onNext,
  onBack,
}: AssessmentFlowProps) {
  const question = questions[currentStep]!;
  const sectorHint = getSectorHint(question.id, sector);
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleAnswer = useCallback(
    (answer: Answer) => {
      onAnswer(question.id, answer);

      if (question.type === "single" && typeof answer === "string" && answer !== "") {
        if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
        autoAdvanceTimer.current = setTimeout(() => {
          onNext();
        }, 350);
      }
    },
    [question.id, question.type, onAnswer, onNext]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Sector metadata line */}
      {sector && (
        <div className="mb-5 pb-4 border-b border-brand-black/[0.06]">
          <span className="font-mono text-[11px] uppercase tracking-wider text-brand-black/35">
            Sector:{" "}
          </span>
          <span className="font-mono text-[11px] text-brand-black/55">
            {sector}
          </span>
        </div>
      )}

      <QuestionCard
        question={question}
        stepIndex={currentStep}
        totalSteps={questions.length}
        answer={answers[question.id]}
        onAnswer={handleAnswer}
        onNext={onNext}
        onBack={onBack}
        isFirst={false}
        isLast={currentStep === questions.length - 1}
        sectorHint={sectorHint}
      />
    </motion.div>
  );
}
