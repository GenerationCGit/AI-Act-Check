import { motion } from "framer-motion";

interface NextStepsListProps {
  steps: string[];
}

export function NextStepsList({ steps }: NextStepsListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
    >
      <h3 className="font-sans font-semibold text-lg text-brand-black mb-4 tracking-heading">
        Aanbevolen vervolgstappen
      </h3>
      <ul className="space-y-3">
        {steps.map((step, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + i * 0.08, ease: "easeOut" }}
            className="flex items-start gap-3"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-yellow/15 flex items-center justify-center mt-0.5">
              <span className="font-mono text-[11px] text-brand-black/60">{i + 1}</span>
            </span>
            <span className="font-sans text-[15px] text-brand-black/75 leading-relaxed">
              {step}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
