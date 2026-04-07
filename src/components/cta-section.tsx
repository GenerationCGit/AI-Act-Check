import { motion } from "framer-motion";

interface CTASectionProps {
  onRestart: () => void;
  onCheckAnother: () => void;
}

export function CTASection({ onRestart, onCheckAnother }: CTASectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
      className="rounded-2xl border border-brand-black/[0.06] bg-brand-off-white p-6 md:p-10"
    >
      <span className="font-mono text-xs uppercase tracking-widest text-brand-black/40 mb-3 block">
        VOLGENDE STAP
      </span>

      <h3 className="font-sans font-semibold text-xl md:text-2xl tracking-heading text-brand-black mb-2">
        Wil je dit verder samen uitzoeken?
      </h3>

      <p className="font-sans text-[15px] text-brand-black/55 mb-8 max-w-[440px] leading-relaxed">
        Plan een AI Audit in waarin we verder onderzoek doen.
      </p>

      <div className="flex flex-row flex-wrap gap-3">
        <a
          href="mailto:info@generation-c.nl"
          className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-brand-yellow text-brand-black font-semibold text-sm
            hover:bg-brand-yellow/90 active:scale-[0.98] transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2
            shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
        >
          Contact ons
        </a>

        <button
          type="button"
          onClick={onCheckAnother}
          className="inline-flex items-center justify-center px-7 py-3 rounded-xl border border-brand-black/10 text-brand-black/70 text-sm font-medium
            hover:bg-white hover:text-brand-black transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2"
        >
          Check een ander systeem →
        </button>

        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center justify-center px-7 py-3 rounded-xl border border-brand-black/10 text-brand-black/50 text-sm
            hover:bg-white hover:text-brand-black transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2"
        >
          Helemaal opnieuw beginnen
        </button>
      </div>
    </motion.div>
  );
}
