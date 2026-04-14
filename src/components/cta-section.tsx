import { useState } from "react";
import { motion } from "framer-motion";

interface CTASectionProps {
  onRestart: () => void;
  onCheckAnother: () => void;
  onDownloadResults: () => Promise<boolean>;
  previousChecksCount: number;
}

type DownloadStatus = "idle" | "downloading" | "done" | "error";

export function CTASection({
  onRestart,
  onCheckAnother,
  onDownloadResults,
  previousChecksCount,
}: CTASectionProps) {
  const [status, setStatus] = useState<DownloadStatus>("idle");

  async function handleDownload() {
    setStatus("downloading");
    const ok = await onDownloadResults();
    setStatus(ok ? "done" : "error");
  }

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

      <div className="flex flex-row flex-wrap gap-3 mb-4">
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
          onClick={handleDownload}
          disabled={status === "downloading"}
          className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-brand-black text-white font-semibold text-sm
            hover:bg-brand-black/90 active:scale-[0.98] transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-black focus-visible:ring-offset-2
            shadow-[0_1px_2px_rgba(0,0,0,0.06)]
            disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {status === "downloading" && "Downloaden..."}
          {status === "done" && "✓ Gedownload"}
          {status === "error" && "Opnieuw proberen"}
          {status === "idle" && "Download resultaten"}
        </button>

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
          Terug naar de startpagina
        </button>
      </div>

      {status === "error" && (
        <p className="font-sans text-[13px] text-red-600 leading-snug">
          Er ging iets mis. Probeer het opnieuw.
        </p>
      )}
    </motion.div>
  );
}
