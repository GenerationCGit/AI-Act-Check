import { motion } from "framer-motion";

interface CTASectionProps {
  onRestart: () => void;
}

export function CTASection({ onRestart }: CTASectionProps) {
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
        Wil je dit laten toetsen?
      </h3>

      <p className="font-sans text-[15px] text-brand-black/55 mb-8 max-w-[440px] leading-relaxed">
        Plan een AI Act quick scan en bespreek de uitkomst met een specialist.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="#contact"
          className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-brand-yellow text-brand-black font-semibold text-sm
            hover:bg-brand-yellow/90 active:scale-[0.98] transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2
            shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
        >
          Plan een quick scan
        </a>

        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center justify-center px-7 py-3 rounded-xl border border-brand-black/10 text-brand-black/60 text-sm
            hover:bg-white hover:text-brand-black transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2"
        >
          Doe de check opnieuw
        </button>
      </div>
    </motion.div>
  );
}
