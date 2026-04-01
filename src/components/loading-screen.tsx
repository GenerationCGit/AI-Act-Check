import { motion } from "framer-motion";
import { LogoIcon } from "./app-shell";

export function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-24 md:py-32 relative"
    >
      {/* Icon-only logo with subtle pulse — top-right corner */}
      <motion.div
        className="absolute top-4 right-4 md:top-6 md:right-6"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <LogoIcon size={28} />
      </motion.div>

      <div className="flex flex-col items-center gap-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <LogoIcon size={52} className="opacity-80" />
        </motion.div>

        <div className="text-center">
          <p className="font-sans font-semibold text-lg text-brand-black mb-2">
            Resultaat wordt berekend
          </p>
          <motion.span
            className="font-mono text-sm text-brand-black/40"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Even geduld...
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
