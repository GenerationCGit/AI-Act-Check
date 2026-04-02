import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface IntroScreenProps {
  onStart: () => void;
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-brand-black/[0.07] bg-white p-5 md:p-6", className)}>
      {children}
    </div>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span className={cn("font-mono text-[10px] uppercase tracking-widest mb-3 block", light ? "text-white/50" : "text-brand-black/60")}>
      {children}
    </span>
  );
}

function Bullet({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <li className="flex items-start gap-2">
      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-yellow mt-[5px]" />
      <span className={cn("font-sans text-[13px] leading-snug", light ? "text-white/70" : "text-brand-black/70")}>
        {children}
      </span>
    </li>
  );
}

const RISK_LEVELS = [
  {
    label: "Laag risico",
    body: "Interne tools of automatisering zonder directe impact op mensen.",
    tag: "text-emerald-700 bg-emerald-50 border-emerald-200",
    card: "border-emerald-100 bg-emerald-50/20",
  },
  {
    label: "Beperkt risico",
    body: "Chatbots of AI-content. Transparantie richting gebruikers is vereist.",
    tag: "text-amber-700 bg-amber-50 border-amber-200",
    card: "border-amber-100 bg-amber-50/20",
  },
  {
    label: "Hoog risico",
    body: "AI in recruitment, zorg, krediet of overheidsbesluiten.",
    tag: "text-red-700 bg-red-50 border-red-200",
    card: "border-red-100 bg-red-50/20",
  },
  {
    label: "Verboden",
    body: "Social scoring, biometrische surveillance of gedragsmanipulatie.",
    tag: "text-red-800 bg-red-100 border-red-300",
    card: "border-red-200 bg-red-50/30",
  },
];

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-5xl mx-auto px-5 md:px-8 pt-20 md:pt-28 pb-12"
    >
      {/* ── Hero ── */}
      <div className="mb-8">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="font-mono text-[11px] uppercase tracking-widest text-brand-black/60 mb-4 block"
        >
          DOE DE CHECK
        </motion.span>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="font-sans font-semibold text-3xl md:text-5xl tracking-heading text-brand-black leading-[1.1] mb-3"
            >
              Valt jouw AI onder<br className="hidden md:block" /> de EU AI Act?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="font-sans text-[15px] text-brand-black/70 max-w-[480px] leading-relaxed"
            >
              Veel organisaties vallen onder de wet, vaak zonder dat ze het weten.
              Doe de check en weet waar je staat.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex flex-col items-start md:items-end gap-1.5 flex-shrink-0"
          >
            <button
              type="button"
              onClick={onStart}
              className="px-8 py-3.5 rounded-xl bg-brand-yellow text-brand-black font-semibold text-sm
                hover:bg-brand-yellow/90 active:scale-[0.98] transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-4
                shadow-[0_1px_2px_rgba(0,0,0,0.06)] whitespace-nowrap"
            >
              Start de check →
            </button>
            <span className="font-mono text-[10px] text-brand-black/50">Duurt minder dan 5 minuten</span>
          </motion.div>
        </div>
      </div>

      {/* ── Bento grid ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-3"
      >
        {/* Risiconiveaus — spans 2 cols */}
        <Card className="md:col-span-2">
          <SectionLabel>Risiconiveaus</SectionLabel>
          <h2 className="font-sans font-semibold text-[15px] text-brand-black tracking-heading mb-4">
            Hoe de EU AI Act naar AI kijkt
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {RISK_LEVELS.map((level) => (
              <div key={level.label} className={cn("rounded-xl border p-3.5", level.card)}>
                <span className={cn("inline-block font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border mb-2", level.tag)}>
                  {level.label}
                </span>
                <p className="font-sans text-[12px] text-brand-black/70 leading-snug">{level.body}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Deadline — dark card */}
        <Card className="bg-brand-black border-brand-black flex flex-col justify-between min-h-[200px]">
          <div>
            <SectionLabel light>Deadline</SectionLabel>
            <p className="font-sans font-semibold text-5xl text-brand-yellow tracking-heading leading-none mb-1">2 aug</p>
            <p className="font-sans font-semibold text-5xl text-white tracking-heading leading-none mb-4">2026</p>
            <p className="font-sans text-[13px] text-white/70 leading-relaxed">
              Vanaf dan gelden de zwaarste regels voor high-risk AI. Systemen moeten aantoonbaar voldoen vóór gebruik.
            </p>
          </div>
          <p className="font-sans text-[12px] text-brand-yellow font-semibold mt-4">
            Dit is geen advies, dit wordt verplicht.
          </p>
        </Card>

        {/* Urgentie */}
        <Card>
          <SectionLabel>Urgentie</SectionLabel>
          <h2 className="font-sans font-semibold text-[15px] text-brand-black tracking-heading mb-3">
            Waarom nu al?
          </h2>
          <ul className="space-y-2">
            <Bullet>Data wordt sneller en op grotere schaal gebruikt</Bullet>
            <Bullet>Je hebt minder zicht op wat er precies gebeurt</Bullet>
            <Bullet>Tools worden ingezet zonder duidelijke regels</Bullet>
            <Bullet>Niemand weet precies waar alle data zit</Bullet>
          </ul>
        </Card>

        {/* Consequenties */}
        <Card>
          <SectionLabel>Consequenties</SectionLabel>
          <h2 className="font-sans font-semibold text-[15px] text-brand-black tracking-heading mb-3">
            Wat als je niets doet?
          </h2>
          <ul className="space-y-2">
            <Bullet>Tot €35M of 7% omzet bij zwaarste overtredingen</Bullet>
            <Bullet>Tot €15M of 3% bij high-risk zonder maatregelen</Bullet>
            <Bullet>Systemen kunnen verboden of stopgezet worden</Bullet>
            <Bullet>Vergelijkbaar met hoe GDPR wordt gehandhaafd</Bullet>
          </ul>
        </Card>

        {/* Goed om te weten */}
        <Card>
          <SectionLabel>Goed om te weten</SectionLabel>
          <h2 className="font-sans font-semibold text-[15px] text-brand-black tracking-heading mb-3">
            Je bent sneller 'gebruiker' dan je denkt
          </h2>
          <ul className="space-y-2 mb-4">
            <Bullet>Copilot of ChatGPT gebruiken = jij bent exploitant</Bullet>
            <Bullet>Je moet medewerkers trainen in AI-gebruik</Bullet>
            <Bullet>Je moet weten wat tools doen met data</Bullet>
          </ul>
          <p className="font-sans text-[12px] text-brand-black/75 font-semibold border-t border-brand-black/[0.06] pt-3 leading-snug">
            Weet je niet zeker waar je onder valt? Dan zit je waarschijnlijk dichter bij high-risk dan je denkt.
          </p>
        </Card>
      </motion.div>

      {/* ── Footer ── */}
      <p className="font-mono text-[11px] text-brand-black/40 text-center mt-8">
        Deze check is een eerste indicatie en vormt geen juridisch advies.
      </p>
    </motion.div>
  );
}
